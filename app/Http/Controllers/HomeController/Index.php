<?php

namespace App\Http\Controllers\HomeController;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Index extends Controller
{
    public function index()
    {
        $data = [
            'categories' => Category::get(),
            'products' => Product::get()
        ];
        return Inertia::render('Home/Index',$data);
    }
}