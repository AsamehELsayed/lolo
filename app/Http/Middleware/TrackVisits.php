<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Visit;
use Jenssegers\Agent\Agent;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Only track successful GET requests that are not AJAX and not admin/dashboard routes
        if ($request->isMethod('GET') && 
            !$request->ajax() && 
            $response->status() === 200 &&
            !$request->is('dashboard*') &&
            !$request->is('api*')) {
            
            try {
                $agent = new Agent();
                $agent->setUserAgent($request->userAgent());
                
                $ip = $request->ip();
                
                $location = geoip($ip);

                Visit::create([
                    'ip_address' => $request->ip(),
                    'country' => $location->country ?? 'Unknown',
                    'city' => $location->city ?? 'Unknown',
                    'path' => $request->path(),
                    'device' => $this->getDeviceType($agent),
                    'browser' => $agent->browser() ?: 'Unknown',
                    'platform' => $agent->platform() ?: 'Unknown',
                    'user_agent' => $request->userAgent(),
                ]);
            } catch (\Exception $e) {
                // Silently fail if tracking fails to not disrupt user experience
                \Log::error('Visit Tracking Error: ' . $e->getMessage());
            }
        }

        return $response;
    }

    protected function getDeviceType(Agent $agent)
    {
        if ($agent->isTablet()) {
            return 'Tablet';
        } elseif ($agent->isMobile()) {
            return 'Mobile';
        }
        return 'Desktop';
    }
}
