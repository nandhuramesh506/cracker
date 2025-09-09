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
        Schema::create('price_list', function (Blueprint $table) {
            $table->id();
            $table->integer('category_id'); // Foreign key to the categories table
            $table->string('category_name');
            $table->string('cracker_name');
            $table->string('cracker_img');
            $table->integer('cracker_oldPrice'); // Price with two decimal places
            $table->integer('cracker_newPrice'); // Price with two decimal places
            $table->string('cracker_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('price_list');
    }
};
