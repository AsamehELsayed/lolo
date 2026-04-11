<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class GuestProductController extends Controller
{
    /**
     * Display a listing of the resource for guests.
     */
    public function index(Request $request)
    {
        $categorySlug = $request->query('category');
        $initialCategory = 'all';

        if ($categorySlug) {
            $cat = Category::where('slug', $categorySlug)->first();
            if ($cat) {
                $initialCategory = $cat->name;
            }
        }

        $products = Product::with(['images', 'category'])->latest()->get();
        $categories = Category::all();

        return Inertia::render('Products/Showroom', [
            'products' => $products,
            'categories' => $categories,
            'initialCategory' => $initialCategory
        ]);
    }

    /**
     * Display the specified resource for guests.
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product->load(['images', 'category']),
            'relatedProducts' => Product::with(['images', 'category'])
                ->where('category_id', $product->category_id)
                ->where('id', '!=', $product->id)
                ->take(4)
                ->get()
        ]);
    }
}
