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
        Schema::create('ladders', function (Blueprint $table) {
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

            $table->string('tool_type')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('condition')->nullable();
            $table->string('power_source')->nullable();
            $table->string('material')->nullable();
            $table->string('height')->nullable();
            $table->string('weight')->nullable();
            $table->string('number_of_steps')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('load_capacity')->nullable();
            $table->string('instructions')->nullable();
            $table->string('battery_life')->nullable();
            $table->string('style')->nullable();
            $table->string('included_components')->nullable();
            $table->string('foldable')->nullable();
            $table->string('assembly_required')->nullable();
            $table->string('wheel_size')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ladders');
    }
};