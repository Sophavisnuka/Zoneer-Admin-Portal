<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LandlordController;
use App\Http\Controllers\Admin\TenantController;
use App\Http\Controllers\Admin\PropertyController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function() {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    //landlords
    Route::get('/landlords', [LandlordController::class, 'index'])->name('landlord');
    //property route
    Route::get('/properties', [PropertyController::class, 'index'])->name('property');
    Route::get('/properties/create', [PropertyController::class, 'create'])->name('property.create');
    Route::post('/properties', [PropertyController::class, 'store'])->name('property.store');
    //tenants
    Route::get('/tenants', [TenantController::class, 'index'])->name('tenant');

});

require __DIR__.'/auth.php';
