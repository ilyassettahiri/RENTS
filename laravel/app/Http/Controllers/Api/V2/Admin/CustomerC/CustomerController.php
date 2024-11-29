<?php

namespace App\Http\Controllers\Api\V2\Admin\CustomerC;

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



use App\Models\Customer;

use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class CustomerController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $customers = Customer::where('user_id', $user->id)->get();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $customers->map(function ($customer) use ($user) {
                return [
                    'type' => 'customers',
                    'id' => $customer->id,
                    'attributes' => [
                        'name' => $customer->name,
                        'email' => $customer->email,
                        'title' => $customer->listings_title,
                        'price' => $customer->listings_price,
                        'phone' => $customer->phone,
                        'status' => $customer->status ?? 'Active',
                        'picture' => $customer->listings_thumb,

                        'id' => $customer->id,
                        'created_at' => $customer->created_at,

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



    public function show(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $request = app('request'); // Retrieve the current request

        $customer = Customer::findOrFail($route->resourceId());


        return response()->json([
            'data' => [
                'type' => 'customers',
                'id' => $customer->id,
                'attributes' => [


                    'picture' => $customer->listings_thumb,
                    'name' => $customer->name,
                    'email' => $customer->email,
                    'title' => $customer->listings_title,
                    'price' => $customer->listings_price,

                    'status' => $customer->status,


                    'id' => $customer->id,



                    'user_id' => $customer->user_id,
                    'created_at' => $customer->created_at,
                    'updated_at' => $customer->updated_at,
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



    public function delete(JsonApiRoute $route, Store $store )
    {



        $request = app('request');


        $id = $route->resourceId();


            $listing = Customer::find($id);

            // Check if listing exists
            if ($listing) {
                $listing->delete(); // Delete the listing
                return response()->json(['message' => 'Listing deleted successfully'], 200);
            }

            // Return error if listing not found
            return response()->json(['message' => 'Listing not found'], 404);

    }





    public function updateStatus(Request $request, $id)
    {
        $reservation = Customer::where('user_id', Auth::id())->findOrFail($id);
        $status = $request->input('status');
        if (in_array($status, ['active', 'pending'])) {
            $reservation->status = $status;
            $reservation->save();
        }

        return response()->json([
            'data' => [
                'type' => 'reservations',

                'attributes' => [
                    'status' => $reservation->status,
                ],
            ],
        ]);
    }




}
