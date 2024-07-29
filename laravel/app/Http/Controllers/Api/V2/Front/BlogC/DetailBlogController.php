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

use App\Models\Blogcategory;
use App\Models\Blogtag;
use App\Models\Author;

use App\Models\Policypage;


use App\Models\Generaleinfo;

use App\Models\Listing;
use App\Models\Collection;

use App\Models\About;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class DetailBlogController extends JsonApiController
{






    public function index(JsonApiRoute $route, Store $store)
    {



        $authors = Author::all();
        $tags = Blogtag::all();
        $blogCategories = Blogcategory::all();

        return response()->json([
            'data' => [
                'authors' => $authors->map(function ($author) {
                    return [
                        'type' => 'authors',
                        'id' => $author->id,
                        'attributes' => [

                            'id' => $author->id,

                            'name' => $author->name,
                            'picture' => $author->picture,
                            'bio' => $author->bio,
                            'created_at' => $author->created_at,
                        ],
                    ];
                }),
                'tags' => $tags->map(function ($tag) {
                    return [
                        'type' => 'tags',
                        'id' => $tag->id,
                        'attributes' => [
                            'id' => $tag->id,

                            'name' => $tag->name,
                            'created_at' => $tag->created_at,
                        ],
                    ];
                }),
                'blogCategories' => $blogCategories->map(function ($category) {
                    return [
                        'type' => 'blogCategories',
                        'id' => $category->id,
                        'attributes' => [
                            'id' => $category->id,

                            'name' => $category->name,
                            'thumb' => $category->thumb,
                            'created_at' => $category->created_at,
                        ],
                    ];
                }),
            ],
        ]);


    }



    public function createBlogCategory(Request $request)
    {




            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'thumb' => 'image|max:6048', // Validate image if present
            ]);






            $imagePaths ;



            // Handle multiple image uploads
            if ($request->hasFile('thumb')) {
                $file = $request->file('thumb');


                    $filePath = Storage::disk('public')->put('images', $file);
                    $relativePath = '/' . $filePath; // Prepend '/' to make it a relative path
                    $imagePaths = $relativePath;



            }

            $blogCategory = new Blogcategory();

            $blogCategory->name = $validatedData['name'];
            $blogCategory->thumb = $imagePaths;

            $blogCategory->save();

        return response()->json(['data' => $blogCategory], 201);
    }





    public function createBlogTag(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        // Create a new blog tag
        $blogTag = new Blogtag();
        $blogTag->name = $validatedData['name'];
        $blogTag->save();

        return response()->json(['data' => $blogTag], 201);
    }





    public function createBlogAuthor(Request $request)
    {


        Log::info('Request Data:', $request->all());


        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'thumb' => 'image|max:6048', // Validate image if present
        ]);






        $imagePaths ;



        // Handle multiple image uploads
        if ($request->hasFile('thumb')) {
            $file = $request->file('thumb');


                $filePath = Storage::disk('public')->put('images', $file);
                $relativePath = '/' . $filePath; // Prepend '/' to make it a relative path
                $imagePaths = $relativePath;



        }

        $blogCategory = new Author();

        $blogCategory->name = $validatedData['name'];
        $blogCategory->picture = $imagePaths;

        $blogCategory->save();

        return response()->json(['data' => $blogCategory], 201);




    }




    public function createPolicyPage(Request $request)
    {




        $validatedData = $request->validate([
            'privacy' => 'required|string',
            'termcondition' => 'required|string',


        ]);






        $blogCategory = new Policypage();

        $blogCategory->privacy = $validatedData['privacy'];
        $blogCategory->termcondition = $validatedData['termcondition'];

        $blogCategory->save();

        return response()->json(['data' => $blogCategory], 201);




    }






    public function createGeneraleInfo(Request $request)
    {



            // Validate the request
            $validated = $request->validate([
                'name' => 'string|nullable',
                'address' => 'string|nullable',
                'city' => 'string|nullable',
                'state' => 'string|nullable',
                'country' => 'string|nullable',
                'zip' => 'string|nullable',
                'phone' => 'string|nullable',
                'email' => 'string|nullable|email',
                'website' => 'string|nullable|url',
                'facebook' => 'string|nullable|url',
                'twitter' => 'string|nullable|url',
                'instagram' => 'string|nullable|url',
                'linkedin' => 'string|nullable|url',
                'pinterest' => 'string|nullable|url',
                'telegram' => 'string|nullable|url',
                'tiktok' => 'string|nullable|url',
                'youtube' => 'string|nullable|url',
                'picture1' => 'string|nullable',
                'picture2' => 'string|nullable',
                'picture3' => 'string|nullable',
                'picture4' => 'string|nullable',
                'description' => 'string|nullable|min:100',
            ]);

            // Create the generale info
            $generaleInfo = GeneraleInfo::create($validated);

            return response()->json([
                'data' => [
                    'type' => 'generaleinfos',
                    'id' => $generaleInfo->id,
                    'attributes' => $generaleInfo->toArray(),
                ]
            ]);




    }


    public function createAbout(Request $request)
    {

            // Validate the request
            $validated = $request->validate([
                'large_picture' => 'string|nullable',
                'profile_picture' => 'string|nullable',
                'title' => 'string|nullable',
                'content' => 'string|nullable|min:100',
                'job' => 'integer|nullable',
                'successful_hiring' => 'integer|nullable',
                'partner' => 'integer|nullable',
                'employee' => 'integer|nullable',
            ]);

            // Create the about
            $about = About::create($validated);

            return response()->json([
                'data' => [
                    'type' => 'abouts',
                    'id' => $about->id,
                    'attributes' => $about->toArray(),
                ]
            ]);


    }

}
