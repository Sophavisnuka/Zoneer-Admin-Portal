<?php

use App\Http\Controllers\Admin\Auth\AdminSessionController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {

    Route::middleware('guest:admin')->group(function () {
        Route::get('login', [AdminSessionController::class, 'create'])->name('login');
        Route::post('login', [AdminSessionController::class, 'store'])->name('login.store');
    });

    Route::middleware('auth:admin')->group(function () {
        Route::post('logout', [AdminSessionController::class, 'destroy'])->name('logout');
        Route::get('dashboard', fn () => inertia('Admin/Dashboard'))->name('dashboard');
    });
});
