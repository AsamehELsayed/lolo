<x-mail::message>
# Thank you for your order!

Hi {{ $order->customer_name }},

We've received your order and are getting it ready. You'll receive another email when your order ships.

## Order Details:
**Order ID:** #{{ $order->id }}  
**Date:** {{ $order->created_at->format('M d, Y') }}  
**Total:** {{ number_format($order->total_amount, 2) }} {{ config('app.currency', 'QAR') }}

### Shipping Information:
**Address:** {{ $order->customer_address }}, {{ $order->customer_city }}  
**Phone:** {{ $order->customer_phone }}

<x-mail::button :url="config('app.url')">
Visit Our Store
</x-mail::button>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
