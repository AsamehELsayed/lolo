import { Head, useForm, Link } from "@inertiajs/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { CartItem } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft, CreditCard, Truck, CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface Props {
    cart: CartItem[];
    total: number;
}

export default function Checkout({ cart, total }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('checkout.store'));
    };

    return (
        <>
            <Head title="Checkout | LOLO BRAND" />
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />

                <main className="flex-1 pt-32 pb-32">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="flex items-center gap-4 mb-12">
                            <Link href={route('products.index')} className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase">
                                <ArrowLeft size={14} /> Back to Collection / العودة للمجموعة
                            </Link>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 xl:gap-24">
                            {/* Left: Checkout Form */}
                            <div className="lg:col-span-7">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <h1 className="font-serif text-3xl md:text-5xl tracking-wide text-foreground mb-8">
                                        Checkout / إتمام الطلب
                                    </h1>

                                    <div className="bg-cream/20 border border-border/10 p-8 mb-12 flex items-center gap-6">
                                        <div className="w-12 h-12 bg-black text-white flex items-center justify-center flex-shrink-0">
                                            <Truck size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-serif text-xl mb-1">Payment & Delivery / الدفع والتوصيل</h3>
                                            <p className="text-sm text-muted-foreground">
                                                We currently only support <span className="text-foreground font-semibold">Cash on Delivery / الدفع عند الاستلام</span>. Pay for your luxury piece when it reaches your doorstep. / ادفع ثمن قطعتك الفاخرة عند وصولها إلى باب منزلك.
                                            </p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-10">
                                        <div className="space-y-6">
                                            <h2 className="font-serif text-2xl tracking-wide mb-6">Shipping Details / تفاصيل الشحن</h2>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <Label htmlFor="name" className="text-[10px] tracking-widest uppercase text-muted-foreground">name / الاسم *</Label>
                                                    <Input 
                                                        id="name" 
                                                        value={data.name} 
                                                        onChange={e => setData('name', e.target.value)}
                                                        className="rounded-none border-border/40 focus:border-black transition-all bg-transparent h-12"
                                                        placeholder="Name / الاسم"
                                                        required
                                                    />
                                                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="phone" className="text-[10px] tracking-widest uppercase text-muted-foreground">Phone Number / رقم الهاتف *</Label>
                                                    <Input 
                                                        id="phone" 
                                                        value={data.phone} 
                                                        onChange={e => setData('phone', e.target.value)}
                                                        className="rounded-none border-border/40 focus:border-black transition-all bg-transparent h-12"
                                                        placeholder="+962 7X XXX XXXX"
                                                        required
                                                    />
                                                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-[10px] tracking-widest uppercase text-muted-foreground">Email Address / البريد الإلكتروني (Optional / اختياري)</Label>
                                                <Input 
                                                    id="email" 
                                                    type="email"
                                                    value={data.email} 
                                                    onChange={e => setData('email', e.target.value)}
                                                    className="rounded-none border-border/40 focus:border-black transition-all bg-transparent h-12"
                                                    placeholder="NAME@EXAMPLE.COM / البريد الإلكتروني"
                                                />
                                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                <div className="md:col-span-2 space-y-2">
                                                    <Label htmlFor="address" className="text-[10px] tracking-widest uppercase text-muted-foreground">address / العنوان *</Label>
                                                    <Input 
                                                        id="address" 
                                                        value={data.address} 
                                                        onChange={e => setData('address', e.target.value)}
                                                        className="rounded-none border-border/40 focus:border-black transition-all bg-transparent h-12"
                                                        placeholder="STREET NAME, BUILDING NO, APARTMENT... / اسم الشارع، رقم البناء، الشقة..."
                                                        required
                                                    />
                                                    {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="city" className="text-[10px] tracking-widest uppercase text-muted-foreground">City / المدينة *</Label>
                                                    <Input 
                                                        id="city" 
                                                        value={data.city} 
                                                        onChange={e => setData('city', e.target.value)}
                                                        className="rounded-none border-border/40 focus:border-black transition-all bg-transparent h-12"
                                                        placeholder="AMMAN / عمان"
                                                        required
                                                    />
                                                    {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="notes" className="text-[10px] tracking-widest uppercase text-muted-foreground">Order Notes / ملاحظات الطلب (Optional / اختياري)</Label>
                                                <Textarea 
                                                    id="notes" 
                                                    value={data.notes} 
                                                    onChange={e => setData('notes', e.target.value)}
                                                    className="rounded-none border-border/40 focus:border-black transition-all bg-transparent min-h-[120px] resize-none"
                                                    placeholder="ANY SPECIAL INSTRUCTIONS FOR DELIVERY... / أي تعليمات خاصة للتوصيل..."
                                                />
                                            </div>
                                        </div>

                                        <Button 
                                            type="submit" 
                                            disabled={processing}
                                            className="w-full rounded-none h-16 bg-black hover:bg-black/90 text-white text-[10px] tracking-[0.4em] uppercase font-bold transition-all"
                                        >
                                            {processing ? "PROCESSING ORDER / جاري معالجة الطلب..." : `CONFIRM ORDER / تأكيد الطلب – ${formatPrice(total)} JOD`}
                                        </Button>
                                    </form>
                                </motion.div>
                            </div>

                            {/* Right: Order Summary */}
                            <div className="lg:col-span-5">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                    className="bg-cream/30 border border-border/10 p-8 lg:sticky lg:top-32"
                                >
                                    <h2 className="font-serif text-2xl tracking-wide mb-8">Order Summary / ملخص الطلب</h2>
                                    
                                    <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-none">
                                        {cart.map((item) => (
                                            <div key={item.id} className="flex gap-4">
                                                <div className="w-16 aspect-[3/4] bg-white flex-shrink-0">
                                                    <img src={item.image || ''} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <h4 className="text-sm font-medium">{item.name}</h4>
                                                        <p className="text-sm font-semibold">{formatPrice(item.price)} JOD</p>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Qty: {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Subtotal / المجموع الفرعي</span>
                                            <span className="font-medium">{formatPrice(total)} JOD</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground uppercase tracking-widest text-[10px]">Shipping / الشحن</span>
                                            <span className="text-green-600 font-medium italic">Complimentary / مجاني</span>
                                        </div>
                                        <Separator className="bg-border/20" />
                                        <div className="flex justify-between font-serif text-xl pt-2">
                                            <span className="uppercase tracking-widest">Total / الإجمالي</span>
                                            <span className="font-bold text-2xl">{formatPrice(total)} JOD</span>
                                        </div>
                                    </div>

                                    <div className="mt-12 pt-12 border-t border-border/10 space-y-4">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <CheckCircle2 size={16} className="text-green-600" />
                                            <span className="text-[9px] uppercase tracking-widest">Luxury Packaging Included / تغليف فاخر متضمن</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <CheckCircle2 size={16} className="text-green-600" />
                                            <span className="text-[9px] uppercase tracking-widest">Express Delivery (24-48h) / توصيل سريع (٢٤-٤٨ ساعة)</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                .scrollbar-none::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-none {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </>
    );
}
