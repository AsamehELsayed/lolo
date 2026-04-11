<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PageContentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $contents = [
            'hero_title' => 'LOLO BRAND',
            'hero_subtitle' => 'Luxury Bags, Redefined Elegance',
            'hero_description' => 'Curated for the modern woman who celebrates timeless sophistication and effortless femininity.',
            'about_title' => 'Crafted with Passion',
            'about_subtitle' => 'Where luxury meets femininity',
        ];

        foreach ($contents as $key => $value) {
            \App\Models\PageContent::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
