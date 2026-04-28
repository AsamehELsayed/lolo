<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

use App\Models\PageContent;
use Inertia\Inertia;

class ContentManagementController extends Controller
{
    public function edit()
    {
        $contents = PageContent::all()->pluck('value', 'key');
        
        return Inertia::render('Content/Edit', [
            'contents' => $contents
        ]);
    }

    public function update(Request $request)
    {
        $validated = $request->validate([
            'hero_title' => 'required|string|max:255',
            'hero_subtitle' => 'required|string|max:255',
            'hero_description' => 'required|string',
            'about_title' => 'required|string|max:255',
            'about_subtitle' => 'required|string|max:255',
            'heritage_label' => 'nullable|string|max:255',
            'heritage_title' => 'nullable|string|max:255',
            'heritage_description' => 'nullable|string',
            'heritage_stat1_value' => 'nullable|string|max:255',
            'heritage_stat1_label' => 'nullable|string|max:255',
            'heritage_stat2_value' => 'nullable|string|max:255',
            'heritage_stat2_label' => 'nullable|string|max:255',
            'heritage_image' => 'nullable|image|max:10240',
            'mobile_video_path' => 'nullable|string',
            'footer_description' => 'nullable|string',
            'footer_boutique_links' => 'nullable|string',
            'footer_information_links' => 'nullable|string',
            'footer_address' => 'nullable|string',
            'footer_phone' => 'nullable|string',
            'footer_email' => 'nullable|string',
            'footer_instagram' => 'nullable|string',
            'footer_facebook' => 'nullable|string',
            'seo_title_en' => 'nullable|string|max:255',
            'seo_title_ar' => 'nullable|string|max:255',
            'seo_description_en' => 'nullable|string',
            'seo_description_ar' => 'nullable|string',
            'seo_keywords_en' => 'nullable|string',
            'seo_keywords_ar' => 'nullable|string',
            'notification_admin_email' => 'nullable|email|max:255',
            'enable_order_notifications' => 'nullable|string', // Checkbox usually sends 'on' or '1'
        ]);

        if ($request->hasFile('heritage_image')) {
            $path = $request->file('heritage_image')->store('content', 'public');
            PageContent::updateOrCreate(['key' => 'heritage_image'], ['value' => '/storage/' . $path]);
        }

        // Remove the file object from validation array before looping to save as text
        unset($validated['heritage_image']);

        foreach ($validated as $key => $value) {
            PageContent::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return redirect()->back()->with('success', 'Content updated successfully.');
    }

    public function uploadVideoChunk(Request $request)
    {
        $request->validate([
            'chunk' => 'required|file',
            'chunkIndex' => 'required|integer',
            'filename' => 'required|string',
        ]);

        $chunk = $request->file('chunk');
        $filename = $request->filename;
        $chunkIndex = $request->chunkIndex;

        $tempPath = storage_path('app/chunks/' . $filename);

        if (!File::exists($tempPath)) {
            File::makeDirectory($tempPath, 0777, true);
        }

        $chunk->move($tempPath, $chunkIndex);

        return response()->json(['success' => true]);
    }

    public function mergeVideoChunks(Request $request)
    {
        $request->validate([
            'filename' => 'required|string',
            'totalChunks' => 'required|integer',
        ]);

        $filename = $request->filename;
        $totalChunks = $request->totalChunks;

        $tempPath = storage_path('app/chunks/' . $filename);
        $finalPath = storage_path('app/public/content/videos');

        if (!File::exists($finalPath)) {
            File::makeDirectory($finalPath, 0777, true);
        }

        $extension = pathinfo($filename, PATHINFO_EXTENSION);
        $newFilename = uniqid('video_') . '.' . $extension;
        $finalFile = $finalPath . '/' . $newFilename;

        $out = fopen($finalFile, 'ab');

        for ($i = 0; $i < $totalChunks; $i++) {
            $chunkFile = $tempPath . '/' . $i;
            $in = fopen($chunkFile, 'rb');
            stream_copy_to_stream($in, $out);
            fclose($in);
        }

        fclose($out);

        // Cleanup
        File::deleteDirectory($tempPath);

        $publicPath = '/storage/content/videos/' . $newFilename;
        PageContent::updateOrCreate(['key' => 'mobile_video_path'], ['value' => $publicPath]);

        return response()->json([
            'success' => true,
            'path' => $publicPath
        ]);
    }
}
