<?php

namespace App\Http\Controllers\HomeController;

use App\Http\Controllers\Controller;
use App\Models\Product as ProductModels;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Product extends Controller
{
    public function index()
    {
        $data = [
            'categories' => Category::get(),
            'products' => ProductModels::get()
        ];
        return Inertia::render('Product/Index',$data);
    }
}