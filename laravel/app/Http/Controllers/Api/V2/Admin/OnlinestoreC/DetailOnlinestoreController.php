<?php

namespace App\Http\Controllers\Api\V2\Admin\OnlinestoreC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use App\Models\Onlinestore;
use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class DetailOnlinestoreController extends JsonApiController
{
    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $onlinestores = Onlinestore::where('user_id', $user->id)->get();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $onlinestores->map(function ($onlinestore) use ($user) {
                return [
                    'type' => 'onlinestores',
                    'id' => $onlinestore->id,
                    'attributes' => [
                        'name' => $onlinestore->name,
                        'url' => $onlinestore->url,
                        'picture' => $onlinestore->picture,
                        'profile_picture' => $onlinestore->profile_picture,
                        'user_id' => $onlinestore->user_id,
                        'created_at' => $onlinestore->created_at,
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
        $request->validate([
            'data.attributes.name' => 'required|string',
            'data.attributes.title' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.picture' => 'sometimes|image|max:2048', // Validate images if present
            'data.attributes.profil_picture' => 'sometimes|image|max:2048', // Validate images if present
        ]);

        // Initialize variables for image paths
        $picturerelativePath = null;
        $profil_picturerelativePath = null;

        // Handle image uploads
        if ($request->hasFile('data.attributes.picture')) {
            $picturefile = $request->file('data.attributes.picture');
            $picturePath = Storage::disk('public')->put('images', $picturefile);
            $picturerelativePath = '/' . $picturePath; // Prepend '/' to make it a relative path
        }

        if ($request->hasFile('data.attributes.profil_picture')) {
            $profil_picturefile = $request->file('data.attributes.profil_picture');
            $profil_picturePath = Storage::disk('public')->put('images', $profil_picturefile);
            $profil_picturerelativePath = '/' . $profil_picturePath; // Prepend '/' to make it a relative path
        }

        // Retrieve other input values
        $name = $request->input('data.attributes.name');
        $description = $request->input('data.attributes.description');
        $title = $request->input('data.attributes.title');
        $address = $request->input('data.attributes.address');
        $city = $request->input('data.attributes.city');
        $country = $request->input('data.attributes.country');
        $zip = $request->input('data.attributes.zip');
        $url = str_replace(' ', '-', $title);

        // Create a new Onlinestore instance
        $onlinestore = new Onlinestore();
        $onlinestore->name = $name;
        $onlinestore->picture = $picturerelativePath;
        $onlinestore->profile_picture = $profil_picturerelativePath;
        $onlinestore->url = $url;
        $onlinestore->address = $address;
        $onlinestore->city = $city;
        $onlinestore->country = $country;
        $onlinestore->zip = $zip;
        $onlinestore->user_id = $user->id;
        $onlinestore->save();

        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'onlinestores',
                'id' => $onlinestore->id,
                'attributes' => [
                    'name' => $onlinestore->name,
                    'user_id' => $onlinestore->user_id,
                    'created_at' => $onlinestore->created_at,
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
}
