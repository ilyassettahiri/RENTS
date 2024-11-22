<?php

namespace App\Http\Controllers\Api\V2\Front\CompletedFrontC;

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



use App\Models\Onlinestore;
use App\Models\Collection;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class CompletedFrontController extends JsonApiController
{



    public function index(JsonApiRoute $route, Store $store)
    {
        $stores = Onlinestore::all();

        return response()->json([
            'data' => $stores->map(function ($store) {
                return [
                    'type' => 'stores',
                    'id' => $store->id,
                    'attributes' => [
                        'name' => $store->name,
                        'email' => $store->email,
                        'status' => $store->status,
                        'admin_status' => $store->admin_status,
                        'url' => $store->url,
                        'id' => $store->id,
                        'phone' => $store->phone,
                        'zip' => $store->zip,
                        'country' => $store->country,
                        'address' => $store->address,
                        'city' => $store->city,
                        'verified' => $store->verified,
                        'type' => $store->type,
                        'typea' => $store->typea,
                        'description' => $store->description,
                        'profile_picture' => $store->profile_picture,
                        'picture' => $store->picture,
                        'featured' => $store->featured,
                        'user_id' => $store->user_id,
                        'created_at' => $store->created_at,
                        'updated_at' => $store->updated_at,
                    ],
                    'relationships' => [
                        'user' => [
                            'data' => [
                                'type' => 'users',
                                'id' => $store->user_id,
                            ],
                        ],
                    ],
                ];
            }),
        ]);
    }




    public function show(JsonApiRoute $route, Store $store)
    {


         $storeId = $route->resourceId();



        // Find the user by ID
        $store = Onlinestore::find($storeId);


        if (!$store) {
            return response()->json(['error' => 'store not found'], 404);
        }







        return response()->json([
            'data' => [
                'id' => $store->id,
                'type' => 'store',
                'attributes' => [
                        'name' => $store->name,
                        'email' => $store->email,
                        'status' => $store->status,
                        'admin_status' => $store->admin_status,
                        'url' => $store->url,
                        'id' => $store->id,
                        'phone' => $store->phone,
                        'zip' => $store->zip,
                        'country' => $store->country,
                        'address' => $store->address,
                        'city' => $store->city,
                        'verified' => $store->verified,
                        'type' => $store->type,
                        'typea' => $store->typea,
                        'description' => $store->description,
                        'profile_picture' => $store->profile_picture,
                        'picture' => $store->picture,
                        'featured' => $store->featured,
                        'user_id' => $store->user_id,
                        'created_at' => $store->created_at,
                        'updated_at' => $store->updated_at,
                    ],

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




}
