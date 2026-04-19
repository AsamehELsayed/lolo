import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell, PieChart, Pie, Legend
} from 'recharts';
import { 
    TrendingUp, 
    Users, 
    ShoppingBag, 
    MapPin, 
    Monitor, 
    Smartphone, 
    Tablet, 
    Eye,
    Globe,
    Clock,
    ArrowRight,
    Activity
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface Stats {
    totalOrders: number;
    totalRevenue: number;
    totalVisits: number;
    topCountry: string;
}

interface ChartData {
    orderTrends: any[];
    visitPeaks: any[];
    deviceDistribution: any[];
    topCities: any[];
}

interface Product {
    id: number;
    name: string;
    views_count: number;
    price: number;
    image_path: string;
}

interface Visit {
    id: number;
    city: string;
    country: string;
    device: string;
    path: string;
    time: string;
}

interface Props {
    stats: Stats;
    charts: ChartData;
    topProducts: Product[];
    recentVisits: Visit[];
}

export default function Dashboard({ stats, charts, topProducts, recentVisits }: Props) {
    const BURGUNDY = '#4B1A24'; // Using a more specific brand burgundy
    const BLUSH = '#F9E6E9';
    const CREAM = '#FAF7F5';
    const CHART_COLORS = [BURGUNDY, '#8E4A49', '#D9A1A1', '#EAD5D5', '#F2E1E1'];

    const getDeviceIcon = (device: string) => {
        switch (device?.toLowerCase()) {
            case 'mobile': return <Smartphone className="size-4" />;
            case 'tablet': return <Tablet className="size-4" />;
            default: return <Monitor className="size-4" />;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-8 p-8 bg-[#FAF7F5]">
                {/* Elegant Header */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-3xl font-serif text-[#4B1A24]">Business Intelligence</h1>
                    <p className="text-neutral-500 font-sans text-sm tracking-wide">Real-time performance analytics for Lolo</p>
                </div>

                {/* Refined Stats Grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard 
                        title="Total Orders" 
                        value={stats.totalOrders} 
                        icon={<ShoppingBag className="size-5" />}
                        subtext="Processing orders"
                    />
                    <StatCard 
                        title="Revenue" 
                        value={`$${stats.totalRevenue.toLocaleString()}`} 
                        icon={<TrendingUp className="size-5" />}
                        subtext="Total store revenue"
                    />
                    <StatCard 
                        title="Audience Visits" 
                        value={stats.totalVisits} 
                        icon={<Users className="size-5" />}
                        subtext="Across all platforms"
                    />
                    <StatCard 
                        title="Top Region" 
                        value={stats.topCountry || "N/A"} 
                        icon={<Globe className="size-5" />}
                        subtext="Active market"
                    />
                </div>

                <div className="grid gap-8 lg:grid-cols-12">
                    {/* Main Performance Chart */}
                    <div className="lg:col-span-8 bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#F9E6E9] rounded-lg">
                                    <Activity className="size-5 text-[#4B1A24]" />
                                </div>
                                <h3 className="text-xl font-serif text-[#4B1A24]">Market Performance</h3>
                            </div>
                        </div>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={charts.orderTrends}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#4B1A24" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#4B1A24" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EAD5D5" />
                                    <XAxis 
                                        dataKey="date" 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 12, fill: '#4B1A24', opacity: 0.6}} 
                                        dy={10} 
                                    />
                                    <YAxis 
                                        axisLine={false} 
                                        tickLine={false} 
                                        tick={{fontSize: 12, fill: '#4B1A24', opacity: 0.6}} 
                                    />
                                    <Tooltip 
                                        contentStyle={{ 
                                            borderRadius: '12px', 
                                            border: '1px solid #F9E6E9', 
                                            backgroundColor: '#FFF',
                                            boxShadow: '0 10px 15px -3px rgba(75,26,36,0.1)' 
                                        }}
                                    />
                                    <Area 
                                        type="monotone" 
                                        dataKey="revenue" 
                                        stroke="#4B1A24" 
                                        strokeWidth={2.5}
                                        fillOpacity={1} 
                                        fill="url(#colorRevenue)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Device Insights */}
                    <div className="lg:col-span-4 bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                        <h3 className="text-xl font-serif text-[#4B1A24] mb-8">Device Insights</h3>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={charts.deviceDistribution}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={90}
                                        paddingAngle={8}
                                        dataKey="count"
                                        nameKey="device"
                                    >
                                        {charts.deviceDistribution.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-3">
                            {charts.deviceDistribution.map((device, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                                        <span className="text-neutral-600 capitalize">{device.device}</span>
                                    </div>
                                    <span className="font-medium text-[#4B1A24]">{device.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Live Stream of Activity */}
                    <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-serif text-[#4B1A24]">Recent Visits</h3>
                            <Activity className="size-4 text-emerald-500 animate-pulse" />
                        </div>
                        <div className="space-y-4 max-h-[440px] overflow-y-auto pr-2 custom-scrollbar">
                            {recentVisits.length > 0 ? (
                                recentVisits.map((visit) => (
                                    <div key={visit.id} className="flex items-center justify-between p-4 bg-[#FAF7F5] rounded-xl border border-[#F9E6E9]/30 hover:bg-white hover:shadow-sm transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-white rounded-lg shadow-sm group-hover:bg-[#F9E6E9]/50 transition-colors">
                                                {getDeviceIcon(visit.device)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-[#4B1A24] text-sm">{visit.city || 'Unknown City'}, {visit.country}</p>
                                                <p className="text-xs text-neutral-400 font-sans tracking-tight">Viewing {visit.path === '/' ? 'Home' : visit.path}</p>
                                            </div>
                                        </div>
                                        <span className="text-[10px] font-medium text-neutral-400 uppercase tracking-widest">{visit.time}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-neutral-400 italic">No visit data logged yet.</div>
                            )}
                        </div>
                    </div>

                    {/* Popular Collection */}
                    <div className="bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] p-8">
                        <h3 className="text-xl font-serif text-[#4B1A24] mb-8">Popular Products</h3>
                        <div className="space-y-5">
                            {topProducts.length > 0 ? (
                                topProducts.map((product) => (
                                    <div key={product.id} className="flex items-center gap-5 hover:translate-x-1 transition-transform cursor-pointer group">
                                        <div className="size-14 rounded-xl bg-[#FAF7F5] overflow-hidden border border-[#F9E6E9]">
                                            {product.image_path && (
                                                <img src={`/storage/${product.image_path}`} className="size-full object-cover group-hover:scale-110 transition-transform duration-500" alt={product.name} />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[15px] font-medium text-[#4B1A24] truncate">{product.name}</h4>
                                            <p className="text-xs text-neutral-400 mt-0.5">${product.price}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-[#4B1A24] flex items-center justify-end gap-1.5">
                                                <Eye className="size-3.5 opacity-60" />
                                                {product.views_count}
                                            </p>
                                            <p className="text-[10px] uppercase tracking-tighter text-neutral-400">impressions</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-12 text-neutral-400 italic font-sans">Your collection will appear here as views grow.</div>
                            )}
                        </div>
                        {topProducts.length > 0 && (
                            <button className="w-full mt-8 py-3 text-sm font-medium text-[#4B1A24] bg-[#F9E6E9]/50 rounded-xl hover:bg-[#F9E6E9] transition-colors flex items-center justify-center gap-2">
                                View Detailed Inventory
                                <ArrowRight className="size-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ title, value, icon, subtext }: { title: string, value: string | number, icon: any, subtext: string }) {
    return (
        <div className="p-8 bg-white border border-[#F9E6E9] rounded-2xl shadow-[0_4px_20px_-4px_rgba(75,26,36,0.05)] group hover:border-[#4B1A24]/30 transition-all">
            <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold tracking-[0.1em] text-neutral-400 uppercase">{title}</p>
                <div className="p-2 bg-[#F9E6E9] text-[#4B1A24] rounded-lg opacity-80 group-hover:opacity-100 transition-opacity">
                    {icon}
                </div>
            </div>
            <h4 className="text-3xl font-serif text-[#4B1A24] mb-1">{value}</h4>
            <p className="text-xs text-neutral-500 font-sans">{subtext}</p>
        </div>
    );
}
