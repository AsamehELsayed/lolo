<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::updateOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => bcrypt('password'),
            ]
        );

        $totes = \App\Models\Category::updateOrCreate(
            ['name' => 'Signature Totes'],
            ['description' => 'A collection of our most iconic, spacious, and versatile leather totes.', 'image_path' => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=1200']
        );

        $clutches = \App\Models\Category::updateOrCreate(
            ['name' => 'Evening Clutches'],
            ['description' => 'Refined pouches designed for the most exclusive evening affairs.', 'image_path' => 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f91?auto=format&fit=crop&q=80&w=1200']
        );

        $crossbody = \App\Models\Category::updateOrCreate(
            ['name' => 'Crossbody Classics'],
            ['description' => 'Hands-free luxury for the dynamic modern lifestyle.', 'image_path' => 'https://images.unsplash.com/photo-1590739225287-bd2bf650274d?auto=format&fit=crop&q=80&w=1200']
        );

        \App\Models\Product::updateOrCreate(
            ['name' => 'The Sovereign Tote'],
            [
                'description' => 'A masterwork of Italian craftsmanship, featuring hand-burnished calfskin and bespoke gold-tone hardware. The ultimate statement of refined elegance.',
                'price' => 2450.00,
                'category_id' => $totes->id,
                'front_image_path' => 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800',
                'back_image_path' => 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=800',
                'is_featured' => true,
            ]
        );

        \App\Models\Product::updateOrCreate(
            ['name' => 'Midnight Eclipse Clutch'],
            [
                'description' => 'Exquisite midnight navy suede paired with a celestial-inspired crystal clasp. Perfect for gala evenings and starlit encounters.',
                'price' => 1200.00,
                'category_id' => $clutches->id,
                'front_image_path' => 'https://images.unsplash.com/photo-1566150905458-1bf1fd113f91?auto=format&fit=crop&q=80&w=800',
                'is_featured' => true,
            ]
        );

        \App\Models\Product::updateOrCreate(
            ['name' => 'Azure Horizon Satchel'],
            [
                'description' => 'Captured in the hue of an Mediterranean dusk, this structured satchel offers both audacity and poise for the modern connoisseur.',
                'price' => 3100.00,
                'category_id' => $totes->id,
                'front_image_path' => 'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&q=80&w=800',
                'is_featured' => false,
            ]
        );

        \App\Models\Product::updateOrCreate(
            ['name' => 'Gilded Rose Crossbody'],
            [
                'description' => 'Soft rose-petal leather accented by intricate 24k gold leaf detailing. A delicate balance of romance and opulence.',
                'price' => 1850.00,
                'category_id' => $crossbody->id,
                'front_image_path' => 'https://images.unsplash.com/photo-1590739225287-bd2bf650274d?auto=format&fit=crop&q=80&w=800',
                'is_featured' => true,
            ]
        );

        $this->call([
            PageContentSeeder::class,
        ]);
    }
}
