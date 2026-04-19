<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContentManagementController;
use App\Http\Controllers\GuestProductController;
use App\Models\Product;
use App\Models\PageContent;
use App\Http\Controllers\SetLocaleController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\DashboardController;

Route::get('/set-locale', SetLocaleController::class)->name('set-locale');

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

// Cart Routes
use App\Http\Controllers\CartController;
Route::post('/cart', [CartController::class, 'store'])->name('cart.store');
Route::put('/cart/{product}', [CartController::class, 'update'])->name('cart.update');
Route::delete('/cart/{product}', [CartController::class, 'destroy'])->name('cart.destroy');

// Checkout Routes
use App\Http\Controllers\CheckoutController;
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/success/{order}', [CheckoutController::class, 'success'])->name('checkout.success');

// Dashboard Routes
Route::middleware(['auth'])->prefix('dashboard')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::name('dashboard.')->group(function () {
        Route::resource('products', ProductController::class);
        Route::resource('categories', CategoryController::class);
        Route::resource('orders', OrderController::class);
        
        Route::get('content', [ContentManagementController::class, 'edit'])->name('content.edit');
        Route::put('content', [ContentManagementController::class, 'update'])->name('content.update');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
