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
        Schema::create('abouts', function (Blueprint $table) {
            $table->id();


            $table->string('large_picture')->nullable();
            $table->string('profile_picture')->nullable();
            $table->string('title')->nullable();
            $table->text('content')->nullable();
            $table->integer('job')->nullable();
            $table->integer('successful_hiring')->nullable();
            $table->integer('partner')->nullable();
            $table->integer('employee')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('abouts');
    }
};
