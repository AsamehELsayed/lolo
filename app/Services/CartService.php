<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Session;

class CartService
{
    protected $sessionKey = 'cart';

    public function getCart()
    {
        return Session::get($this->sessionKey, []);
    }

    public function add($productId, $quantity = 1)
    {
        $cart = $this->getCart();
        $product = Product::findOrFail($productId);

        if (isset($cart[$productId])) {
            $cart[$productId]['quantity'] += $quantity;
        } else {
            $cart[$productId] = [
                'id' => $product->id,
                'name' => $product->name,
                'price' => $product->price,
                'quantity' => $quantity,
                'image' => $product->front_image_path ?? $product->image_path,
            ];
        }

        Session::put($this->sessionKey, $cart);
        return $cart;
    }

    public function update($productId, $quantity)
    {
        $cart = $this->getCart();

        if (isset($cart[$productId])) {
            if ($quantity <= 0) {
                unset($cart[$productId]);
            } else {
                $cart[$productId]['quantity'] = $quantity;
            }
            Session::put($this->sessionKey, $cart);
        }

        return $cart;
    }

    public function remove($productId)
    {
        $cart = $this->getCart();

        if (isset($cart[$productId])) {
            unset($cart[$productId]);
            Session::put($this->sessionKey, $cart);
        }

        return $cart;
    }

    public function clear()
    {
        Session::forget($this->sessionKey);
    }

    public function getTotal()
    {
        $cart = $this->getCart();
        return array_reduce($cart, function ($total, $item) {
            return $total + ($item['price'] * $item['quantity']);
        }, 0);
    }

    public function getContent()
    {
        $cart = $this->getCart();
        return array_values($cart);
    }
}
