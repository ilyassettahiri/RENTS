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
        Schema::create('onlinestores', function (Blueprint $table) {
            $table->id();


            $table->string('url');
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('profile_picture')->nullable();
            $table->string('name')->nullable();



            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->boolean('verified')->default(false)->nullable();

            $table->string('type')->nullable();
            $table->string('phone', 15)->nullable();
            $table->string('email')->nullable();

            $table->string('typea')->nullable();


            $table->string('zip', 10)->nullable();
            $table->string('country')->default('Morocco')->nullable();


            $table->text('description')->nullable();

            $table->string('picture')->nullable();


            $table->enum('status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed'])->default('pending');
            $table->enum('admin_status', ['checking out','boosted','refunded','active', 'inactive', 'pending', 'draft', 'archived', 'deleted', 'canceled','paid', 'completed', 'accepted', 'rejected'])->default('pending');            $table->boolean('featured')->default(false);


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('onlinestores');
    }
};
