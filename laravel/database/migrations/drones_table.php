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
        Schema::create('drones', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id');
            $table->string('typea')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();


            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('flight_time')->nullable();
            $table->string('weight')->nullable();
            $table->string('battery_life')->nullable();
            $table->string('condition')->nullable();
            $table->string('video_resolution')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('battery_capacity')->nullable();
            $table->string('memory')->nullable();
            $table->string('image_resolution')->nullable();
            $table->string('included_components')->nullable();
            $table->string('remote_control')->nullable();
            $table->string('max_distance')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('drones');
    }
};
