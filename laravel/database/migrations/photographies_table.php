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
