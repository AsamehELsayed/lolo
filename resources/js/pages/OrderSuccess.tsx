import { Head, Link } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, ShoppingBag, Truck, Calendar, MapPin } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Product {
    name: string;
    price: string | number;
}

interface OrderItem {
    id: number;
    product: Product;
    quantity: number;
    price: string | number;
}

interface Order {
    id: number;
    customer_name: string;
    customer_address: string;
    customer_city: string;
    total_amount: string | number;
    shipping_fee: string | number;
    created_at: string;
    items: OrderItem[];
}

interface Props {
    order: Order;
}

export default function OrderSuccess({ order }: Props) {
    const orderDate = new Date(order.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <>
            <Head title="Order Confirmed | LOLO BRAND" />
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />

                <main className="flex-1 pt-40 pb-32">
                    <div className="max-w-3xl mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="w-24 h-24 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-10"
                        >
                            <Check size={40} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-muted-foreground mb-4">
                                Thank You For Your Trust
                            </p>
                            <h1 className="font-serif text-4xl md:text-6xl tracking-wide text-foreground mb-8">
                                Order Confirmed
                            </h1>
                            <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed mb-12">
                                Your order <span className="text-foreground font-semibold">#{order.id}</span> has been successfully placed. Our team is now preparing your luxury piece for delivery.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-cream/20 border border-border/10 p-10 text-left mb-12"
                        >
                            <h2 className="font-serif text-2xl mb-8 tracking-wide border-b border-border/10 pb-6">Order Details</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <Calendar className="text-muted-foreground flex-shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">Order Date</p>
                                            <p className="text-sm font-medium">{orderDate}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <Truck className="text-muted-foreground flex-shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">Payment Method</p>
                                            <p className="text-sm font-medium">Cash on Delivery</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <MapPin className="text-muted-foreground flex-shrink-0" size={18} />
                                        <div>
                                            <p className="text-[10px] tracking-widest uppercase text-muted-foreground mb-1">Shipping To</p>
                                            <p className="text-sm font-medium">{order.customer_name}</p>
                                            <p className="text-xs text-muted-foreground mt-1">{order.customer_address}, {order.customer_city}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-border/10">
                                <h3 className="text-[10px] tracking-widest uppercase text-muted-foreground mb-6">Items Summary</h3>
                                <div className="space-y-4">
                                    {order.items.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-sm">
                                            <span>
                                                <span className="font-medium text-foreground">{item.product.name}</span>
                                                <span className="text-muted-foreground ml-2">x {item.quantity}</span>
                                            </span>
                                            <span className="font-semibold">{formatPrice(item.price)} JOD</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Subtotal</span>
                                        <span className="font-medium">{formatPrice(Number(order.total_amount) - Number(order.shipping_fee || 0))} JOD</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Shipping</span>
                                        <span className="font-medium">{formatPrice(order.shipping_fee || 0)} JOD</span>
                                    </div>
                                    <Separator className="bg-border/20 my-4" />
                                    <div className="flex justify-between items-center">
                                        <span className="font-serif text-lg tracking-widest uppercase">Total Amount</span>
                                        <span className="font-serif text-2xl font-bold">{formatPrice(order.total_amount)} JOD</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Link href={route('products.index')}>
                                <Button className="rounded-none px-12 h-14 text-white bg-black hover:bg-black/90 text-[10px] tracking-[0.3em] uppercase font-bold">
                                    Continue Shopping
                                </Button>
                            </Link>
                            <Link href={route('home')}>
                                <Button variant="outline" className="rounded-none px-12 h-14 text-[10px] tracking-[0.3em] uppercase">
                                    Return to Homepage
                                </Button>
                            </Link>
                        </motion.div>
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
}

const Separator = ({ className = "" }) => <div className={`h-px w-full ${className}`} />;
