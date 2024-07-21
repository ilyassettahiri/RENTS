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
        Schema::create('blogcategories', function (Blueprint $table) {
            $table->id();


            $table->string('thumb')->nullable();

            $table->string('name')->nullable();



            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogcategories');
    }
};




/* Tinker


$blogcategory1 = new App\Models\Blogcategory;
$blogcategory1->thumb = '/images/travel/post_01.jpg';
$blogcategory1->name = 'Marketing';
$blogcategory1->save();

$blogcategory2 = new App\Models\Blogcategory;
$blogcategory2->thumb = '/images/travel/post_02.jpg';
$blogcategory2->name = 'Community';
$blogcategory2->save();

$blogcategory3 = new App\Models\Blogcategory;
$blogcategory3->thumb = '/images/travel/post_03.jpg';
$blogcategory3->name = 'Tutorials';
$blogcategory3->save();

$blogcategory4 = new App\Models\Blogcategory;
$blogcategory4->thumb = '/images/travel/post_04.jpg';
$blogcategory4->name = 'Business';
$blogcategory4->save();

$blogcategory5 = new App\Models\Blogcategory;
$blogcategory5->thumb = '/images/travel/post_05.jpg';
$blogcategory5->name = 'Management';
$blogcategory5->save();



*/
