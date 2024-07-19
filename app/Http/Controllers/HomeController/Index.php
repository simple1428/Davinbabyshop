<?php

namespace App\Http\Controllers\HomeController;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class Index extends Controller
{
    public function index()
    {
        return Inertia::render('Home/Index');
    }
}