<?php

namespace App\Http\Controllers\Api\V2\Front\DashboardFrontC;

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

use Carbon\Carbon;


use App\Models\Reservation;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class DashboardFrontController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $reservations = Reservation::all();

        return response()->json([
            'data' => $reservations->map(function ($reservation) {
                return [
                    'type' => 'reservations',
                    'id' => $reservation->id,
                    'attributes' => [
                        'name' => $reservation->name,
                        'email' => $reservation->email,
                        'status' => $reservation->status,
                        'admin_status' => $reservation->admin_status,
                        'reservationstart' => $reservation->reservationstart ? Carbon::parse($reservation->reservationstart)->toIso8601String() : null,
                        'reservationsend' => $reservation->reservationsend ? Carbon::parse($reservation->reservationsend)->toIso8601String() : null,
                        'checkout_id' => $reservation->checkout_id,
                        'category' => $reservation->category,
                        'listings_thumb' => $reservation->listings_thumb,
                        'listings_title' => $reservation->listings_title,
                        'listings_price' => $reservation->listings_price,
                        'id' => $reservation->id,

                        'url' => $reservation->url,
                        'phone' => $reservation->phone,
                        'zip' => $reservation->zip,
                        'country' => $reservation->country,
                        'address' => $reservation->address,
                        'city' => $reservation->city,
                        'total_paid' => $reservation->total_paid,
                        'total_vat' => $reservation->total_vat,
                        'adults' => $reservation->adults,
                        'children' => $reservation->children,
                        'user_id' => $reservation->user_id,
                        'onlinestore_id' => $reservation->onlinestore_id,
                        'created_at' => $reservation->created_at,
                        'updated_at' => $reservation->updated_at,
                    ],
                    'relationships' => [
                        'user' => [
                            'data' => [
                                'type' => 'users',
                                'id' => $reservation->user_id,
                            ],
                        ],
                    ],
                ];
            }),
        ]);
    }



    public function show(JsonApiRoute $route, Store $store)
    {


         $reservationId = $route->resourceId();



        $reservation = Reservation::find($reservationId);


        if (!$reservation) {
            return response()->json(['error' => 'reservation not found'], 404);
        }







        return response()->json([
            'data' => [
                'id' => $reservation->id,
                'type' => 'reservation',
                'attributes' => [
                    'name' => $reservation->name,
                    'email' => $reservation->email,
                    'status' => $reservation->status,
                    'admin_status' => $reservation->admin_status,
                    'reservationstart' => $reservation->reservationstart ? Carbon::parse($reservation->reservationstart)->toIso8601String() : null,
                    'reservationsend' => $reservation->reservationsend ? Carbon::parse($reservation->reservationsend)->toIso8601String() : null,
                    'checkout_id' => $reservation->checkout_id,
                    'category' => $reservation->category,
                    'listings_thumb' => $reservation->listings_thumb,
                    'listings_title' => $reservation->listings_title,
                    'listings_price' => $reservation->listings_price,
                    'url' => $reservation->url,
                    'phone' => $reservation->phone,
                    'zip' => $reservation->zip,
                    'country' => $reservation->country,
                    'address' => $reservation->address,
                    'city' => $reservation->city,
                    'id' => $reservation->id,

                    'total_paid' => $reservation->total_paid,
                    'total_vat' => $reservation->total_vat,
                    'adults' => $reservation->adults,
                    'children' => $reservation->children,
                    'user_id' => $reservation->user_id,
                    'onlinestore_id' => $reservation->onlinestore_id,
                    'created_at' => $reservation->created_at,
                    'updated_at' => $reservation->updated_at,
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

    public function sshow(JsonApiRoute $route, Store $store)
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
