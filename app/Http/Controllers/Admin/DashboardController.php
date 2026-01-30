<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AppUser;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index () {
        $landlords = AppUser::where('role', 'landlord')->count();
        $tenants   = AppUser::where('role', 'tenant')->count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'landlords' => $landlords,
                'tenants'   => $tenants,
            ],
        ]);
    }
}
