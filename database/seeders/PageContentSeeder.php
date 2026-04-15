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
            'heritage_label' => 'Our Heritage',
            'heritage_title' => 'Crafted with Passion & Undeniable Grace',
            'heritage_description' => "LOLO BRAND was born from a desire to blend traditional craftsmanship with contemporary feminine aesthetics. Every bag is a testament to the modern woman's journey—sophisticated, resilient, and inherently elegant.",
            'heritage_stat1_value' => '100%',
            'heritage_stat1_label' => 'Handmade',
            'heritage_stat2_value' => '2026',
            'heritage_stat2_label' => 'Est. Jordan',
            'footer_description' => 'Crafting timeless elegance through curated handbag collections. Every stitch tells a story of sophistication and modern femininity.',
            'footer_boutique_links' => "New Arrivals|#\nBest Sellers|#\nAll Collections|#\nCare Guide|#",
            'footer_information_links' => "Our Story|#\nShipping & Returns|#\nPrivacy Policy|#\nTerms of Service|#",
            'footer_address' => "Amman Boutique, 5th Circle\nAmman, Jordan",
            'footer_phone' => '+962 79 000 0000',
            'footer_email' => 'concierge@lolobrand.com',
            'footer_instagram' => 'https://instagram.com',
            'footer_facebook' => 'https://facebook.com',
        ];

        foreach ($contents as $key => $value) {
            \App\Models\PageContent::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
