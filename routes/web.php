<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContentManagementController;
use App\Http\Controllers\GuestProductController;
use App\Models\Product;
use App\Models\PageContent;

Route::get('/', function () {
    return Inertia::render('Index', [
        'products' => Product::with(['images', 'category'])->latest()->get(),
        'categories' => \App\Models\Category::all(),
        'content' => PageContent::all()->pluck('value', 'key')
    ]);
})->name('home');

// Guest Product Routes
Route::get('/products', [GuestProductController::class, 'index'])->name('products.index');
Route::get('/products/{product}', [GuestProductController::class, 'show'])->name('products.show');

// Dashboard Routes
Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    Route::get('/', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::name('dashboard.')->group(function () {
        Route::resource('products', ProductController::class);
        Route::resource('categories', CategoryController::class);
        
        Route::get('content', [ContentManagementController::class, 'edit'])->name('content.edit');
        Route::put('content', [ContentManagementController::class, 'update'])->name('content.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
