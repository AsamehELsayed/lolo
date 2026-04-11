<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\ProductImage;

class MigrateProductImagesSeeder extends Seeder
{
    public function run(): void
    {
        $products = Product::all();

        foreach ($products as $product) {
            // Migrate front image
            if ($product->front_image_path && !ProductImage::where('product_id', $product->id)->where('image_path', $product->front_image_path)->exists()) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $product->front_image_path,
                    'is_primary' => true,
                    'order' => 0
                ]);
            }

            // Migrate back image
            if ($product->back_image_path && !ProductImage::where('product_id', $product->id)->where('image_path', $product->back_image_path)->exists()) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $product->back_image_path,
                    'is_primary' => false,
                    'order' => 1
                ]);
            }
            
            // Migrate image_path if it's different (legacy)
            if ($product->image_path && $product->image_path !== $product->front_image_path && !ProductImage::where('product_id', $product->id)->where('image_path', $product->image_path)->exists()) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'image_path' => $product->image_path,
                    'is_primary' => false,
                    'order' => 2
                ]);
            }
        }
    }
}
