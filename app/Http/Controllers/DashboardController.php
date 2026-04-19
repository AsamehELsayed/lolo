<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Visit;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        // 1. Stats Overview
        $totalOrders = Order::count();
        $totalRevenue = Order::sum('total_amount');
        $totalVisits = Visit::count();
        $topCountry = Visit::select('country', DB::raw('count(*) as total'))
            ->groupBy('country')
            ->orderByDesc('total')
            ->first();

        // 2. Order Trends (Last 30 days)
        $orderTrends = Order::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('count(*) as count'),
            DB::raw('sum(total_amount) as revenue')
        )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // 3. Visit Traffic Peaks (By Hour)
        $visitPeaks = Visit::select(
            DB::raw('HOUR(created_at) as hour'),
            DB::raw('count(*) as count')
        )
            ->where('created_at', '>=', now()->subDays(7))
            ->groupBy('hour')
            ->orderBy('hour')
            ->get();

        // 4. Device Distribution
        $deviceDistribution = Visit::select('device', DB::raw('count(*) as count'))
            ->groupBy('device')
            ->get();

        // 5. Geographic (Cities)
        $topCities = Visit::select('city', 'country', DB::raw('count(*) as count'))
            ->whereNotNull('city')
            ->groupBy('city', 'country')
            ->orderByDesc('count')
            ->take(10)
            ->get();

        // 6. Top Viewed Products
        $topProducts = Product::orderByDesc('views_count')
            ->take(5)
            ->get();

        // 7. Recent Visits (Live Feed)
        $recentVisits = Visit::latest()
            ->take(20)
            ->get()
            ->map(function($visit) {
                return [
                    'id' => $visit->id,
                    'city' => $visit->city,
                    'country' => $visit->country,
                    'device' => $visit->device,
                    'path' => $visit->path,
                    'time' => $visit->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => round($totalRevenue, 2),
                'totalVisits' => $totalVisits,
                'topCountry' => $topCountry ? $topCountry->country : 'N/A',
            ],
            'charts' => [
                'orderTrends' => $orderTrends,
                'visitPeaks' => $visitPeaks,
                'deviceDistribution' => $deviceDistribution,
                'topCities' => $topCities,
            ],
            'topProducts' => $topProducts,
            'recentVisits' => $recentVisits,
        ]);
    }
}
