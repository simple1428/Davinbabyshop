<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;
    protected $fillable = ['total', 'discount', 'final_total'];

    public function items()
    {
        return $this->hasMany(TransactionItem::class);
    }

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->transaction_code = self::generateTransactionCode();
        });
    }

    private static function generateTransactionCode()
    {
        return 'TXN-' . strtoupper(uniqid());
    }
}