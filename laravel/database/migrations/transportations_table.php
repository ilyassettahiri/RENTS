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
        Schema::create('transportations', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('phone')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();


            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('year')->nullable();
            $table->string('type')->nullable();
            $table->string('passengers')->nullable();
            $table->string('luggage')->nullable();
            $table->string('condition')->nullable();
            $table->string('duration')->nullable();
            $table->string('ac')->nullable();
            $table->string('aux')->nullable();
            $table->string('bluetooth')->nullable();
            $table->string('usb')->nullable();
            $table->string('tv')->nullable();
            $table->string('alcohol_friendly')->nullable();
            $table->string('food_allowed')->nullable();
            $table->string('wheelchair_accessible')->nullable();
            $table->string('gearbox')->nullable();
            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transportations');
    }
};
