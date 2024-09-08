<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('article_tag', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_id')->constrained()->cascadeOnDelete();
            $table->foreignId('blogtag_id');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_tag');
    }
};



/*


DB::table('article_tag')->insert([
    ['article_id' => 1, 'blogtag_id' => 1],
    ['article_id' => 2, 'blogtag_id' => 2],
    ['article_id' => 3, 'blogtag_id' => 3],
    ['article_id' => 4, 'blogtag_id' => 1],
    ['article_id' => 5, 'blogtag_id' => 2],
    ['article_id' => 6, 'blogtag_id' => 3],
    ['article_id' => 7, 'blogtag_id' => 1],
    ['article_id' => 8, 'blogtag_id' => 2],
    ['article_id' => 9, 'blogtag_id' => 3],
    ['article_id' => 10, 'blogtag_id' => 1],
]);


*/
