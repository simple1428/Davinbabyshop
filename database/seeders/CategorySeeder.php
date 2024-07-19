<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $categories = [
            [
                'name' => 'Toiletries',
                'slug' => 'toiletries'
            ],
            [
                'name' => 'Personal Care',
                'slug' => 'personal-care'
            ],
            [
                'name' => 'Beverages',
                'slug' => 'beverages'
            ],
            [
                'name' => 'Groceries',
                'slug' => 'groceries'
            ],
            [
                'name' => 'Dairy',
                'slug' => 'dairy'
            ],
            [
                'name' => 'Bakery',
                'slug' => 'bakery'
            ],
            [
                'name' => 'Snacks',
                'slug' => 'snacks'
            ],
            [
                'name' => 'Frozen Foods',
                'slug' => 'frozen-foods'
            ],
            [
                'name' => 'Cleaning Supplies',
                'slug' => 'cleaning-supplies'
            ],
            [
                'name' => 'Health Products',
                'slug' => 'health-products'
            ],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}