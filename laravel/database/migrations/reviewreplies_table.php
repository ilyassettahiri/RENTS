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
        Schema::create('reviewreplies', function (Blueprint $table) {
            $table->id();


            $table->foreignId('review_id');
            $table->foreignId('user_id');
            $table->text('message')->nullable();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('picture')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reviewreplies');
    }
};
