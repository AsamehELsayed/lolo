<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Services\CartService;

class CartController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'integer|min:1',
        ]);

        $this->cartService->add($request->product_id, $request->get('quantity', 1));

        return back()->with('success', 'Product added to bag.');
    }

    public function update(Request $request, $productId)
    {
        $request->validate([
            'quantity' => 'required|integer|min:0',
        ]);

        $this->cartService->update($productId, $request->quantity);

        return back();
    }

    public function destroy($productId)
    {
        $this->cartService->remove($productId);

        return back();
    }
}
