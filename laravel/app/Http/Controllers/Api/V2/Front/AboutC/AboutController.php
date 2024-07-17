<?php

namespace App\Http\Controllers\Api\V2\Front\AboutC;

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



use App\Models\Author;
use App\Models\About;
use App\Models\Article;

use App\Models\Ourclient;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class AboutController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {


        $about = About::find(1);


        $ourclients = Ourclient::all();


        // Fetch 5 recent articles with their authors and tags
        $recentarticles = Article::orderBy('created_at', 'desc')->take(5)->with('author', 'blogtags')->get();



        // Format recent articles data
        $recentarticlesData = $recentarticles->map(function ($recentarticle) {
            return [
                'type' => 'articles',
                'id' => $recentarticle->id,
                'attributes' => [
                    'blog_id' => $recentarticle->blog_id,
                    'title' => $recentarticle->title,
                    'actor' => $recentarticle->actor,
                    'category' => $recentarticle->category,
                    'tag' => $recentarticle->blogtags->pluck('name'), // Assuming you have a name attribute in the Tag model
                    'thumb' => $recentarticle->thumb,
                    'content' => $recentarticle->content,
                    'created_at' => $recentarticle->created_at,
                    'updated_at' => $recentarticle->updated_at,
                    'blogcategory_id' => $recentarticle->blogcategory_id,
                    'url' => $recentarticle->url,
                    'author' => [
                        'name' => $recentarticle->author->name,
                        'bio' => $recentarticle->author->bio,
                        'picture' => $recentarticle->author->picture, // Assuming you have a profile_picture attribute in the Author model
                    ],
                ],
            ];
        });




            // Format our clients data
            $ourclientData = $ourclients->map(function ($ourclient) {
                return [
                    'type' => 'ourclient',
                    'id' => $ourclient->id,
                    'attributes' => [
                        'name' => $ourclient->name,
                        'picture' => $ourclient->picture,
                    ],
                ];
            });



            // Format about data
            $aboutData = [
                'type' => 'about',
                'id' => $about->id,
                'attributes' => [
                    'large_picture' => $about->large_picture,
                    'profile_picture' => $about->profile_picture,
                    'title' => $about->title,
                    'content' => $about->content,
                    'job' => $about->job,
                    'successful_hiring' => $about->successful_hiring,
                    'partner' => $about->partner,
                    'employee' => $about->employee,
                ],
            ];


            // Ensure JSON:API compliance
            return response()->json([
                'data' => [
                    'recentarticles' => $recentarticlesData,
                    'ourclients' => $ourclientData,
                    'about' => $aboutData,

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
