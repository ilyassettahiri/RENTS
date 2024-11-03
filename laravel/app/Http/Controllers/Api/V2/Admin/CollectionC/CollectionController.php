<?php

namespace App\Http\Controllers\Api\V2\Admin\CollectionC;

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
use Symfony\Component\HttpFoundation\Request as SymfonyRequest;


use Illuminate\Support\Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Encoders\GifEncoder;



use App\Models\Listing;
use App\Models\Collection;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class CollectionController extends JsonApiController
{


    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $collections = Collection::where('user_id', $user->id)->get();


        return response()->json([
            'data' => $collections->map(function ($collection) use ($user) {
                return [
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
                ];
            }),
        ]);
    }


    function generateUniqueFileName($extension = 'webp')
    {

        $randomString = bin2hex(random_bytes(16)); // Generate a random 32-character hexadecimal string
        $shuffledString = str_shuffle($randomString); // Shuffle the string for added randomness
        return $shuffledString . '.' . $extension;

    }


    public function store(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $request = app('request'); // Retrieve the current request




        // Validate the request
        $request->validate([
            'data.attributes.name' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.picture' => 'sometimes|image|max:6000000',
        ]);

        // Initialize an array to hold the image paths
        $picturerelativePath = null;



        $manager = new ImageManager(new Driver());

        $file = $request->file('data.attributes.picture');
        $imagelarge = $manager->read($file->getRealPath());




        $imagelarge->scaleDown(width: 400);




        $fileNamelarge = $this->generateUniqueFileName('webp');



        $encodedImagelarge = $imagelarge->encode(new WebpEncoder(quality: 90));




        $encodedImagelarge->save($fileNamelarge);






        $filePathlarge = Storage::disk('spaces')->put('storage/collectionimages/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');




        $picturerelativePath = $fileNamelarge;



                /*if ($request->hasFile('data.attributes.picture')) {
                    $picturefile = $request->file('data.attributes.picture');
                    $filePath = Storage::disk('public')->put('storage/images', $picturefile, 'public');

                    $relativePath = str_replace('storage/', '', $filePath);
                    $picturerelativePath = '/' . $relativePath;


                }*/


        $name = $request->input('data.attributes.name');
        $description = $request->input('data.attributes.description');



        $collection = new Collection();
        $collection->description = $description;
        $collection->name = $name;
        $collection->onlinestore_id = 0;


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
        $request = app('request'); // Retrieve the current request

        // Get the ID from the route parameters
        $id = $route->resourceId();


        // Validate the request
        $request->validate([
            'name' => 'required|string',
            'description' => 'required|string',
            'picture' => 'sometimes|string', // Picture is now just a string
        ]);

        $collection = Collection::findOrFail($id);

        $oldPicturePath = $collection->picture;

        $newPicture = $request->input('picture');


        if ($oldPicturePath && $newPicture && $oldPicturePath !== $newPicture) {
            // Delete the old picture from DigitalOcean Spaces if it exists
            if (Storage::disk('spaces')->exists('storage/collectionimages/' . $oldPicturePath)) {
                Storage::disk('spaces')->delete('storage/collectionimages/' . $oldPicturePath);
            }
        }

        // Store picture variable without handling image uploads
        $collection->name = $request->input('name');
        $collection->description = $request->input('description');
        $collection->picture = $request->input('picture'); // Store picture URL directly

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
            ]
        ], 200); // 200 OK status code
    }






    public function show(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $collection = Collection::where('user_id', $user->id)->findOrFail($route->resourceId());

        $listings = $collection->listing()->get();


        return response()->json([
            'data' => [
                'type' => 'collections',
                'id' => $collection->id,
                'attributes' => [
                    'name' => $collection->name,
                    'picture' => $collection->picture,
                    'status' => $collection->status,

                    'description' => $collection->description,
                    'created_at' => $collection->created_at,


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




    public function deleteCollection(Request $request, $id )
    {






            $listing = Collection::find($id);

            // Check if listing exists
            if ($listing) {


                if ($listing->picture) {

                    Storage::disk('spaces')->delete('storage/collectionimages/' . $listing->picture);
                }



                $listing->delete(); // Delete the listing
                return response()->json(['message' => 'Listing deleted successfully'], 200);
            }

            // Return error if listing not found
            return response()->json(['message' => 'Listing not found'], 404);

    }



    public function updateStatus(Request $request, $id)
    {
        $reservation = Collection::where('user_id', Auth::id())->findOrFail($id);
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
