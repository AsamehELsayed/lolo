<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Categories/Index', [
            'categories' => Category::withCount('products')->latest()->get()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Categories/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('categories', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        Category::create($validated);

        return redirect()->route('dashboard.categories.index')->with('success', 'Category created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Category $category)
    {
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $category->id,
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:10240',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($category->image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $category->image_path));
            }
            $path = $request->file('image')->store('categories', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        $category->update($validated);

        return redirect()->route('dashboard.categories.index')->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        if ($category->image_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $category->image_path));
        }

        $category->delete();

        return redirect()->route('dashboard.categories.index')->with('success', 'Category deleted successfully.');
    }
}
