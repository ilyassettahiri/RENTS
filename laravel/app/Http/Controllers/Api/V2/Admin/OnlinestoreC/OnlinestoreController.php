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


use Illuminate\Support\Facades\Log;

use Illuminate\Support\Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Encoders\GifEncoder;


use App\Models\Listing;
use App\Models\User;



class OnlinestoreController extends JsonApiController
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
                        'phone' => $onlinestore->phone,
                        'id' => $onlinestore->id,

                        'email' => $onlinestore->email,
                        'category' => $onlinestore->type,
                        'address' => $onlinestore->address,
                       'city' => $onlinestore->city,
                        'country' => $onlinestore->country,
                        'zip' => $onlinestore->zip,
                        'description' => $onlinestore->description,


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


    private function generateUrl($title)
    {

            // Convert accented characters to ASCII equivalents
            $title = Str::ascii($title);

            // Generate slug from title
            $url = Str::slug($title, '-', null);

            // Append a unique number to ensure uniqueness
            $uniqueNumber = rand(1000, 9999);
            $url .= '-' . $uniqueNumber;

            return $url;
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
            'data.attributes.email' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.picture' => 'sometimes|image|max:6000000', // Validate images if present
            'data.attributes.profil_picture' => 'sometimes|image|max:6000000', // Validate images if present
        ]);

        // Initialize variables for image paths
        $picturerelativePath = null;
        $profil_picturerelativePath = null;



        $manager = new ImageManager(new Driver());

        if ($request->hasFile('data.attributes.picture')) {
            $file = $request->file('data.attributes.picture');


                try {


                    $imagelarge = $manager->read($file->getRealPath());



                    $imagelarge->scaleDown(width: 2000);




                    $fileNamelarge = $this->generateUniqueFileName('webp');



                    $encodedImagelarge = $imagelarge->encode(new WebpEncoder(quality: 90));




                    $encodedImagelarge->save($fileNamelarge);






                    $filePathlarge = Storage::disk('spaces')->put('storage/storelarge/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');




                    $relativePathlarge = '/storelarge/' . $fileNamelarge;
                    $picturerelativePath = $relativePathlarge;





                } catch (\Exception $e) {
                    Log::error('Image upload and processing failed.', ['error' => $e->getMessage()]);
                }

        }


        if ($request->hasFile('data.attributes.profil_picture')) {
            $file = $request->file('data.attributes.profil_picture');


                try {


                    $imagesmall = $manager->read($file->getRealPath());



                    $imagesmall->scaleDown(width: 100);




                    $fileNamesmall = $this->generateUniqueFileName('webp');



                    $encodedImagesmall = $imagesmall->encode(new WebpEncoder(quality: 90));




                    $encodedImagesmall->save($fileNamesmall);






                    $filePathsmall = Storage::disk('spaces')->put('storage/storesmall/' . $fileNamesmall, file_get_contents($fileNamesmall), 'public');




                    $relativePathsmall = '/storesmall/' . $fileNamesmall;
                    $profil_picturerelativePath = $relativePathsmall;





                } catch (\Exception $e) {
                    Log::error('Image upload and processing failed.', ['error' => $e->getMessage()]);
                }

        }




        // Handle image uploads
       /* if ($request->hasFile('data.attributes.picture')) {
            $picturefile = $request->file('data.attributes.picture');
            $picturePath = Storage::disk('public')->put('images', $picturefile, 'public');
            $picturerelativePath = '/' . str_replace('storage/', '', $picturePath); // Ensure the path is relative
        }

        if ($request->hasFile('data.attributes.profil_picture')) {
            $profil_picturefile = $request->file('data.attributes.profil_picture');
            $profil_picturePath = Storage::disk('public')->put('images', $profil_picturefile, 'public');
            $profil_picturerelativePath = '/' . str_replace('storage/', '', $profil_picturePath); // Ensure the path is relative
        }*/





        // Retrieve other input values
        $name = $request->input('data.attributes.name');
        $description = $request->input('data.attributes.description');
        $phone = $request->input('data.attributes.phone');
        $email = $request->input('data.attributes.email');
        $type = $request->input('data.attributes.category');

        $address = $request->input('data.attributes.address');
        $city = $request->input('data.attributes.city');
        $country = $request->input('data.attributes.country');
        $zip = $request->input('data.attributes.zip');
        $url = $this->generateUrl($name);


        // Create a new Onlinestore instance
        $onlinestore = new Onlinestore();
        $onlinestore->name = $name;
        $onlinestore->phone = $phone;
        $onlinestore->email = $email;
        $onlinestore->type = $type;
        $onlinestore->description = $description;


        $onlinestore->picture = $picturerelativePath;
        $onlinestore->profile_picture = $profil_picturerelativePath;
        $onlinestore->url = $url;
        $onlinestore->address = $address;
        $onlinestore->city = $city;
        $onlinestore->country = $country;
        $onlinestore->zip = $zip;
        $onlinestore->user_id = $user->id;
        $onlinestore->save();

        // Update all listings of the user to have the onlinestore_id set to the newly created store's ID
        Listing::where('user_id', $user->id)->update(['onlinestore_id' => $onlinestore->id]);


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




    public function update(JsonApiRoute $route, Store $store)
    {
        $request = app('request');


        $id = $route->resourceId();


        $request->validate([
            'attributes.name' => 'required|string',
            'attributes.email' => 'required|string',
            'attributes.description' => 'required|string',
        ]);



        $onlinestore = Onlinestore::findOrFail($id);




        $oldPicturePath = $onlinestore->picture;
        $oldProfilePicturePath = $onlinestore->profile_picture;



        $newPicture = $request->input('attributes.picture');
        $newProfilePicture = $request->input('attributes.profil_picture');

        if ($oldPicturePath && $newPicture && $oldPicturePath !== $newPicture) {
            if (Storage::disk('spaces')->exists('storage' . $oldPicturePath)) {
                Storage::disk('spaces')->delete('storage' . $oldPicturePath);
            }
        }

        if ($oldProfilePicturePath && $newProfilePicture && $oldProfilePicturePath !== $newProfilePicture) {
            if (Storage::disk('spaces')->exists('storage' . $oldProfilePicturePath)) {
                Storage::disk('spaces')->delete('storage' . $oldProfilePicturePath);
            }
        }


        $name = $request->input('attributes.name');
        $description = $request->input('attributes.description');
        $phone = $request->input('attributes.phone');
        $email = $request->input('attributes.email');
        $type = $request->input('attributes.category');

        $address = $request->input('attributes.address');
        $city = $request->input('attributes.city');
        $country = $request->input('attributes.country');
        $zip = $request->input('attributes.zip');
        $url = $this->generateUrl($name);
        $picturerelativePath = $request->input('attributes.picture');
        $profil_picturerelativePath = $request->input('attributes.profil_picture');




        $onlinestore->name = $name;
        $onlinestore->phone = $phone;
        $onlinestore->email = $email;
        $onlinestore->type = $type;


        $onlinestore->picture = $picturerelativePath;
        $onlinestore->profile_picture = $profil_picturerelativePath;
        $onlinestore->url = $url;
        $onlinestore->address = $address;
        $onlinestore->city = $city;
        $onlinestore->country = $country;
        $onlinestore->zip = $zip;

        $onlinestore->save();



        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'onlinestores',
                'id' => $onlinestore->id,
                'attributes' => [
                    'name' => $onlinestore->name,

                    'created_at' => $onlinestore->created_at,
                ],

            ]
        ], 201); // 201 Created status code
    }




    public function updateStatus(Request $request, $id)
    {
        $reservation = Onlinestore::where('user_id', Auth::id())->findOrFail($id);
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



    public function deleteStore(Request $request, $id )
    {





            $listing = Onlinestore::find($id);


            if ($listing) {





                    Storage::disk('spaces')->delete('storage/' . $listing->picture);







                    Storage::disk('spaces')->delete('storage/' . $listing->profile_picture);




                $listing->delete(); // Delete the listing
                return response()->json(['message' => 'Listing deleted successfully'], 200);
            }

            // Return error if listing not found
            return response()->json(['message' => 'Listing not found'], 404);

    }



}
