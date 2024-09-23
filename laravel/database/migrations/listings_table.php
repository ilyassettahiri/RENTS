<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('listings', function (Blueprint $table) {
            $table->id();


            $table->foreignId('user_id')->constrained()->cascadeOnDelete();

            $table->string('category')->nullable();
            $table->string('picture')->nullable();
            $table->string('title')->nullable();
            $table->decimal('price', 10, 2)->nullable();

            $table->string('city')->nullable();
            $table->string('typea')->nullable();

            $table->string('zip', 10)->nullable();

            $table->string('phone', 15)->nullable();

            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled', 'completed'])->default('pending');
            $table->boolean('featured')->default(false);

            $table->string('url');

            $table->foreignId('onlinestore_id');
            $table->foreignId('discount_id');
            $table->foreignId('collection_id');







            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('listings');
    }
};
