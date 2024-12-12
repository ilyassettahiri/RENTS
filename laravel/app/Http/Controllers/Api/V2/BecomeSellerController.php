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
use Illuminate\Validation\Rule; // Import the Rule class

use Illuminate\Support\Facades\Hash;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;

use App\Models\User;

use App\Models\Role;

use App\Models\Onlinestore;





class BecomeSellerController extends JsonApiController
{












    public function updateSeller(Request $request, $id)
    {






           $user = User::find($id);

           if (!$user) {
               return response()->json(['error' => 'User not found'], 404);
           }


           $attributes = $request->input('data.attributes');

            $data = [
                'first_name' => $attributes['firstName'] ?? null,
                'last_name' => $attributes['lastName'] ?? null,
                'name' => $attributes['name'] ?? null,
                'email' => $attributes['email'] ?? $user->email,
                'phone_number' => $attributes['phoneNumber'] ?? null,
                'address' => $attributes['streetAddress'] ?? null,
                'city' => $attributes['city'] ?? null,
                'zip' => $attributes['zipCode'] ?? null,
                'country' => $attributes['country'] ?? null,
            ];




           // Validate the request data
           $validator = Validator::make($data, [
               'first_name' => 'string|max:255',
               'last_name' => 'string|max:255',
               'name' => 'string|max:255',

               'email' => [
                    'string',
                    'email',
                    'max:255',
                    Rule::unique('users', 'email')->ignore($user->id), // Allow the user's own email
                ],
               'phone_number' => 'string|max:20',

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
           $user->name = $data['name'] ?? $user->name;

           $user->email = $data['email'] ?? $user->email;
           $user->phone_number = $data['phone_number'] ?? $user->phone_number;


           $user->address = $data['address'] ?? $user->address;
           $user->city = $data['city'] ?? $user->city;
           $user->zip = $data['zip'] ?? $user->zip;
           $user->country = $data['country'] ?? $user->country;




           $user->save();


           if (!$user->hasRole('seller')) {
                $user->syncRoles(['seller']);
           }

           return response()->json(['data' => $user], 200);


    }





}
