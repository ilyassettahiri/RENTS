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
        Schema::create('billiards', function (Blueprint $table) {
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

            $table->string('phone')->nullable();



            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->foreignId('onlinestore_id');

            $table->string('picture')->nullable();

            $table->string('table_brand')->nullable();
            $table->string('year_model')->nullable();
            $table->string('table_dimensions')->nullable();
            $table->string('table_weight')->nullable();
            $table->string('table_type')->nullable();
            $table->string('condition')->nullable();
            $table->string('table_cover')->nullable();
            $table->string('balls_design')->nullable();
            $table->string('bridge_stick')->nullable();
            $table->string('scoreboards')->nullable();
            $table->string('chalk')->nullable();
            $table->string('holder')->nullable();

            $table->string('more_details')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billiards');
    }
};
