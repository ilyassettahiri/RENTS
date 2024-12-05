<?php

namespace App\Http\Controllers\Api\V2;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Core\Document\Error;
use LaravelJsonApi\Core\Responses\ErrorResponse;
use LaravelJsonApi\Core\Responses\DataResponse;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use App\Models\Discount;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;

use App\Models\User;

use App\Models\Role;

use App\Models\Onlinestore;





class UserController extends JsonApiController
{



    public function index(JsonApiRoute $route, Store $store)
    {




        $users = User::all();

        $usersData = $users->map(function ($user) {
            return [
                'id' => $user->id,
                'type' => 'users',
                'attributes' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'profile_image' => $user->profile_image,
                    'address' => $user->address,
                    'id' => $user->id,
                    'email_verified_at' => $user->email_verified_at,

                    'city' => $user->city,
                    'birthday' => $user->birthday,
                    'gender' => $user->gender,
                    'phone_number' => $user->phone_number,
                    'zip' => $user->zip,
                    'country' => $user->country,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                ],
                'relationships' => [
                    'roles' => [
                        'data' => $user->roles->map(function ($role) {
                            return [
                                'id' => $role->id,
                                'type' => 'roles',
                            ];
                        }),
                    ],
                ],
            ];
        });

        $rolesIncluded = $users->flatMap(function ($user) {
            return $user->roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'type' => 'roles',
                    'attributes' => [
                        'name' => $role->name,
                    ],
                ];
            });
        })->unique('id')->values();

        return response()->json([
            'data' => $usersData,
            'included' => $rolesIncluded,
        ]);





    }




    public function show(JsonApiRoute $route, Store $store)
    {

         // Get the user ID from the route parameters
         $userId = $route->parameter('user')->id;



        // Find the user by ID
        $user = User::find($userId);


        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }

            // Check if the user has an associated store
        $hasStore = $user->onlinestore()->exists();

        // Prepare the roles data for inclusion
        $rolesIncluded = $user->roles->map(function ($role) {
            return [
                'id' => $role->id,
                'type' => 'roles',
                'attributes' => [
                    'name' => $role->name,
                ],
            ];
        });



        return response()->json([
            'data' => [
                'id' => $user->id,
                'type' => 'users',
                'attributes' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'profile_image' => $user->profile_image,
                    'address' => $user->address,
                    'city' => $user->city,
                    'id' => $user->id,
                    'birthday' => $user->birthday,
                    'gender' => $user->gender,

                    'phone_number' => $user->phone_number,
                    'zip' => $user->zip,
                    'country' => $user->country,
                    'email_verified_at' => $user->email_verified_at,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,
                    'has_store' => $hasStore,
                ],
                'relationships' => [
                    'roles' => [
                        'data' => $user->roles->map(function ($role) {
                            return [
                                'id' => $role->id,
                                'type' => 'roles',
                            ];
                        }),
                    ],
                ],
            ],
            'included' => $rolesIncluded,
        ]);





    }




    public function update( JsonApiRoute $route, Store $store)
    {




           $userId = $route->parameter('user')->id;


           $user = User::find($userId);

           if (!$user) {
               return response()->json(['error' => 'User not found'], 404);
           }


           $request = request();






        if ($request->has('newPassword') && $request->has('oldPassword')) {

            $data = $request->only(['oldPassword', 'newPassword', 'confirmNewPassword']);





            $validator = Validator::make($data, [
                'oldPassword' => 'required|string',
                'newPassword' => 'required|string|min:8',
                'confirmNewPassword' => 'required|same:newPassword',
            ]);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            if (!Hash::check($data['oldPassword'], $user->password)) {
                return response()->json(['error' => 'Old password does not match'], 400);
            }

            $user->password = $data['newPassword'];

            $user->save();

            return response()->json(['message' => 'Password updated successfully'], 200);
        } else {






           $data = [
               'first_name' => $request->input('firstName'),
               'last_name' => $request->input('lastName'),
               'email' => $request->input('emailAddress'),
               'phone_number' => $request->input('phoneNumber'),
               'birthday' => $request->input('birthday'),
               'gender' => $request->input('gender'),
               'address' => $request->input('streetAddress'),
               'city' => $request->input('city'),
               'zip' => $request->input('zipCode'),
               'country' => $request->input('country'),

           ];

           // Validate the request data
           $validator = Validator::make($data, [
               'first_name' => 'string|max:255',
               'last_name' => 'string|max:255',
               'email' => 'string|email|max:255|unique:users,email,' . $userId,
               'phone_number' => 'string|max:20',
               'birthday' => 'date|nullable',
               'gender' => 'string|max:10|nullable',
               'address' => 'string|max:255|nullable',
               'city' => 'string|max:255|nullable',
               'zip' => 'string|max:20|nullable',
               'country' => 'string|max:255|nullable',

           ]);

           if ($validator->fails()) {
               return response()->json(['errors' => $validator->errors()], 422);
           }

           // Update user details
           $user->first_name = $data['first_name'] ?? $user->first_name;
           $user->last_name = $data['last_name'] ?? $user->last_name;
           $user->email = $data['email'] ?? $user->email;
           $user->phone_number = $data['phone_number'] ?? $user->phone_number;

           // Convert the birthday to the correct format
           if (!empty($data['birthday'])) {
               $user->birthday = Carbon::parse($data['birthday'])->format('Y-m-d');
           }

           $user->gender = $data['gender'] ?? $user->gender;
           $user->address = $data['address'] ?? $user->address;
           $user->city = $data['city'] ?? $user->city;
           $user->zip = $data['zip'] ?? $user->zip;
           $user->country = $data['country'] ?? $user->country;



           $user->save();



           return response()->json(['data' => $user], 200);


        }

    }



}
