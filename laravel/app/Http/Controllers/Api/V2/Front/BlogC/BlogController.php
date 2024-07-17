<?php

namespace App\Http\Controllers\Api\V2\Front\BlogC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Core\Document\Error;
use LaravelJsonApi\Core\Responses\ErrorResponse;
use LaravelJsonApi\Core\Responses\DataResponse;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use Illuminate\Support\Facades\Storage;
use App\Enums\ItemStatus;



use App\Models\Blog;
use App\Models\Article;
use App\Models\Blogcategory;

use App\Models\Blogtag;

use App\Models\Author;





use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class BlogController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $blog = Blog::find(1);

        // Fetch all blog categories and their articles
        $blogcategories = Blogcategory::with('articles')->get();

        // Get all articles for the blog
        $articles = $blog->articles()->with('author', 'blogtags')->get();

        // Map articles to their JSON:API structure
        $articlesData = $articles->map(function ($article) {
            return [
                'type' => 'articles',
                'id' => $article->id,
                'attributes' => [
                    'blog_id' => $article->blog_id,
                    'title' => $article->title,
                    'actor' => $article->actor,
                    'url' => $article->url,
                    'category' => $article->category,
                    'tag' => $article->blogtags->pluck('name'), // Assuming you have a name attribute in the Tag model
                    'thumb' => $article->thumb,
                    'content' => $article->content,
                    'created_at' => $article->created_at,
                    'updated_at' => $article->updated_at,
                    'author' => [
                        'name' => $article->author->name,
                        'bio' => $article->author->bio,
                        'picture' => $article->author->picture, // Assuming you have a profile_picture attribute in the Author model
                    ],
                ],
            ];
        });

        // Map blog categories to their JSON:API structure
        $blogcategoriesData = $blogcategories->map(function ($blogcategory) {
            return [
                'type' => 'blogcategories',
                'id' => $blogcategory->id,
                'attributes' => [
                    'name' => $blogcategory->name,
                    'thumb' => $blogcategory->thumb, // Assuming you have a thumb attribute
                    'article_count' => $blogcategory->articles->count(),
                ],
            ];
        });

        // Ensure JSON:API compliance
        return response()->json([
            'data' => [
                'articles' => $articlesData,
                'blogcategories' => $blogcategoriesData,
            ],
        ]);
    }


    public function store(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $request = app('request'); // Retrieve the current request

        // Validate the request
        $request->validate([
            'data.attributes.name' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.picture' => 'sometimes|image|max:2048', // Validate images if present
        ]);

        // Initialize an array to hold the image paths
        $picturerelativePath = null;

                // Handle image uploads
                if ($request->hasFile('data.attributes.picture')) {
                    $picturefile = $request->file('data.attributes.picture');
                    $picturePath = Storage::disk('public')->put('images', $picturefile);
                    $picturerelativePath = '/' . $picturePath; // Prepend '/' to make it a relative path
                }


        $name = $request->input('data.attributes.name');
        $description = $request->input('data.attributes.description');



        $collection = new Collection();
        $collection->description = $description;
        $collection->name = $name;

        $collection->picture = $picturerelativePath;

        $collection->user_id = $user->id;
        $collection->save();





        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'collections',
                'id' => $collection->id,
                'attributes' => [
                    'name' => $collection->name,
                    'picture' => $collection->picture,

                    'created_at' => $collection->created_at,

                ],
                'relationships' => [
                    'user' => [
                        'data' => [
                            'type' => 'users',
                            'id' => $user->id,
                        ],
                    ],
                ],
            ]
        ], 201); // 201 Created status code
    }






    public function update(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $request = app('request'); // Retrieve the current request

        // Validate the request
        $request->validate([
            'data.attributes.name' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.picture' => 'sometimes|image|max:2048', // Validate images if present
        ]);

        $collection = Collection::findOrFail($route->resourceId());

        // Handle image uploads
        if ($request->hasFile('data.attributes.picture')) {
            // Delete the old picture if exists
            if ($collection->picture) {
                Storage::disk('public')->delete(str_replace('/storage/', '', $collection->picture));
            }
            $pictureFile = $request->file('data.attributes.picture');
            $picturePath = Storage::disk('public')->put('images', $pictureFile);
            $collection->picture = '/' . $picturePath; // Prepend '/' to make it a relative path
        }

        $collection->name = $request->input('data.attributes.name');
        $collection->description = $request->input('data.attributes.description');
        $collection->save();

        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'collections',
                'id' => $collection->id,
                'attributes' => [
                    'name' => $collection->name,
                    'picture' => $collection->picture,
                    'created_at' => $collection->created_at,
                ],
                'relationships' => [
                    'user' => [
                        'data' => [
                            'type' => 'users',
                            'id' => $user->id,
                        ],
                    ],
                ],
            ]
        ], 200); // 200 OK status code
    }

    public function show(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $collection = Collection::where('user_id', $user->id)->findOrFail($route->resourceId());

        return response()->json([
            'data' => [
                'type' => 'collections',
                'id' => $collection->id,
                'attributes' => [
                    'name' => $collection->name,
                    'picture' => $collection->picture,
                    'description' => $collection->description,
                    'created_at' => $collection->created_at,
                ],
                'relationships' => [
                    'user' => [
                        'data' => [
                            'type' => 'users',
                            'id' => $user->id,
                        ],
                    ],
                ],
            ]
        ]);
    }



}
