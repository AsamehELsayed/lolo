<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Inertia\Inertia;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of orders.
     */
    public function index()
    {
        return Inertia::render('Orders/Index', [
            'orders' => Order::latest()->paginate(20)
        ]);
    }

    /**
     * Display the specified order.
     */
    public function show(Order $order)
    {
        return Inertia::render('Orders/Show', [
            'order' => $order->load(['items.product', 'user'])
        ]);
    }

    /**
     * Update the specified order's status.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|string|in:pending,processing,shipped,delivered,cancelled'
        ]);

        $order->update(['status' => $request->status]);

        return back()->with('success', 'Order status updated successfully.');
    }
}
