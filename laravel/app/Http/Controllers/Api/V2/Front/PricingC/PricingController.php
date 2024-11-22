<?php

namespace App\Http\Controllers\Api\V2\Front\PricingC;

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



use App\Models\Review;
use App\Models\Collection;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class PricingController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $reviews = Review::all();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $reviews->map(function ($review) {
                return [
                    'type' => 'reviews',
                    'id' => $review->id,
                    'attributes' => [
                        'name' => $review->name,
                        'email' => $review->email,
                        'description' => $review->description,
                        'like' => $review->like,
                        'rating' => $review->rating,
                        'category' => $review->category,
                        'listings_thumb' => $review->listings_thumb,
                        'listings_title' => $review->listings_title,

                        'url' => $review->url,
                        'id' => $review->id,

                        'status' => $review->status,
                        'admin_status' => $review->admin_status,
                        'user_id' => $review->user_id,
                        'onlinestore_id' => $review->onlinestore_id,
                        'created_at' => $review->created_at,
                        'updated_at' => $review->updated_at,
                    ],
                    'relationships' => [
                        'user' => [
                            'data' => [
                                'type' => 'users',
                                'id' => $review->user_id,
                            ],
                        ],
                    ],
                ];
            }),
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

        $reviewId = $route->resourceId();



        // Find the user by ID
        $review = Review::find($reviewId);


        return response()->json([
            'data' => [
                'id' => $review->id,
                'type' => 'review',
                'attributes' => [
                    'name' => $review->name,
                    'email' => $review->email,
                    'description' => $review->description,
                    'like' => $review->like,
                    'rating' => $review->rating,
                    'category' => $review->category,
                    'listings_thumb' => $review->listings_thumb,
                    'listings_title' => $review->listings_title,

                    'url' => $review->url,
                    'id' => $review->id,

                    'status' => $review->status,
                    'admin_status' => $review->admin_status,
                    'user_id' => $review->user_id,
                    'onlinestore_id' => $review->onlinestore_id,
                    'created_at' => $review->created_at,
                    'updated_at' => $review->updated_at,
                ],

            ],

        ]);

    }



}
