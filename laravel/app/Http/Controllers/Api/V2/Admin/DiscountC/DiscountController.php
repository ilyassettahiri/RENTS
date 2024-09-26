<?php

namespace App\Http\Controllers\Api\V2\Admin\DiscountC;

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



use App\Models\Listing;
use App\Models\Collection;

use App\Models\Discount;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class DiscountController extends JsonApiController
{




    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $discounts = Discount::where('user_id', $user->id)->get();


        return response()->json([
            'data' => $discounts->map(function ($discount) use ($user) {
                return [
                    'type' => 'discounts',
                    'id' => $discount->id,
                    'attributes' => [
                        'id' => $discount->id,

                        'code' => $discount->code,
                        'percentage' => $discount->discountvalue,
                        'applies' => $discount->applies_to,
                        'type' => $discount->requirements,

                        'status' => $discount->status,



                        'created_at' => $discount->created_at,
                    ],
                    'relationships' => [
                        'user' => [
                            'data' => [
                                'type' => 'users',
                                'id' => $user->id,
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
            $validatedData = $request->validate([
                'data.attributes.code' => 'required|string',
                'data.attributes.discountvalue' => 'required|string',
                'data.attributes.applies_to' => 'nullable|string',
                'data.attributes.requirements' => 'nullable|string',
                'data.attributes.collections_id' => 'nullable|array',
                'data.attributes.collections_id.*' => 'integer|exists:collections,id',
                'data.attributes.listings_id' => 'nullable|array',
                'data.attributes.listings_id.*' => 'integer|exists:listings,id',
                'data.attributes.purchaseamount' => 'nullable|string',
            ]);

            // Create a new discount
            $discount = new Discount();
            $discount->code = $validatedData['data']['attributes']['code'];
            $discount->discountvalue = $validatedData['data']['attributes']['discountvalue'];
            $discount->applies_to = $validatedData['data']['attributes']['applies_to'];
            $discount->requirements = $validatedData['data']['attributes']['requirements'];
            $discount->purchaseamount = $validatedData['data']['attributes']['purchaseamount'];
            $discount->user_id = $user->id;
            $discount->status = 'active';

            $discount->save();

            // Attach collections and listings
            if (!empty($validatedData['data']['attributes']['collections_id'])) {
                $discount->collections()->attach($validatedData['data']['attributes']['collections_id']);
            }

            if (!empty($validatedData['data']['attributes']['listings_id'])) {
                $discount->listings()->attach($validatedData['data']['attributes']['listings_id']);
            }

            // Return a JSON:API compliant response
            return response()->json([
                'data' => [
                    'type' => 'discounts',
                    'id' => $discount->id,
                    'attributes' => [
                        'code' => $discount->code,
                        'discountvalue' => $discount->discountvalue,
                        'applies_to' => $discount->applies_to,
                        'requirements' => $discount->requirements,
                        'collections_id' => $discount->collections()->pluck('collections.id'),
                        'listings_id' => $discount->listings()->pluck('listings.id'),
                        'purchaseamount' => $discount->purchaseamount,
                        'created_at' => $discount->created_at,
                        'updated_at' => $discount->updated_at,
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

        $discount = Discount::findOrFail($route->resourceId());



        $discount->name = $request->input('data.attributes.name');
        $discount->description = $request->input('data.attributes.description');
        $discount->save();

        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'discounts',
                'id' => $discount->id,
                'attributes' => [
                    'name' => $discount->name,
                    'picture' => $discount->picture,
                    'created_at' => $discount->created_at,
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
        $discount = Discount::where('user_id', $user->id)->findOrFail($route->resourceId());

        $listings = $discount->listing()->get();
        $collections = $discount->collection()->get();


        return response()->json([
            'data' => [
                'type' => 'discount',
                'id' => $discount->id,
                'attributes' => [
                    'id' => $discount->id,

                    'code' => $discount->code,
                    'percentage' => $discount->discountvalue,
                    'applies' => $discount->applies_to,
                    'type' => $discount->requirements,

                    'status' => $discount->status,


                    'listings' => $listings->map(function ($listing) {

                        return [

                            'category' => $listing->category,
                            'url' => $listing->url,
                            'id' => $listing->id,
                            'title' => $listing->title,
                            'price' => $listing->price,
                            'status' => $listing->status,
                            'picture' => $listing->picture,
                            'user_id' => $listing->user_id,
                            'created_at' => $listing->created_at,
                            'updated_at' => $listing->updated_at,

                        ];

                    }),

                    'collections' => $collections->map(function ($listing) {

                        return [

                            'id' => $collection->id,

                            'name' => $collection->name,
                            'picture' => $collection->picture,
                            'description' => $collection->description,
                            'created_at' => $collection->created_at,



                        ];

                    }),

                    'created_at' => $discount->created_at,
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






    public function getDiscountData(JsonApiRoute $route, Store $store)
    {

        $user = Auth::user();

        $collections = Collection::where('user_id', $user->id)->get()->map(function ($collection) {
            return [
                'type' => 'collections',
                'id' => $collection->id,
                'attributes' => [
                    'name' => $collection->name,
                    'picture' => $collection->picture,
                    'description' => $collection->description,
                    'created_at' => $collection->created_at,
                    'updated_at' => $collection->updated_at,
                    'user_id' => $collection->user_id,
                ],
            ];
        });

        $listings = Listing::where('user_id', $user->id)->get()->map(function ($listing) {
            return [
                'type' => 'listings',
                'id' => $listing->id,
                'attributes' => [
                    'category' => $listing->category,
                    'picture' => $listing->picture,
                    'title' => $listing->title,
                    'price' => $listing->price,
                    'city' => $listing->city,
                    'zip' => $listing->zip,
                    'url' => $listing->url,
                    'status' => $listing->status,
                    'onlinestore_id' => $listing->onlinestore_id,
                    'created_at' => $listing->created_at,
                    'updated_at' => $listing->updated_at,
                    'user_id' => $listing->user_id,
                ],
            ];
        });

        return response()->json([
            'data' => [
                'collections' => $collections,
                'listings' => $listings,
            ]
        ]);

    }




    public function delete(JsonApiRoute $route, Store $store )
    {



        $request = app('request');


        $id = $route->resourceId();


            $listing = Discount::find($id);

            // Check if listing exists
            if ($listing) {
                $listing->delete(); // Delete the listing
                return response()->json(['message' => 'Listing deleted successfully'], 200);
            }

            // Return error if listing not found
            return response()->json(['message' => 'Listing not found'], 404);

    }


}
