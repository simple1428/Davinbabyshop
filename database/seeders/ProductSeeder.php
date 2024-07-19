<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $products = [
            [
                'name' => 'Pepsodent',
                'description' => 'Pasta gigi yang melindungi gigi dari plak dan memberikan napas segar.',
                'price' => 15000,
                'stock' => 100,
                'image' => 'pepsodent.jpg',
                'slug' => 'pepsodent',
                'category_id' => 1
            ],
            [
                'name' => 'Lifebuoy Soap',
                'description' => 'Sabun mandi dengan aroma menyegarkan dan memberikan perlindungan dari kuman.',
                'price' => 5000,
                'stock' => 200,
                'image' => 'lifebuoy_soap.jpg',
                'slug' => 'lifebuoy-soap',
                'category_id' => 2
            ],
            [
                'name' => 'Clear Shampoo',
                'description' => 'Shampoo untuk membersihkan dan menyehatkan rambut.',
                'price' => 25000,
                'stock' => 150,
                'image' => 'clear_shampoo.jpg',
                'slug' => 'clear-shampoo',
                'category_id' => 2
            ],
            [
                'name' => 'Kapal Api Coffee',
                'description' => 'Biji kopi pilihan dengan aroma dan rasa yang khas.',
                'price' => 30000,
                'stock' => 75,
                'image' => 'kapal_api_coffee.jpg',
                'slug' => 'kapal-api-coffee',
                'category_id' => 3
            ],
            [
                'name' => 'SariWangi Tea',
                'description' => 'Teh celup dengan aroma dan rasa yang menenangkan.',
                'price' => 20000,
                'stock' => 90,
                'image' => 'sariwangi_tea.jpg',
                'slug' => 'sariwangi-tea',
                'category_id' => 3
            ],
            [
                'name' => 'Gulaku Sugar',
                'description' => 'Gula pasir murni untuk berbagai keperluan dapur.',
                'price' => 12000,
                'stock' => 120,
                'image' => 'gulaku_sugar.jpg',
                'slug' => 'gulaku-sugar',
                'category_id' => 4
            ],
            [
                'name' => 'Refina Salt',
                'description' => 'Garam meja untuk memberikan rasa pada masakan.',
                'price' => 5000,
                'stock' => 130,
                'image' => 'refina_salt.jpg',
                'slug' => 'refina-salt',
                'category_id' => 4
            ],
            [
                'name' => 'Bimoli Cooking Oil',
                'description' => 'Minyak goreng berkualitas untuk keperluan memasak.',
                'price' => 25000,
                'stock' => 60,
                'image' => 'bimoli_cooking_oil.jpg',
                'slug' => 'bimoli-cooking-oil',
                'category_id' => 4
            ],
            [
                'name' => 'Eggs',
                'description' => 'Telur ayam segar untuk berbagai keperluan masak.',
                'price' => 2000,
                'stock' => 300,
                'image' => 'eggs.jpg',
                'slug' => 'eggs',
                'category_id' => 5
            ],
            [
                'name' => 'Sari Roti',
                'description' => 'Roti tawar lembut untuk sarapan dan snack.',
                'price' => 15000,
                'stock' => 50,
                'image' => 'sari_roti.jpg',
                'slug' => 'sari-roti',
                'category_id' => 6
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}