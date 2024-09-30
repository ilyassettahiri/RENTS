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
        Schema::create('photographies', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('vat_id')->nullable();
            $table->foreignId('collection_id')->nullable();
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

            $table->string('size')->nullable();
            $table->string('max_shutter_speed')->nullable();
            $table->string('battery')->nullable();
            $table->string('panorama_capture')->nullable();
            $table->string('burst_shooting')->nullable();
            $table->string('wifi_connectivity')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('camera')->nullable();
            $table->string('flashes')->nullable();
            $table->string('tripod')->nullable();
            $table->string('resolution')->nullable();
            $table->string('sensor')->nullable();
            $table->string('angle')->nullable();
            $table->string('lcd')->nullable();
            $table->string('memory_card')->nullable();
            $table->string('softbox')->nullable();
            $table->string('backdrop')->nullable();
            $table->string('bag')->nullable();
            $table->string('lenses')->nullable();

            $table->string('other_equipment')->nullable();


            $table->string('more_details')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photographies');
    }
};
