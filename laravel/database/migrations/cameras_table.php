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
        Schema::create('cameras', function (Blueprint $table) {
            $table->id();




            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();



            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();


            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();


            $table->string('photo_size')->nullable();
            $table->string('sensor_size')->nullable();
            $table->string('image_stabilization')->nullable();
            $table->string('shutter_speed')->nullable();
            $table->string('exposure_control')->nullable();
            $table->string('image_resolution')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('condition')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('battery_life')->nullable();
            $table->string('memory')->nullable();
            $table->string('lens')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cameras');
    }
};
