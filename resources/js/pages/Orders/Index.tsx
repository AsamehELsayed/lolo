import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Order {
    id: number;
    customer_name: string;
    total_amount: string;
    status: string;
    created_at: string;
}

interface Props {
    orders: {
        data: Order[];
        links: any[];
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Orders', href: '/dashboard/orders' },
];

export default function Index({ orders }: Props) {
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
            <Head title="Orders Management" />
            
            <div className="flex flex-col gap-8 p-8 bg-[#FAF7F5]">
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-serif text-[#4B1A24]">Order Management</h1>
                    <p className="text-neutral-500 font-sans text-sm tracking-wide">Monitor and process customer transactions</p>
                </div>

                <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] overflow-hidden">
                    <Table>
                        <TableHeader className="bg-[#FAF7F5]/50">
                            <TableRow className="hover:bg-transparent border-[#F9E6E9]">
                                <TableHead className="w-[100px] text-[#4B1A24] font-serif py-5">Order ID</TableHead>
                                <TableHead className="text-[#4B1A24] font-serif">Customer</TableHead>
                                <TableHead className="text-[#4B1A24] font-serif text-center">Date</TableHead>
                                <TableHead className="text-[#4B1A24] font-serif text-center">Amount</TableHead>
                                <TableHead className="text-[#4B1A24] font-serif text-center">Status</TableHead>
                                <TableHead className="text-right text-[#4B1A24] font-serif pr-8">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.data.length > 0 ? (
                                orders.data.map((order) => (
                                    <TableRow key={order.id} className="border-[#F9E6E9] hover:bg-[#FAF7F5]/30 transition-colors">
                                        <TableCell className="font-medium text-[#4B1A24] py-4">#{order.id}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-[#4B1A24]">{order.customer_name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-center text-neutral-500 text-sm">
                                            {new Date(order.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell className="text-center font-bold text-[#4B1A24]">
                                            {formatPrice(parseFloat(order.total_amount))}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Badge variant="outline" className={`rounded-full px-3 py-0.5 text-[10px] font-bold uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                {order.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right pr-8">
                                            <Button variant="ghost" size="sm" asChild className="rounded-full hover:bg-[#F9E6E9] text-[#4B1A24]">
                                                {/* @ts-ignore */}
                                                <Link href={route('dashboard.orders.show', order.id)}>
                                                    <Eye className="size-4 mr-2" />
                                                    View
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-64 text-center">
                                        <div className="flex flex-col items-center justify-center gap-2 opacity-40">
                                            <ShoppingBag size={48} strokeWidth={1} />
                                            <p className="font-serif text-lg">No orders found</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
