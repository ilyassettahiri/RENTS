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
        Schema::create('authors', function (Blueprint $table) {
            $table->id();

            $table->string('name')->nullable();

            $table->string('picture')->nullable();


            $table->text('bio')->nullable();


            $table->timestamps();
        });



    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};



/* Tinker
$author = new App\Models\Author;
$author->name = 'Ilyass';
$author->picture = '/images/admin.jpg';
$author->bio = 'The CUBE Elly Cruise is a stylish and comfortable electric bike designed for effortless cruising around the city or along scenic routes.';
$author->save();
*/
