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
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();


            $table->string('address')->nullable();
            $table->string('city')->nullable();

            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();


            $table->string('phone', 15)->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('collection_id')->nullable();
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
