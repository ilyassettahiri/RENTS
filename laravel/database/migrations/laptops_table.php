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
        Schema::create('laptops', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();


            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('ram')->nullable();
            $table->string('graphics_card')->nullable();
            $table->string('operating_system')->nullable();
            $table->string('number_ports')->nullable();
            $table->string('battery_life')->nullable();
            $table->string('drive_storage')->nullable();
            $table->string('resolution')->nullable();
            $table->string('weight')->nullable();
            $table->string('screen_size',50)->nullable();
            $table->string('touch_screen')->nullable();
            $table->string('cpu')->nullable();
            $table->string('condition')->nullable();
            $table->string('sound')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('laptops');
    }
};
