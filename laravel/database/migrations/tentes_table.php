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
        Schema::create('tentes', function (Blueprint $table) {
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


            $table->string('fabric_type')->nullable();
            $table->string('curtains')->nullable();
            $table->string('brand_name')->nullable();
            $table->string('size')->nullable();
            $table->string('shape')->nullable();
            $table->string('material')->nullable();
            $table->string('weight')->nullable();
            $table->string('style')->nullable();
            $table->string('tent')->nullable();
            $table->string('stand')->nullable();
            $table->string('chair')->nullable();
            $table->string('table')->nullable();
            $table->string('cushions')->nullable();
            $table->string('rug')->nullable();

            $table->string('otherEquipment')->nullable();


            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tentes');
    }
};
