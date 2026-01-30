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
            ->where('role', 'tenant')
            ->select('id','fullname', 'phone_number', 'email', 'created_at')
            ->orderByDesc('created_at')
            ->paginate(10);
        return Inertia::render('Tenant', [
            'tenants' => $tenants,
        ]);
    }
}
