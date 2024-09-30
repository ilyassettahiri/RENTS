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
        Schema::create('maisons', function (Blueprint $table) {
            $table->id();




            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();


            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('vat_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('phone', 15)->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('garage')->nullable();
            $table->string('security_system')->nullable();
            $table->string('equipped_kitchen')->nullable();
            $table->string('wifi')->nullable();
            $table->string('tv')->nullable();
            $table->string('heating')->nullable();
            $table->string('balcony')->nullable();
            $table->string('air_conditioner')->nullable();
            $table->string('washing_machine')->nullable();
            $table->string('pool')->nullable();
            $table->string('rooms')->nullable();
            $table->string('living_rooms')->nullable();
            $table->string('surface')->nullable();
            $table->string('floors')->nullable();
            $table->string('year_of_construction')->nullable();
            $table->string('bedrooms')->nullable();
            $table->string('bathrooms')->nullable();
            $table->string('terrace')->nullable();
            $table->string('housekeeping')->nullable();
            $table->string('dishwasher')->nullable();
            $table->string('refrigerator')->nullable();
            $table->string('microwave')->nullable();
            $table->string('ground_floor')->nullable();
            $table->string('hammam')->nullable();
            $table->string('garden')->nullable();
            $table->string('more_details')->nullable();

            $table->string('amenities')->nullable();

            $table->string('facilities')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maisons');
    }
};
