<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\PageContent;
use App\Services\CartService;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderClientMail;
use App\Mail\OrderAdminMail;

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

            // Handle Email Notifications
            try {
                $settings = PageContent::whereIn('key', ['notification_admin_email', 'enable_order_notifications'])
                    ->pluck('value', 'key');

                $adminEmail = $settings->get('notification_admin_email', 'abdelrahman2003.12.12@gmail.com');
                
                // Default to enabled if not explicitly set (empty settings array means first time)
                $enableVal = $settings->get('enable_order_notifications');
                $notificationsEnabled = ($enableVal === null) || ($enableVal === '1') || ($enableVal === 'on');

                if ($notificationsEnabled) {
                    // Send to Client
                    if ($order->customer_email) {
                        Mail::to($order->customer_email)->send(new OrderClientMail($order));
                    }

                    // Send to Admin
                    if ($adminEmail) {
                        Mail::to($adminEmail)->send(new OrderAdminMail($order));
                    }
                }
            } catch (\Exception $e) {
                // Log the error but don't stop the checkout process
                \Log::error('Order Notification Error: ' . $e->getMessage());
            }

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
