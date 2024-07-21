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
        Schema::create('articles', function (Blueprint $table) {
            $table->id();

            $table->foreignId('blog_id');


            $table->foreignId('blogcategory_id');

            $table->foreignId('author_id');


            $table->string('title')->nullable();




            $table->string('thumb')->nullable();
            $table->string('url')->nullable();




            $table->text('content')->nullable();


            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};


/*


$article1 = new App\Models\Article;
$article1->blog_id = 1;  // Assuming blog with ID 1 exists
$article1->blogcategory_id = 1;  // Assuming blog category with ID 1 exists
$article1->author_id = 1;  // Assuming author with ID 1 exists
$article1->title = 'The Impact of Social Media on Society';
$article1->thumb = '/images/travel/travel_1.jpg';
$article1->url = 'article1';
$article1->content = 'This is random content for article 1.';
$article1->save();

$article2 = new App\Models\Article;
$article2->blog_id = 1;  // Assuming blog with ID 2 exists
$article2->blogcategory_id = 2;  // Assuming blog category with ID 2 exists
$article2->author_id = 1;  // Assuming author with ID 2 exists
$article2->title = 'The Ultimate Guide to Productivity Hacks';
$article2->thumb = '/images/travel/travel_2.jpg';
$article2->url = 'article2';
$article2->content = 'This is random content for article 2.';
$article2->save();

$article3 = new App\Models\Article;
$article3->blog_id = 1;  // Assuming blog with ID 3 exists
$article3->blogcategory_id = 3;  // Assuming blog category with ID 3 exists
$article3->author_id = 1;  // Assuming author with ID 3 exists
$article3->title = 'Exploring the Hidden Gems of [Destination]';
$article3->thumb = '/images/travel/travel_3.jpg';
$article3->url = 'article3';
$article3->content = 'This is random content for article 3.';
$article3->save();

$article4 = new App\Models\Article;
$article4->blog_id = 1;  // Assuming blog with ID 4 exists
$article4->blogcategory_id = 4;  // Assuming blog category with ID 4 exists
$article4->author_id = 1;  // Assuming author with ID 4 exists
$article4->title = 'How to Master the Art of Public Speaking';
$article4->thumb = '/images/travel/travel_4.jpg';
$article4->url = 'article4';
$article4->content = 'This is random content for article 4.';
$article4->save();

$article5 = new App\Models\Article;
$article5->blog_id = 1;  // Assuming blog with ID 5 exists
$article5->blogcategory_id = 5;  // Assuming blog category with ID 5 exists
$article5->author_id = 1;  // Assuming author with ID 5 exists
$article5->title = 'The Future of Artificial Intelligence: Trends and Insights';
$article5->thumb = '/images/travel/travel_5.jpg';
$article5->url = 'article5';
$article5->content = 'This is random content for article 5.';
$article5->save();

$article6 = new App\Models\Article;
$article6->blog_id = 1;  // Assuming blog with ID 6 exists
$article6->blogcategory_id = 1;  // Assuming blog category with ID 6 exists
$article6->author_id = 1;  // Assuming author with ID 6 exists
$article6->title = 'Delicious Recipes for a Vegan Diet';
$article6->thumb = '/images/travel/travel_6.jpg';
$article6->url = 'article6';
$article6->content = 'This is random content for article 6.';
$article6->save();

$article7 = new App\Models\Article;
$article7->blog_id = 1;  // Assuming blog with ID 7 exists
$article7->blogcategory_id = 2;  // Assuming blog category with ID 7 exists
$article7->author_id = 1;  // Assuming author with ID 7 exists
$article7->title = 'A Beginner's Guide to Investing in Stocks';
$article7->thumb = '/images/travel/travel_7.jpg';
$article7->url = 'article7';
$article7->content = 'This is random content for article 7.';
$article7->save();

$article8 = new App\Models\Article;
$article8->blog_id = 1;  // Assuming blog with ID 8 exists
$article8->blogcategory_id = 3;  // Assuming blog category with ID 8 exists
$article8->author_id = 1;  // Assuming author with ID 8 exists
$article8->title = 'The Impact of Social Media on Society';
$article8->thumb = '/images/travel/travel_8.jpg';
$article8->url = 'article8';
$article8->content = 'This is random content for article 8.';
$article8->save();

$article9 = new App\Models\Article;
$article9->blog_id = 1;  // Assuming blog with ID 9 exists
$article9->blogcategory_id = 4;  // Assuming blog category with ID 9 exists
$article9->author_id = 1;  // Assuming author with ID 9 exists
$article9->title = 'The Importance of Mental Health Awareness 2';
$article9->thumb = '/images/travel/travel_9.jpg';
$article9->url = 'article9';
$article9->content = 'This is random content for article 9.';
$article9->save();

$article10 = new App\Models\Article;
$article10->blog_id = 1;  // Assuming blog with ID 10 exists
$article10->blogcategory_id = 5;  // Assuming blog category with ID 10 exists
$article10->author_id = 1;  // Assuming author with ID 10 exists
$article10->title = 'The Benefits of Mindfulness Meditation 2';
$article10->thumb = '/images/travel/travel_10.jpg';
$article10->url = 'post-content-10';
$article10->content = 'This is random content for article 10.';
$article10->save();



*/
