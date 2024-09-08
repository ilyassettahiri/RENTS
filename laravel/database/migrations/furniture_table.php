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
        Schema::create('furniture', function (Blueprint $table) {
            $table->id();



            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->foreignId('onlinestore_id');

            $table->string('zip', 10)->nullable();
            $table->string('country')->nullable();

            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();


            $table->string('brand_name')->nullable();
            $table->string('furniture_type')->nullable();
            $table->string('dimensions')->nullable();
            $table->string('material')->nullable();
            $table->string('weight')->nullable();
            $table->string('assembly_required')->nullable();
            $table->string('shape')->nullable();
            $table->string('cushion_thickness')->nullable();
            $table->string('capacity')->nullable();
            $table->string('fill_material')->nullable();
            $table->string('removable_cushions')->nullable();
            $table->string('condition')->nullable();
            $table->string('model_year')->nullable();
            $table->string('color')->nullable();
            $table->string('style')->nullable();

            $table->string('more_details')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('furniture');
    }
};
