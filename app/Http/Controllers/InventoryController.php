<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Inventory;
use Illuminate\Http\Request;

class InventoryController extends Controller
{
public function index()
{
$inventories = Inventory::with('product')->get();
return Inertia::render('Inventory/Index', ['inventories' => $inventories]);
}

public function create()
{
$products = Product::all();
return Inertia::render('Inventory/Create', ['products' => $products]);
}

public function store(Request $request)
{
$request->validate([
'product_id' => 'required|exists:products,id',
'quantity' => 'required|integer|min:0',
'entry_date' => 'required|date',
'exit_date' => 'nullable|date|after_or_equal:entry_date',
]);

Inventory::create($request->all());

return redirect()->route('inventories.index')->with('success', 'Inventory added successfully.');
}

public function edit($id)
{
$inventory = Inventory::findOrFail($id);
$products = Product::all();
return Inertia::render('Inventory/Edit', ['inventory' => $inventory, 'products' => $products]);
}

public function update(Request $request, $id)
{
$request->validate([
'product_id' => 'required|exists:products,id',
'quantity' => 'required|integer|min:0',
'entry_date' => 'required|date',
'exit_date' => 'nullable|date|after_or_equal:entry_date',
]);

$inventory = Inventory::findOrFail($id);
$inventory->update($request->all());

return redirect()->route('inventories.index')->with('success', 'Inventory updated successfully.');
}

public function destroy($id)
{
$inventory = Inventory::findOrFail($id);
$inventory->delete();

return redirect()->route('inventories.index')->with('success', 'Inventory deleted successfully.');
}
}