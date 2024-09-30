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
        Schema::create('surves', function (Blueprint $table) {
            $table->id();


            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2)->nullable();
            $table->date('startdate')->nullable();
            $table->date('enddate')->nullable();

            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('typea')->nullable();
            $table->string('currency')->default('DH')->nullable();



            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);


            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();

            $table->foreignId('onlinestore_id')->nullable();
            $table->foreignId('discount_id')->nullable();
            $table->foreignId('shipping_id')->nullable();
            $table->foreignId('vat_id')->nullable();
            $table->foreignId('collection_id')->nullable();
            $table->string('phone', 15)->nullable();

            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('picture')->nullable();

            $table->string('surf_category')->nullable();
            $table->string('surf_board_kite')->nullable();
            $table->string('board_types')->nullable();
            $table->string('board_size')->nullable();
            $table->string('wetsuits')->nullable();
            $table->string('paddleboarding')->nullable();
            $table->string('more_details')->nullable();

            $table->string('surf_other')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surves');
    }
};
