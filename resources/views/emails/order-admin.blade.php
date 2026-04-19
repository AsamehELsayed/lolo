<x-mail::message>
# New Order Received!

A new order has been placed on {{ config('app.name') }}.

## Order Overview:
**Order ID:** #{{ $order->id }}  
**Customer:** {{ $order->customer_name }}  
**Email:** {{ $order->customer_email ?? 'N/A' }}  
**Total:** {{ number_format($order->total_amount, 2) }} {{ config('app.currency', 'QAR') }}

### Shipping Information:
**Address:** {{ $order->customer_address }}, {{ $order->customer_city }}  
**Phone:** {{ $order->customer_phone }}

**Notes:** {{ $order->notes ?? 'No notes provided.' }}

<x-mail::button :url="config('app.url') . '/dashboard/orders/' . $order->id" color="success">
View Order Details
</x-mail::button>

Thanks,<br>
{{ config('app.name') }} Admin System
</x-mail::message>
