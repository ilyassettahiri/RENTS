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
        Schema::create('lightings', function (Blueprint $table) {
            $table->id();




            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('zip')->nullable();
            $table->string('country')->nullable();

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();

            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('included_accessories')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('weight')->nullable();
            $table->string('condition')->nullable();
            $table->string('self_timer')->nullable();
            $table->string('led_light')->nullable();
            $table->string('color_temperature')->nullable();
            $table->string('lighting_scenes')->nullable();
            $table->string('compatibility')->nullable();

            $table->string('more_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lightings');
    }
};