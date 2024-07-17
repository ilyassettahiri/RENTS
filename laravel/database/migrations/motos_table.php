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
        Schema::create('motos', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->string('price')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip')->nullable();
            $table->string('country')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('phone')->nullable();

            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('url')->nullable();
            $table->foreignId('user_id');
            $table->string('picture')->nullable();

            $table->string('brand_name')->nullable();
            $table->string('model')->nullable();
            $table->string('year')->nullable();
            $table->string('weight')->nullable();
            $table->string('condition')->nullable();
            $table->string('insurance')->nullable();
            $table->string('gearbox')->nullable();
            $table->string('autonomy')->nullable();
            $table->string('handguards')->nullable();
            $table->string('intercom')->nullable();
            $table->string('passenger_helmet')->nullable();
            $table->string('clothing')->nullable();
            $table->string('more_details')->nullable();

            $table->string('power')->nullable();

            $table->string('speed')->nullable();

            $table->string('toolkit')->nullable();




            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('motos');
    }
};
