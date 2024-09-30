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
        Schema::create('favoritestores', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('seller_id');
            $table->string('category')->nullable();
            $table->string('picture')->nullable();
            $table->string('title')->nullable();

            $table->string('name')->nullable();

            $table->string('address')->nullable();
            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->string('profile_picture')->nullable();



            $table->string('listing_old')->nullable();
            $table->string('city')->nullable();


            $table->string('url');
            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed'])->default('pending');


            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('landingpage_id')->nullable();




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favoritestores');
    }
};
