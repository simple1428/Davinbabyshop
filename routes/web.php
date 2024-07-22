<?php

use Inertia\Inertia; 
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\HomeController\Product;
use App\Http\Controllers\HomeController\Index as HomeIndex;
use App\Http\Controllers\ReportController;

 Route::get('/',[HomeIndex::class,'index'])->name('home');
 Route::get('/products',[Product::class,'index'])->name('products.index');
 Route::post('/transactions', [TransactionController::class, 'store'])->name('transactions.store');
 Route::get('reports', [ReportController::class, 'index'])->name('reports.index');
 Route::delete('/products/{id}', [Product::class, 'destroy'])->name('products.destroy');
 // Menampilkan form tambah produk
Route::get('/products/create', [Product::class, 'create'])->name('products.create');
Route::resource('inventory', InventoryController::class);

// Menyimpan produk baru
Route::post('/products', [Product::class, 'store'])->name('products.store');

Route::get('/products/{id}/edit', [Product::class, 'edit'])->name('products.edit');

// Route for updating the product
Route::put('/products/{id}', [Product::class, 'update'])->name('products.update');
 Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';