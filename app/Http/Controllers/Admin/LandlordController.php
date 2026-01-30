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
            ->where('role', 'landlord')
            ->select('id','fullname', 'phone_number', 'email', 'created_at')
            ->orderByDesc('created_at')
            ->paginate(10);
        return Inertia::render('Landlord', [
            'landlords' => $landlords,
        ]);
    }
}
