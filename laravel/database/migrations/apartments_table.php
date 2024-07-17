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
        Schema::create('apartments', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();
            $table->string('garden_view')->nullable();
            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->foreignId('onlinestore_id');

            $table->string('picture')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();

            $table->string('phone')->nullable();

            $table->string('elevator')->nullable();
            $table->string('doorkeeper')->nullable();
            $table->string('security_system')->nullable();
            $table->string('equipped_kitchen')->nullable();
            $table->string('wifi')->nullable();
            $table->string('parking')->nullable();
            $table->string('tv')->nullable();
            $table->string('heating')->nullable();
            $table->string('balcony')->nullable();
            $table->string('air_conditioner')->nullable();
            $table->string('washing_machine')->nullable();
            $table->string('pool')->nullable();
            $table->string('rooms')->nullable();
            $table->string('living_rooms')->nullable();
            $table->string('surface')->nullable();
            $table->string('year_construction')->nullable();
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('terrace')->nullable();
            $table->string('housekeeping')->nullable();
            $table->string('dishwasher')->nullable();
            $table->string('refrigerator')->nullable();

            $table->string('service')->nullable();

            $table->string('facilities')->nullable();



            $table->string('more_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apartments');
    }
};
