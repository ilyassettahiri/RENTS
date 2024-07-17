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
        Schema::create('huntings', function (Blueprint $table) {
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

            $table->string('bow_arrow')->nullable();
            $table->string('crossbow')->nullable();
            $table->string('decoy')->nullable();
            $table->string('game_call')->nullable();
            $table->string('binoculars')->nullable();
            $table->string('scopes')->nullable();
            $table->string('clothing')->nullable();
            $table->string('rifle')->nullable();
            $table->string('shotgun')->nullable();
            $table->string('treestrands')->nullable();
            $table->string('gun_ammunitions')->nullable();
            $table->string('hearing_protection')->nullable();

            $table->string('equipment')->nullable();


            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('huntings');
    }
};
