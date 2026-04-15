<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Services\CartService;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class CheckoutController extends Controller
{
    protected $cartService;

    public function __construct(CartService $cartService)
    {
        $this->cartService = $cartService;
    }

    public function index()
    {
        $cart = $this->cartService->getContent();
        $total = $this->cartService->getTotal();

        if (empty($cart)) {
            return redirect()->route('products.index');
        }

        return Inertia::render('Checkout', [
            'cart' => $cart,
            'total' => $total,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string',
            'city' => 'required|string|max:100',
            'notes' => 'nullable|string',
        ]);

        $cart = $this->cartService->getContent();
        $total = $this->cartService->getTotal();

        if (empty($cart)) {
            return redirect()->route('products.index');
        }

        return DB::transaction(function () use ($request, $cart, $total) {
            $order = Order::create([
                'user_id' => auth()->check() ? auth()->id() : null,
                'customer_name' => $request->name,
                'customer_email' => $request->email,
                'customer_phone' => $request->phone,
                'customer_address' => $request->address,
                'customer_city' => $request->city,
                'total_amount' => $total,
                'status' => 'pending',
                'payment_method' => 'cod',
                'notes' => $request->notes,
            ]);

            foreach ($cart as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['id'],
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                ]);
            }

            $this->cartService->clear();

            return redirect()->route('checkout.success', ['order' => $order->id]);
        });
    }

    public function success(Order $order)
    {
        // Simple security check (could be improved with a hash)
        if ($order->created_at->diffInMinutes(now()) > 60) {
            return redirect()->route('home');
        }

        return Inertia::render('OrderSuccess', [
            'order' => $order->load('items.product'),
        ]);
    }
}
