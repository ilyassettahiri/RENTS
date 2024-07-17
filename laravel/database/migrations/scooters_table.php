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
        Schema::create('scooters', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();

            $table->string('phone')->nullable();
            $table->foreignId('onlinestore_id');

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();

            $table->string('model')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('battery_capacity')->nullable();
            $table->string('maximum_speed')->nullable();
            $table->string('weight_capacity')->nullable();
            $table->string('foldable')->nullable();
            $table->string('charging_time')->nullable();
            $table->string('condition')->nullable();
            $table->string('weight')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('max_reach')->nullable();

            $table->string('more_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scooters');
    }
};
