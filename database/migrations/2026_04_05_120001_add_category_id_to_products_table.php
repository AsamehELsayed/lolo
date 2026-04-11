<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasColumn('products', 'category_id')) {
            Schema::table('products', function (Blueprint $blueprint) {
                $blueprint->unsignedBigInteger('category_id')->nullable()->after('id');
                $blueprint->foreign('category_id')->references('id')->on('categories')->onDelete('set null');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $blueprint) {
            $blueprint->dropForeign(['category_id']);
            $blueprint->dropColumn('category_id');
        });
    }
};
