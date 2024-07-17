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
        Schema::create('divings', function (Blueprint $table) {
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

            $table->string('brand_name')->nullable();
            $table->string('material')->nullable();
            $table->string('hoods')->nullable();
            $table->string('socks_boots')->nullable();
            $table->string('wetsuits')->nullable();
            $table->string('gloves')->nullable();
            $table->string('rash_guards')->nullable();
            $table->string('bags')->nullable();
            $table->string('shorties')->nullable();
            $table->string('masks')->nullable();
            $table->string('vests')->nullable();
            $table->string('dive_lights')->nullable();
            $table->string('diving_fins')->nullable();
            $table->string('diving_snorkels')->nullable();
            $table->string('diving_regulators')->nullable();

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
        Schema::dropIfExists('divings');
    }
};
