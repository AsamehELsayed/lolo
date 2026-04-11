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
        ]);

        foreach ($validated as $key => $value) {
            PageContent::updateOrCreate(['key' => $key], ['value' => $value]);
        }

        return redirect()->back()->with('success', 'Content updated successfully.');
    }
}
