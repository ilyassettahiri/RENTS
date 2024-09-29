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
            $table->decimal('price', 10, 2)->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();


            $table->string('phone', 15)->nullable();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
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
