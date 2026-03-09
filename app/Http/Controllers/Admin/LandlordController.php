<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\AppUser;
use Inertia\Inertia;

class LandlordController extends Controller
{
    public function index () {
        $landlords = AppUser::query()
            ->select('id','fullname', 'phone_number', 'email', 'verify_status', 'created_at')
            ->where('role', 'landlord') // Where after select for better performance
            ->orderByDesc('created_at')
            ->paginate(10)
            ->withQueryString();
        
        return Inertia::render('Landlord', [
            'landlords' => $landlords,
        ]);
    }
}
