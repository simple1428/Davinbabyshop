<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Inventory extends Model
{
    use HasFactory;

    protected $fillable = ['product_id', 'quantity', 'entry_date', 'exit_date'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}