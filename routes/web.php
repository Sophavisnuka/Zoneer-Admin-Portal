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
    return redirect()->route('login');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(['auth', 'verified'])->group(function() {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Landlords
    Route::get('/landlords', [LandlordController::class, 'index'])->name('landlord');
    
    // Property
    Route::get('/properties', [PropertyController::class, 'index'])->name('property');
    Route::get('/properties/create', [PropertyController::class, 'create'])->name('property.create');
    Route::post('/properties', [PropertyController::class, 'store'])->name('property.store');
    Route::get('/properties/{property}/edit', [PropertyController::class, 'edit'])->name('property.edit');
    Route::patch('/properties/{property}', [PropertyController::class, 'update'])->name('property.update');
    Route::delete('/properties/{property}', [PropertyController::class, 'destroy'])->name('property.destroy');

    // Tenants
    Route::get('/tenants', [TenantController::class, 'index'])->name('tenant');

});

require __DIR__.'/auth.php';
