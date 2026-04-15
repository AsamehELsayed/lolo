<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImage;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Products/Management', [
            'products' => Product::with(['images', 'category'])->latest()->get(),
            'categories' => Category::all()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Products/Create', [
            'categories' => Category::all()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'front_image' => 'nullable|image|max:10240',
            'back_image' => 'nullable|image|max:10240',
            'images.*' => 'nullable|image|max:10240',
            'is_featured' => 'boolean',
            'is_bestseller' => 'boolean',
            'discount_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        if ($request->hasFile('front_image')) {
            $path = $request->file('front_image')->store('products', 'public');
            $validated['front_image_path'] = '/storage/' . $path;
            $validated['image_path'] = $validated['front_image_path'];
        }

        if ($request->hasFile('back_image')) {
            $path = $request->file('back_image')->store('products', 'public');
            $validated['back_image_path'] = '/storage/' . $path;
        }

        $product = Product::create($validated);

        // Handle front/back as part of the images collection too
        if (isset($validated['front_image_path'])) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $validated['front_image_path'],
                'is_primary' => true,
                'order' => 0
            ]);
        }

        if (isset($validated['back_image_path'])) {
            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $validated['back_image_path'],
                'is_primary' => false,
                'order' => 1
            ]);
        }

        // Handle additional images
        if ($request->hasFile('images')) {
            $count = ProductImage::where('product_id', $product->id)->count();
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => '/storage/' . $path,
                    'is_primary' => $count == 0, // Fallback if no front image
                    'order' => $count++
                ]);
            }
        }

        return redirect()->route('dashboard.products.index')->with('success', 'Product created successfully.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product->load('images'),
            'categories' => Category::all()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Product $product)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'category_id' => 'nullable|exists:categories,id',
            'front_image' => 'nullable|image|max:10240',
            'back_image' => 'nullable|image|max:10240',
            'images.*' => 'nullable|image|max:10240',
            'deleted_images' => 'nullable|array',
            'deleted_images.*' => 'integer',
            'is_featured' => 'boolean',
            'is_bestseller' => 'boolean',
            'discount_percentage' => 'nullable|integer|min:0|max:100',
        ]);

        if ($request->hasFile('front_image')) {
            // Delete old front image if exists
            if ($product->front_image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->front_image_path));
                ProductImage::where('product_id', $product->id)->where('image_path', $product->front_image_path)->delete();
            }
            $path = $request->file('front_image')->store('products', 'public');
            $validated['front_image_path'] = '/storage/' . $path;
            $validated['image_path'] = $validated['front_image_path'];

            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $validated['front_image_path'],
                'is_primary' => true,
                'order' => 0
            ]);
        }

        if ($request->hasFile('back_image')) {
            // Delete old back image if exists
            if ($product->back_image_path) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $product->back_image_path));
                ProductImage::where('product_id', $product->id)->where('image_path', $product->back_image_path)->delete();
            }
            $path = $request->file('back_image')->store('products', 'public');
            $validated['back_image_path'] = '/storage/' . $path;

            ProductImage::create([
                'product_id' => $product->id,
                'image_path' => $validated['back_image_path'],
                'is_primary' => false,
                'order' => 1
            ]);
        }

        // Handle deleted images
        if ($request->has('deleted_images')) {
            foreach ($request->deleted_images as $imageId) {
                $img = ProductImage::find($imageId);
                if ($img && $img->product_id === $product->id) {
                    Storage::disk('public')->delete(str_replace('/storage/', '', $img->image_path));
                    $img->delete();
                }
            }
        }

        // Handle additional images
        if ($request->hasFile('images')) {
            $count = ProductImage::where('product_id', $product->id)->max('order') ?? 0;
            foreach ($request->file('images') as $image) {
                $path = $image->store('products', 'public');
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => '/storage/' . $path,
                    'is_primary' => false,
                    'order' => ++$count
                ]);
            }
        }

        $product->update($validated);

        return redirect()->route('dashboard.products.index')->with('success', 'Product updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        // Delete all associated images
        foreach ($product->images as $image) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $image->image_path));
            $image->delete();
        }

        // Also delete legacy paths if they still exist elsewhere
        if ($product->front_image_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->front_image_path));
        }
        if ($product->back_image_path) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $product->back_image_path));
        }

        $product->delete();

        return redirect()->route('dashboard.products.index')->with('success', 'Product deleted successfully.');
    }

}
