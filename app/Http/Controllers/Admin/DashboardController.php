<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppUser;
use App\Models\Property;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index () {
        // Use single query with groupBy instead of 2 separate queries
        $stats = AppUser::selectRaw("role, COUNT(*) as count")
            ->whereIn('role', ['landlord', 'tenant'])
            ->groupBy('role')
            ->pluck('count', 'role');
        
        // get property
        $totalProperties = Property::count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'landlords' => $stats['landlord'] ?? 0,
                'tenants'   => $stats['tenant'] ?? 0,
                'properties' => $totalProperties ?? 0
            ],
        ]);
    }
}
