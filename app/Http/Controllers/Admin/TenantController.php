<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AppUser;
use Inertia\Inertia;

class TenantController extends Controller
{
    public function index () {
        $tenants = AppUser::query()
            ->select('id','fullname', 'phone_number', 'email', 'created_at')
            ->where('role', 'tenant') // Where after select for better performance
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('Tenant', [
            'tenants' => $tenants,
        ]);
    }
}
