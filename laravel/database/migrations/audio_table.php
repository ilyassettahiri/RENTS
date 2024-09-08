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
        Schema::create('audio', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();


            $table->string('sound_quality')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('model_name')->nullable();
            $table->string('audio_type')->nullable();
            $table->string('noise_cancellation')->nullable();
            $table->string('connectivity')->nullable();
            $table->string('max_wireless_range')->nullable();
            $table->string('battery_life')->nullable();
            $table->string('charging_time')->nullable();
            $table->string('condition')->nullable();
            $table->string('dimensions')->nullable();
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
        Schema::dropIfExists('audio');
    }
};
