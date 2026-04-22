import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
    ChevronLeft, 
    MapPin, 
    Phone, 
    Mail, 
    Calendar, 
    CreditCard, 
    Package,
    ArrowRight
} from "lucide-react";
import { formatPrice } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    order: any;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Orders', href: '/dashboard/orders' },
    { title: 'Order Details', href: '#' },
];

export default function Show({ order }: Props) {
    const { setData, put, processing } = useForm({
        status: order.status
    });

    const updateStatus = (value: string) => {
        setData('status', value);
        // @ts-ignore
        put(route('dashboard.orders.update', order.id));
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'processing': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'shipped': return 'bg-indigo-100 text-indigo-700 border-indigo-200';
            case 'delivered': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'cancelled': return 'bg-rose-100 text-rose-700 border-rose-200';
            default: return 'bg-neutral-100 text-neutral-700 border-neutral-200';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Order #${order.id}`} />
            
            <div className="flex flex-col gap-8 p-8 bg-[#FAF7F5]">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild className="rounded-full border-[#F9E6E9] hover:bg-[#F9E6E9] text-[#4B1A24]">
                        {/* @ts-ignore */}
                        <Link href={route('dashboard.orders.index')}>
                            <ChevronLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-serif text-[#4B1A24]">Order #{order.id}</h1>
                            <Badge variant="outline" className={`rounded-full px-4 py-1 text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                {order.status}
                            </Badge>
                        </div>
                        <p className="text-neutral-500 font-sans text-sm tracking-wide mt-1">Placed on {new Date(order.created_at).toLocaleString()}</p>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column: Order Items */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                            <h3 className="text-xl font-serif text-[#4B1A24] mb-6 flex items-center gap-2">
                                <Package className="size-5 text-burgundy/60" />
                                Order Items
                            </h3>
                            <div className="space-y-6">
                                {order.items.map((item: any) => (
                                    <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-[#F9E6E9] last:border-0 last:pb-0">
                                        <div className="size-20 rounded-xl bg-[#FAF7F5] border border-[#F9E6E9] overflow-hidden flex-shrink-0">
                                            {item.product.image_path && (
                                                <img src={`/storage/${item.product.image_path}`} className="size-full object-cover" alt={item.product.name} />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-[#4B1A24]">{item.product.name}</h4>
                                            <p className="text-sm text-neutral-500 mt-1 italic">{item.product.description?.substring(0, 50)}...</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold text-[#4B1A24]">{formatPrice(parseFloat(item.price))}</p>
                                            <p className="text-xs text-neutral-400">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-[#4B1A24]/10 flex flex-col gap-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-500">Subtotal</span>
                                    <span className="font-medium text-[#4B1A24]">{formatPrice(parseFloat(order.total_amount) - (parseFloat(order.shipping_fee) || 0))}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-neutral-500">Shipping</span>
                                    <span className="font-medium text-[#4B1A24]">{formatPrice(parseFloat(order.shipping_fee) || 0)}</span>
                                </div>
                                <div className="flex justify-between items-center pt-4 border-t border-[#F9E6E9]">
                                    <span className="text-lg font-serif text-[#4B1A24]">Total Amount</span>
                                    <span className="text-2xl font-serif text-[#4B1A24] font-bold">{formatPrice(parseFloat(order.total_amount))}</span>
                                </div>
                            </div>
                        </div>

                        {/* Order Notes */}
                        {order.notes && (
                            <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                                <h3 className="text-xl font-serif text-[#4B1A24] mb-4">Customer Notes</h3>
                                <p className="text-neutral-600 italic bg-[#FAF7F5] p-6 rounded-xl border border-[#F9E6E9]/50">
                                    "{order.notes}"
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column: Customer Info & Actions */}
                    <div className="flex flex-col gap-6">
                        {/* Status Management */}
                        <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                            <h3 className="text-xl font-serif text-[#4B1A24] mb-6 group-hover:text-burgundy">Manage Status</h3>
                            <Select value={order.status} onValueChange={updateStatus} disabled={processing}>
                                <SelectTrigger className="w-full rounded-xl border-[#F9E6E9] h-12 focus:ring-[#4B1A24]">
                                    <SelectValue placeholder="Update status" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-[#F9E6E9]">
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="shipped">Shipped</SelectItem>
                                    <SelectItem value="delivered">Delivered</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-[10px] text-neutral-400 mt-4 uppercase tracking-tighter">Updating status will notify the systems.</p>
                        </div>

                        {/* Customer Information */}
                        <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                            <h3 className="text-xl font-serif text-[#4B1A24] mb-6">Customer Details</h3>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="p-2 bg-[#FAF7F5] rounded-lg h-fit">
                                        <MapPin className="size-4 text-burgundy/60" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Delivery Address</span>
                                        <span className="text-sm font-medium text-[#4B1A24]">{order.customer_name}</span>
                                        <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{order.customer_address}, {order.customer_city}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="p-2 bg-[#FAF7F5] rounded-lg h-fit">
                                        <Phone className="size-4 text-burgundy/60" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Phone Number</span>
                                        <span className="text-sm font-medium text-[#4B1A24] font-sans tracking-wide">{order.customer_phone}</span>
                                    </div>
                                </div>
                                {order.customer_email && (
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-[#FAF7F5] rounded-lg h-fit">
                                            <Mail className="size-4 text-burgundy/60" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Email</span>
                                            <span className="text-sm font-medium text-[#4B1A24] line-clamp-1">{order.customer_email}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="flex gap-4">
                                    <div className="p-2 bg-[#FAF7F5] rounded-lg h-fit">
                                        <CreditCard className="size-4 text-burgundy/60" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs uppercase tracking-widest text-neutral-400 font-bold mb-1">Payment Method</span>
                                        <span className="text-sm font-medium text-[#4B1A24] uppercase tracking-tighter">{order.payment_method}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
