<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

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
}
