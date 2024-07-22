<?php

namespace App\Http\Controllers\HomeController;

use Inertia\Inertia;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Product as ProductModels;

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
    public function destroy($id)
    {
        $product = ProductModels::findOrFail($id);
        $product->delete();

        return redirect()->back()->with('success', 'Product deleted successfully');
    }
    
    public function create()
    {
        $categories = Category::all();
        return Inertia::render('Product/Create', [
            'categories' => $categories,
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string',
        ]);
    
        $slug = Str::slug($request->name); // Generate slug from product name
        $originalSlug = $slug;
    
        // Ensure the slug is unique
        $count = 1;
        while (ProductModels::where('slug', $slug)->exists()) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }
    
        ProductModels::create([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image' => $request->image,
        ]);
    
        return redirect()->route('products.index')->with('success', 'Product added successfully.');
    }

    public function edit($id)
    {
        $product = ProductModels::findOrFail($id);
        $categories = Category::all(); // Fetch categories for the select field

        return Inertia::render('Product/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'stock' => 'required|integer',
            'category_id' => 'nullable|exists:categories,id',
            'image' => 'nullable|string',
        ]);

        $product = ProductModels::findOrFail($id);
        $slug = Str::slug($request->name);

        // Ensure the slug is unique
        $originalSlug = $slug;
        if ($product->slug !== $slug && ProductModels::where('slug', $slug)->exists()) {
            $count = 1;
            while (ProductModels::where('slug', $slug)->exists()) {
                $slug = $originalSlug . '-' . $count;
                $count++;
            }
        }

        $product->update([
            'name' => $request->name,
            'slug' => $slug,
            'description' => $request->description,
            'price' => $request->price,
            'stock' => $request->stock,
            'category_id' => $request->category_id,
            'image' => $request->image,
        ]);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }
    
}