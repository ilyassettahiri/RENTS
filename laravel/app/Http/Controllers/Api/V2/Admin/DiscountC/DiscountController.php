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




}