<?php

namespace App\Http\Controllers\Api\V2\Admin\DashboardC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use LaravelJsonApi\Core\Document\Error;
use LaravelJsonApi\Core\Responses\ErrorResponse;
use LaravelJsonApi\Core\Responses\DataResponse;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use Illuminate\Support\Facades\Storage;
use App\Enums\ItemStatus;
use Carbon\Carbon;



use App\Models\Listing;

use App\Models\Reservation;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class DashboardController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();

        // Get the total number of reservations made today
        $totalReservationsToday = Reservation::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->count();

        // Get the total number of reservations made this month
        $totalReservationsThisMonth = Reservation::where('user_id', $user->id)
            ->whereYear('created_at', Carbon::now()->year)
            ->whereMonth('created_at', Carbon::now()->month)
            ->count();

        // Calculate the total revenue from reservations today
        $totalRevenueToday = Reservation::where('user_id', $user->id)
            ->whereDate('created_at', Carbon::today())
            ->sum('listings_price');

        // Calculate the total revenue from reservations this month
        $totalRevenueThisMonth = Reservation::where('user_id', $user->id)
            ->whereYear('created_at', Carbon::now()->year)
            ->whereMonth('created_at', Carbon::now()->month)
            ->sum('listings_price');

        // Get the top listings for this month based on reservation count
        $topListingsThisMonths = Reservation::getTopListingsOfMonth();

        // Map over the top listings and get their details
        $topListingsDetails = $topListingsThisMonths->map(function ($topListing) {
            $listing = Listing::find($topListing->listing_id);

            if ($listing) {
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
                    'reservation_count' => $topListing->reservation_count, // Add reservation count
                ];
            }

            return null; // If listing not found
        })->filter(); // Remove null values if a listing is not found

        return response()->json([
            'data' => [
                'attributes' => [
                    'totalReservationsToday' => $totalReservationsToday,
                    'totalReservationsThisMonth' => $totalReservationsThisMonth,
                    'totalRevenueToday' => $totalRevenueToday,
                    'totalRevenueThisMonth' => $totalRevenueThisMonth,
                    'topListingsThisMonths' => $topListingsDetails,
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
