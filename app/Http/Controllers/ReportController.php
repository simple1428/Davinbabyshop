<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Transaction;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $startDate = $request->input('start_date', now()->startOfMonth()->toDateString());
        $endDate = $request->input('end_date', now()->endOfMonth()->toDateString());

        // Total Sales
        $totalSales = Transaction::whereBetween('created_at', [$startDate, $endDate])
            ->sum('final_total');

        // Top Selling Products
        $topProducts = Product::select('products.id', 'products.name', \DB::raw('SUM(transaction_items.quantity) as total_quantity'))
            ->join('transaction_items', 'products.id', '=', 'transaction_items.product_id')
            ->whereBetween('transaction_items.created_at', [$startDate, $endDate])
            ->groupBy('products.id', 'products.name')
            ->orderBy('total_quantity', 'desc')
            ->take(10)
            ->get();

        // Sales by Category
        $salesByCategory = Product::select('categories.name', \DB::raw('SUM(transaction_items.total) as total_sales'))
            ->join('transaction_items', 'products.id', '=', 'transaction_items.product_id')
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->whereBetween('transaction_items.created_at', [$startDate, $endDate])
            ->groupBy('categories.name')
            ->orderBy('total_sales', 'desc')
            ->get();

        return Inertia::render('Reports/Index', [
            'totalSales' => $totalSales,
            'topProducts' => $topProducts,
            'salesByCategory' => $salesByCategory,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }
}