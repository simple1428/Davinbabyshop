<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Support\Str;
use Illuminate\Http\Request; 
use App\Models\TransactionItem;

class TransactionController extends Controller
{
    public function store(Request $request)
    {
        $request->validate(
            [
                'cartItems' => 'required|array',
                'cartItems.*.id' => 'required|exists:products,id',
                'cartItems.*.quantity' => 'required|integer|min:1',
                'cartItems.*.price' => 'required|numeric|min:0',
            ]
        ) ;
        $total = collect($request->input('cartItems'))->reduce(function ($carry, $item) {
            return $carry + ($item['price'] * $item['quantity']);
        }, 0);

        // Get discount from request or default to 0
        $discount = $request->input('discount', 0);

        // Calculate the final total after applying discount
        $final_total = $total * (1 - $discount / 100);

        // Create a new transaction
        $transaction = new Transaction();
        $transaction->transaction_code = Str::uuid()->toString(); // Generates a uniq 
        $transaction->total = $total;
        $transaction->discount = $discount;
        $transaction->final_total = $final_total;
        $transaction->save();

        // Create transaction items
        $transactionItems = collect($request->input('cartItems'))->map(function ($item) use ($transaction) {
            return new TransactionItem([
                'transaction_id' => $transaction->id,
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
                'total' => $item['price'] * $item['quantity'],
            ]);
        });

        // Save all transaction items
        $transaction->items()->saveMany($transactionItems); 
    }
}