<?php

namespace App\Http\Controllers\Api\V2\Admin\ListingC;

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

use Illuminate\Support\Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Encoders\GifEncoder;

use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;


use App\Models\Listing;

use App\Models\Onlinestore;


use App\Models\Jobsimg  ;


use App\Models\Billiard;
use App\Models\Boxing;
use App\Models\Diving  ;
use App\Models\Football  ;
use App\Models\Golf  ;
use App\Models\Hunting  ;
use App\Models\Musculation  ;
use App\Models\Surf  ;
use App\Models\Tennis  ;




use App\Models\Job  ;


use App\Models\Audio  ;
use App\Models\Camera  ;
use App\Models\Charger  ;
use App\Models\Drone  ;
use App\Models\Gaming  ;
use App\Models\Laptop  ;
use App\Models\Lighting  ;
use App\Models\Printer  ;
use App\Models\Router  ;
use App\Models\Tablette  ;


use App\Models\Eclairage  ;
use App\Models\Mobilier  ;
use App\Models\Photographie  ;
use App\Models\Sonorisation  ;
use App\Models\Tente  ;


use App\Models\Clothes  ;
use App\Models\Jewelry  ;


use App\Models\Apartment  ;
use App\Models\Bureaux  ;
use App\Models\Magasin  ;
use App\Models\Maison  ;
use App\Models\Riad  ;
use App\Models\Terrain  ;
use App\Models\Villa  ;


use App\Models\Activity  ;
use App\Models\Livre  ;
use App\Models\Musical  ;


use App\Models\Furniture  ;
use App\Models\Houseappliance  ;


use App\Models\Electricaltool  ;
use App\Models\Ladder  ;
use App\Models\Mechanicaltool  ;
use App\Models\Powertool  ;
use App\Models\Pressurewasher  ;



use App\Models\Service  ;



use App\Models\Boat  ;
use App\Models\Camion  ;
use App\Models\Caravan  ;
use App\Models\Car  ;
use App\Models\Engin  ;
use App\Models\Moto  ;
use App\Models\Scooter  ;
use App\Models\Taxiaeroport  ;
use App\Models\Transportation  ;
use App\Models\Velo  ;




use App\Models\Billiardsimg;
use App\Models\Boxingsimg;
use App\Models\Divingsimg;
use App\Models\Footballsimg;
use App\Models\Golfsimg;
use App\Models\Huntingsimg;
use App\Models\Musculationsimg;
use App\Models\Surfsimg;
use App\Models\Tennisimg;

use App\Models\Audiosimg;
use App\Models\Camerasimg;
use App\Models\Chargersimg;
use App\Models\Dronesimg;
use App\Models\Gamingsimg;
use App\Models\Laptopsimg;
use App\Models\Lightingsimg;
use App\Models\Printersimg;
use App\Models\Routersimg;
use App\Models\Tablettesimg;

use App\Models\Eclairagesimg;
use App\Models\Mobiliersimg;
use App\Models\Photographiesimg;
use App\Models\Sonorisationsimg;
use App\Models\Tentesimg;


use App\Models\Listingsimg;

use App\Models\Clothesimg;
use App\Models\Jewelrysimg;

use App\Models\Apartmentsimg;
use App\Models\Bureauxsimg;
use App\Models\Magasinsimg;
use App\Models\Maisonsimg;
use App\Models\Riadsimg;
use App\Models\Terrainsimg;
use App\Models\Villasimg;

use App\Models\Activitiesimg;
use App\Models\Livresimg;
use App\Models\Musicalsimg;

use App\Models\Furnituresimg;
use App\Models\Houseappliancesimg;

use App\Models\Electricaltoolsimg;
use App\Models\Laddersimg;
use App\Models\Mechanicaltoolsimg;
use App\Models\Powertoolsimg;
use App\Models\Pressurewashersimg;

use App\Models\Servicesimg;

use App\Models\Boatsimg;
use App\Models\Camionsimg;
use App\Models\Caravansimg;
use App\Models\Carsimg;
use App\Models\Enginsimg;
use App\Models\Motosimg;
use App\Models\Scootersimg;
use App\Models\Taxiaeroportsimg;
use App\Models\Transportationsimg;
use App\Models\Velosimg;




class ListingController extends JsonApiController
{




    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $listings = Listing::where('user_id', $user->id)->get();

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $listings->map(function ($listing) use ($user) {
                return [
                    'type' => 'listings',
                    'id' => $listing->id,
                    'attributes' => [
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
            $uniqueNumber = rand(1000000000, 9999999999);
            $url .= '-' . $uniqueNumber;

            return $url;
    }


    function generateUniqueFileName($extension = 'jpg')
    {

        $randomString = bin2hex(random_bytes(16)); // Generate a random 32-character hexadecimal string
        $shuffledString = str_shuffle($randomString); // Shuffle the string for added randomness
        return $shuffledString . '.' . $extension;

    }



    public function store(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $request = app('request'); // Retrieve the current request

        $userstore = Onlinestore::where('user_id', $user->id)->first();

        $onlinestore_id = $userstore ? $userstore->id : 0;

        // Validate the request
        $request->validate([
            'data.attributes.category' => 'required|string',
            'data.attributes.title' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.images.*' => 'sometimes|image|max:6000000', // Validate images if present
        ]);



        // Initialize an array to hold the image paths
            $imagePathslarge = [];
            $imagePathssmall = [];

            $imagePathsxlarge = [];

            $thumb = null;



            $category = $request->input('data.attributes.category');

            $manager = new ImageManager(new Driver());

            if ($request->hasFile('data.attributes.images')) {
                $files = $request->file('data.attributes.images');

                foreach ($files as $index => $file) {
                    try {


                        $imagelarge = $manager->read($file->getRealPath());

                        $imagexlarge = $manager->read($file->getRealPath());


                        $imagesmall = $manager->read($file->getRealPath());




                        $imagelarge->scaleDown(height: 800);

                        $imagexlarge->scaleDown(width: 1500);


                        $imagesmall->scaleDown(width: 500);





                        $fileNamelarge = $this->generateUniqueFileName('jpg');

                        $fileNamesmall = str_replace('.jpg', 'small.jpg', $fileNamelarge);

                        $fileNamexlarge = str_replace('.jpg', 'xl.jpg', $fileNamelarge);




                        $encodedImagelarge = $imagelarge->encode(new AutoEncoder(quality: 90));

                        $encodedImagexlarge = $imagelarge->encode(new AutoEncoder(quality: 90));


                        $encodedImagesmall = $imagesmall->encode(new AutoEncoder(quality: 90));




                        $encodedImagelarge->save($fileNamelarge);

                        $encodedImagexlarge->save($fileNamexlarge);


                        $encodedImagesmall->save($fileNamesmall);




                        $filePathlarge = Storage::disk('spaces')->put( 'storage/listinglarge/' . $category . '/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');

                        $filePathxlarge = Storage::disk('spaces')->put( 'storage/listingxlarge/' . $category . '/' . $fileNamexlarge, file_get_contents($fileNamexlarge), 'public');


                        $filePathsmall = Storage::disk('spaces')->put( 'storage/listingsmall/' . $category . '/' . $fileNamesmall, file_get_contents($fileNamesmall), 'public');




                        $imagePathslarge[] = $category . '/' . $fileNamelarge;


                        $imagePathsxlarge[] = $category . '/' . $fileNamexlarge;

                        $relativePathsmall = $category . '/' . $fileNamesmall;
                        $imagePathssmall[] = $relativePathsmall;


                        if ($index === 0) {
                            $thumb = $relativePathsmall;
                        }

                    } catch (\Exception $e) {
                        Log::error('Image upload and processing failed.', ['error' => $e->getMessage()]);
                    }
                }
            }



            /*$category = strtolower($request->input('data.attributes.category'));

            $manager = new ImageManager(new Driver());

            if ($request->hasFile('data.attributes.images')) {
                $files = $request->file('data.attributes.images');

                foreach ($files as $index => $file) {
                    try {
                        // Check if the category folder exists in the main storage path and create it if necessary
                        $disk = Storage::disk('spaces');

                        $categoryPath = 'storage/' . $category;

                        if (!$disk->exists($categoryPath)) {
                            $disk->makeDirectory($categoryPath, 0755, true, 'public');
                        }

                        // Image processing and scaling
                        $imagelarge = $manager->read($file->getRealPath());
                        $imagexlarge = $manager->read($file->getRealPath());
                        $imagesmall = $manager->read($file->getRealPath());

                        $imagelarge->scaleDown(height: 500);
                        $imagexlarge->scaleDown(width: 1000);
                        $imagesmall->scaleDown(width: 400);

                        // Generate unique filenames
                        $fileNamelarge = $this->generateUniqueFileName('jpg');
                        $fileNamesmall = str_replace('.jpg', 'small.jpg', $fileNamelarge);
                        $fileNamexlarge = str_replace('.jpg', 'xl.jpg', $fileNamelarge);

                        // Encode the images with quality 90
                        $encodedImagelarge = $imagelarge->encode(new AutoEncoder(quality: 90));
                        $encodedImagexlarge = $imagelarge->encode(new AutoEncoder(quality: 90));
                        $encodedImagesmall = $imagesmall->encode(new AutoEncoder(quality: 90));

                        // Save encoded images to local filesystem
                        $encodedImagelarge->save($fileNamelarge);
                        $encodedImagexlarge->save($fileNamexlarge);
                        $encodedImagesmall->save($fileNamesmall);

                        // Upload images to DigitalOcean Spaces in the correct subfolders
                        $filePathlarge = $disk->put('storage/listinglarge/' . $category . '/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');
                        $filePathxlarge = $disk->put('storage/listingxlarge/' . $category . '/' . $fileNamexlarge, file_get_contents($fileNamexlarge), 'public');
                        $filePathsmall = $disk->put('storage/listingsmall/' . $category . '/' . $fileNamesmall, file_get_contents($fileNamesmall), 'public');

                        // Store image paths
                        $imagePathslarge[] = $category . '/' . $fileNamelarge;
                        $imagePathsxlarge[] = $category . '/' . $fileNamexlarge;
                        $relativePathsmall = $category . '/' . $fileNamesmall;
                        $imagePathssmall[] = $relativePathsmall;

                        // Set the first image as the thumbnail
                        if ($index === 0) {
                            $thumb = $relativePathsmall;
                        }

                    } catch (\Exception $e) {
                        Log::error('Image upload and processing failed.', ['error' => $e->getMessage()]);
                    }
                }
            }*/


            /*if ($request->hasFile('data.attributes.images')) {
                $files = $request->file('data.attributes.images');

                foreach ($files as $index => $file) {
                    $filePath = Storage::disk('public')->put('images', $file);
                    $relativePath = '/' . $filePath; // Prepend '/' to make it a relative path
                    $imagePathslarge[] = $relativePath;
                    $imagePathssmall[] = $relativePath;
                    $imagePathsxlarge[] = $relativePath;

                    // Save the first image path to the Billiard table
                    if ($index === 0) {
                        $thumb = $relativePath;
                    }
                }
            }*/






        $description = $request->input('data.attributes.description');
        $title = $request->input('data.attributes.title');
        $address = $request->input('data.attributes.address');

        $city = $request->input('data.attributes.city');
        $country = $request->input('data.attributes.country');
        $zip = $request->input('data.attributes.zip');

        $currency = $request->input('data.attributes.currency');


        $startdate = $request->input('data.attributes.startdate');
        $enddate = $request->input('data.attributes.enddate');
        $price = $request->input('data.attributes.price');
        $phone = $request->input('data.attributes.phone');

        $url = $this->generateUrl($title);







        $listing = new Listing();
        $listing->category = $category;
        $listing->title = $title;
        $listing->price = $price;
        $listing->currency = $currency;

        $listing->phone = $phone;

        $listing->city = $city;
        $listing->zip = $zip;


        $listing->picture = $thumb;
        $listing->url = $url;

        $listing->user_id = $user->id;



            $listing->onlinestore_id = $onlinestore_id;




        $listing->save();

        foreach ($imagePathslarge as $index => $largePath) {

            $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


            $listingsimg = new Listingsimg();
            $listingsimg->listing_id = $listing->id;
            $listingsimg->picture = $largePath;
            $listingsimg->picturesmall = $smallPath;
            $listingsimg->picturesxlarge = $xlargePath;
            $listingsimg->save();
        }


        switch (strtolower($category)) {



            case 'billiard':



                $billiardsData = $request->input('data.attributes.billiards');




                $billiard = new Billiard();
                $billiard->user_id = $user->id;
                $billiard->onlinestore_id = $onlinestore_id;

                $billiard->title = $title;
                $billiard->price = $price;
                $billiard->currency = $currency;
                $billiard->phone = $phone;

                $billiard->address = $address;
                $billiard->city = $city;
                $billiard->country = $country;
                $billiard->zip = $zip;
                $billiard->description = $description;
                $billiard->url = $url;
                $billiard->picture = $thumb;
                $billiard->startdate  = $startdate ;
                $billiard->enddate = $enddate;
                $billiard->table_brand = $billiardsData['tableDetails'] ?? null;
                $billiard->condition = $billiardsData['condition'] ?? null;
                $billiard->balls_design = is_array($billiardsData['ballsDesign']) ? implode(', ', $billiardsData['ballsDesign']) : $billiardsData['ballsDesign'];
                $billiard->bridge_stick = is_array($billiardsData['bridgeAndStick']) ? implode(', ', $billiardsData['bridgeAndStick']) : $billiardsData['bridgeAndStick'];
                $billiard->chalk = is_array($billiardsData['chalk']) ? implode(', ', $billiardsData['chalk']) : $billiardsData['chalk'];
                $billiard->scoreboards = is_array($billiardsData['otherInformation']) ? implode(', ', $billiardsData['otherInformation']) : $billiardsData['otherInformation'];

                $billiard->more_details = is_array($billiardsData['moreDetails']) ? implode(', ', $billiardsData['moreDetails']) : $billiardsData['moreDetails'];


                $billiard->save();




                foreach ($imagePathslarge as $index => $largePath) {

                    $smallPath = $imagePathssmall[$index];
                                                    $xlargePath = $imagePathsxlarge[$index];


                    $billiardsimg = new Billiardsimg();
                    $billiardsimg->billiard_id = $billiard->id;
                    $billiardsimg->picture = $largePath;
                    $billiardsimg->picturesmall = $smallPath;
                    $billiardsimg->picturesxlarge = $xlargePath;
                    $billiardsimg->save();
                }





                break;





            case 'boxing':



                                $boxingsData = $request->input('data.attributes.boxings');
                                Log::info('Billiards Data:', $boxingsData);

                                $boxing = new Boxing();
                                $boxing->user_id = $user->id;
                                $boxing->onlinestore_id = $onlinestore_id;

                                $boxing->title = $title;
                                $boxing->price = $price;
                                $boxing->currency = $currency;

                                $boxing->phone = $phone;

                                $boxing->address = $address;
                                $boxing->city = $city;
                                $boxing->country = $country;
                                $boxing->zip = $zip;
                                $boxing->description = $description;
                                $boxing->url = $url;
                                $boxing->picture = $thumb;
                                $boxing->startdate  = $startdate ;
                                $boxing->enddate = $enddate;
                                $boxing->brand_name = $boxingsData['brand'] ?? null;
                                $boxing->ring_dimensions = $boxingsData['ringDimensions'] ?? null;
                                $boxing->padding_thickness = $boxingsData['padding'] ?? null;
                                $boxing->boxing_clothing = is_array($boxingsData['clothing']) ? implode(', ', $boxingsData['clothing']) : $boxingsData['clothing'];
                                $boxing->other_equipment = is_array($boxingsData['otherEquipment']) ? implode(', ', $boxingsData['otherEquipment']) : $boxingsData['otherEquipment'];


                                $boxing->more_details = is_array($boxingsData['moreDetails']) ? implode(', ', $boxingsData['moreDetails']) : $boxingsData['moreDetails'];



                                $boxing->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $boxingsimg = new Boxingsimg();
                                    $boxingsimg->boxing_id = $boxing->id;
                                    $boxingsimg->picture = $largePath;
                                    $boxingsimg->picturesmall = $smallPath;
                                    $boxingsimg->picturesxlarge = $xlargePath;
                                    $boxingsimg->save();
                                }




                break;






            case 'diving':


                $divingsData = $request->input('data.attributes.divings');
                Log::info('Divings Data:', $divingsData);

                                $diving = new Diving();
                                $diving->user_id = $user->id;
                                $diving->onlinestore_id = $onlinestore_id;

                                $diving->title = $title;
                                $diving->price = $price;
                                $diving->currency = $currency;

                                $diving->phone = $phone;

                                $diving->address = $address;
                                $diving->city = $city;
                                $diving->country = $country;
                                $diving->zip = $zip;
                                $diving->description = $description;
                                $diving->url = $url;
                                $diving->picture = $thumb;
                                $diving->startdate  = $startdate ;
                                $diving->enddate = $enddate;
                                // Storing additional data from divingsData
                                $diving->brand_name = $divingsData['brandName'] ?? null;
                                $diving->material = $divingsData['material'] ?? null;
                                $diving->other_equipment = is_array($divingsData['otherEquipment']) ? implode(', ', $divingsData['otherEquipment']) : $divingsData['otherEquipment'];


                                $diving->more_details = is_array($divingsData['moreDetails']) ? implode(', ', $divingsData['moreDetails']) : $divingsData['moreDetails'];



                                $diving->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $divingsimg = new Divingsimg();
                                    $divingsimg->diving_id = $diving->id;
                                    $divingsimg->picture = $largePath;
                                    $divingsimg->picturesmall = $smallPath;
                                    $divingsimg->picturesxlarge = $xlargePath;
                                    $divingsimg->save();
                                }





                break;







            case 'football':


                $footballsData = $request->input('data.attributes.footballs');
                Log::info('Footballs Data:', $footballsData);


                                $football = new Football();
                                $football->user_id = $user->id;
                                $football->onlinestore_id = $onlinestore_id;

                                $football->title = $title;
                                $football->price = $price;
                                $football->currency = $currency;

                                $football->phone = $phone;

                                $football->address = $address;
                                $football->city = $city;
                                $football->country = $country;
                                $football->zip = $zip;
                                $football->description = $description;
                                $football->url = $url;
                                $football->picture = $thumb;
                                $football->startdate  = $startdate ;
                                $football->enddate = $enddate;

                                // Storing additional data from footballsData
                                $football->type = $footballsData['type'] ?? null;
                                $football->equipment = is_array($footballsData['equipment']) ? implode(', ', $footballsData['equipment']) : $footballsData['equipment'];

                                $football->more_details = is_array($footballsData['moreDetails']) ? implode(', ', $footballsData['moreDetails']) : $footballsData['moreDetails'];


                                $football->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $footballsimg = new Footballsimg();
                                    $footballsimg->football_id = $football->id;
                                    $footballsimg->picture = $largePath;
                                    $footballsimg->picturesmall = $smallPath;
                                    $footballsimg->picturesxlarge = $xlargePath;
                                    $footballsimg->save();
                                }





                break;







            case 'golf':


                $golfsData = $request->input('data.attributes.golfs');
                Log::info('Golfs Data:', $golfsData);


                                $golf = new Golf();
                                $golf->user_id = $user->id;
                                $golf->onlinestore_id = $onlinestore_id;

                                $golf->title = $title;
                                $golf->price = $price;
                                $golf->currency = $currency;

                                $golf->phone = $phone;

                                $golf->address = $address;
                                $golf->city = $city;
                                $golf->country = $country;
                                $golf->zip = $zip;
                                $golf->description = $description;
                                $golf->url = $url;
                                $golf->picture = $thumb;
                                $golf->startdate  = $startdate ;
                                $golf->enddate = $enddate;
                                // Storing additional data from golfsData
                                $golf->clothing = is_array($golfsData['clothing']) ? implode(', ', $golfsData['clothing']) : $golfsData['clothing'];
                                $golf->golf_cars = $golfsData['cars'] ?? null;
                                $golf->other_equipment = is_array($golfsData['otherEquipment']) ? implode(', ', $golfsData['otherEquipment']) : $golfsData['otherEquipment'];


                                $golf->more_details = is_array($golfsData['moreDetails']) ? implode(', ', $golfsData['moreDetails']) : $golfsData['moreDetails'];


                                $golf->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $golfsimg = new Golfsimg();
                                    $golfsimg->golf_id = $golf->id;
                                    $golfsimg->picture = $largePath;
                                    $golfsimg->picturesmall = $smallPath;
                                    $golfsimg->picturesxlarge = $xlargePath;
                                    $golfsimg->save();
                                }





                break;








            case 'hunting':



                $huntingsData = $request->input('data.attributes.huntings');
                Log::info('Huntings Data:', $huntingsData);


                                $hunting = new Hunting();
                                $hunting->user_id = $user->id;
                                $hunting->onlinestore_id = $onlinestore_id;

                                $hunting->title = $title;
                                $hunting->price = $price;
                                $hunting->currency = $currency;

                                $hunting->phone = $phone;

                                $hunting->address = $address;
                                $hunting->city = $city;
                                $hunting->country = $country;
                                $hunting->zip = $zip;
                                $hunting->description = $description;
                                $hunting->url = $url;
                                $hunting->picture = $thumb;
                                $hunting->startdate  = $startdate ;
                                $hunting->enddate = $enddate;
                                // Storing additional data from huntingsData
                                $hunting->bow_arrow = $huntingsData['bowArrow'] ?? null;
                                $hunting->crossbow = $huntingsData['crossbow'] ?? null;
                                $hunting->decoy = is_array($huntingsData['decoy']) ? implode(', ', $huntingsData['decoy']) : $huntingsData['decoy'];
                                $hunting->game_call = is_array($huntingsData['gameCall']) ? implode(', ', $huntingsData['gameCall']) : $huntingsData['gameCall'];
                                $hunting->binoculars = is_array($huntingsData['binoculars']) ? implode(', ', $huntingsData['binoculars']) : $huntingsData['binoculars'];
                                $hunting->clothing = is_array($huntingsData['clothing']) ? implode(', ', $huntingsData['clothing']) : $huntingsData['clothing'];
                                $hunting->equipment = is_array($huntingsData['equipment']) ? implode(', ', $huntingsData['equipment']) : $huntingsData['equipment'];


                                $hunting->more_details = is_array($huntingsData['moreDetails']) ? implode(', ', $huntingsData['moreDetails']) : $huntingsData['moreDetails'];



                                $hunting->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $huntingsimg = new Huntingsimg();
                                    $huntingsimg->hunting_id = $hunting->id;
                                    $huntingsimg->picture = $largePath;
                                    $huntingsimg->picturesmall = $smallPath;
                                    $huntingsimg->picturesxlarge = $xlargePath;
                                    $huntingsimg->save();
                                }





                break;







            case 'gym':


                $musculationsData = $request->input('data.attributes.musculations');
                Log::info('Musculations Data:', $musculationsData);


                                $musculation = new Musculation();
                                $musculation->user_id = $user->id;
                                $musculation->onlinestore_id = $onlinestore_id;

                                $musculation->title = $title;
                                $musculation->price = $price;
                                $musculation->currency = $currency;

                                $musculation->phone = $phone;

                                $musculation->address = $address;
                                $musculation->city = $city;
                                $musculation->country = $country;
                                $musculation->zip = $zip;
                                $musculation->description = $description;
                                $musculation->url = $url;
                                $musculation->picture = $thumb;
                                $musculation->startdate  = $startdate ;
                                $musculation->enddate = $enddate;
                                // Storing additional data from musculationsData
                                $musculation->brand_name = is_array($musculationsData['brand']) ? implode(', ', $musculationsData['brand']) : $musculationsData['brand'];
                                $musculation->arms = is_array($musculationsData['arms']) ? implode(', ', $musculationsData['arms']) : $musculationsData['arms'];
                                $musculation->back = is_array($musculationsData['back']) ? implode(', ', $musculationsData['back']) : $musculationsData['back'];
                                $musculation->shoulders = is_array($musculationsData['shoulders']) ? implode(', ', $musculationsData['shoulders']) : $musculationsData['shoulders'];
                                $musculation->glutes = is_array($musculationsData['glutes']) ? implode(', ', $musculationsData['glutes']) : $musculationsData['glutes'];
                                $musculation->legs = is_array($musculationsData['legs']) ? implode(', ', $musculationsData['legs']) : $musculationsData['legs'];
                                $musculation->chest = is_array($musculationsData['chest']) ? implode(', ', $musculationsData['chest']) : $musculationsData['chest'];
                                $musculation->abs = is_array($musculationsData['abs']) ? implode(', ', $musculationsData['abs']) : $musculationsData['abs'];
                                $musculation->cardio_machines = is_array($musculationsData['cardio']) ? implode(', ', $musculationsData['cardio']) : $musculationsData['cardio'];
                                $musculation->dumbbells = is_array($musculationsData['other']) ? implode(', ', $musculationsData['other']) : $musculationsData['other'];


                                $musculation->more_details = is_array($musculationsData['moreDetails']) ? implode(', ', $musculationsData['moreDetails']) : $musculationsData['moreDetails'];



                                $musculation->save();


                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $musculationsimg = new Musculationsimg();
                                    $musculationsimg->musculation_id = $musculation->id;
                                    $musculationsimg->picture = $largePath;
                                    $musculationsimg->picturesmall = $smallPath;
                                    $musculationsimg->picturesxlarge = $xlargePath;
                                    $musculationsimg->save();
                                }





                break;








            case 'surf':


                $surfsData = $request->input('data.attributes.surfs');
                Log::info('Surfs Data:', $surfsData);



                                $surf = new Surf();
                                $surf->user_id = $user->id;
                                $surf->onlinestore_id = $onlinestore_id;

                                $surf->title = $title;
                                $surf->price = $price;
                                $surf->currency = $currency;

                                $surf->phone = $phone;

                                $surf->address = $address;
                                $surf->city = $city;
                                $surf->country = $country;
                                $surf->zip = $zip;
                                $surf->description = $description;
                                $surf->url = $url;
                                $surf->picture = $thumb;
                                $surf->startdate  = $startdate ;
                                $surf->enddate = $enddate;

                                // Storing additional data from surfsData
                                $surf->surf_category = $surfsData['surfCategory'] ?? null;
                                $surf->board_types = $surfsData['surfTypes'] ?? null;
                                $surf->board_size = $surfsData['surfingSize'] ?? null;
                                $surf->wetsuits = is_array($surfsData['surfWetsuits']) ? implode(', ', $surfsData['surfWetsuits']) : $surfsData['surfWetsuits'];
                                $surf->surf_other = is_array($surfsData['surfOther']) ? implode(', ', $surfsData['surfOther']) : $surfsData['surfOther'];


                                $surf->more_details = is_array($surfsData['moreDetails']) ? implode(', ', $surfsData['moreDetails']) : $surfsData['moreDetails'];



                                $surf->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $surfsimg = new Surfsimg();
                                    $surfsimg->surf_id = $surf->id;
                                    $surfsimg->picture = $largePath;
                                    $surfsimg->picturesmall = $smallPath;
                                    $surfsimg->picturesxlarge = $xlargePath;
                                    $surfsimg->save();
                                }





                break;







            case 'tennis':


                $tennisData = $request->input('data.attributes.tennis');
                Log::info('Tennis Data:', $tennisData);


                                $tennis = new Tennis();
                                $tennis->user_id = $user->id;
                                $tennis->onlinestore_id = $onlinestore_id;

                                $tennis->title = $title;
                                $tennis->price = $price;
                                $tennis->currency = $currency;
                                $tennis->phone = $phone;

                                $tennis->address = $address;
                                $tennis->city = $city;
                                $tennis->country = $country;
                                $tennis->zip = $zip;
                                $tennis->description = $description;
                                $tennis->url = $url;
                                $tennis->picture = $thumb;
                                $tennis->startdate  = $startdate ;
                                $tennis->enddate = $enddate;
                                $tennis->terrain_dimensions = $tennisData['tennisTerrain'] ?? null;
                                $tennis->brand = $tennisData['brandName'] ?? null;
                                $tennis->clothing = is_array($tennisData['clothing']) ? implode(', ', $tennisData['clothing']) : $tennisData['clothing'];


                                $tennis->more_details = is_array($tennisData['moreDetails']) ? implode(', ', $tennisData['moreDetails']) : $tennisData['moreDetails'];


                                $tennis->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $Tennisimg = new Tennisimg();
                                    $Tennisimg->tennis_id = $tennis->id;
                                    $Tennisimg->picture = $largePath;
                                    $Tennisimg->picturesmall = $smallPath;
                                    $Tennisimg->picturesxlarge = $xlargePath;
                                    $Tennisimg->save();
                                }





                break;







            case 'audio':


                $audiosData = $request->input('data.attributes.audios');
                Log::info('Audios Data:', $audiosData);


                                $audio = new Audio();
                                $audio->user_id = $user->id;
                                $audio->onlinestore_id = $onlinestore_id;

                                $audio->title = $title;
                                $audio->price = $price;
                                $audio->currency = $currency;

                                $audio->phone = $phone;

                                $audio->address = $address;
                                $audio->city = $city;
                                $audio->country = $country;
                                $audio->zip = $zip;
                                $audio->description = $description;
                                $audio->url = $url;
                                $audio->picture = $thumb;
                                $audio->startdate  = $startdate ;
                                $audio->enddate = $enddate;


                                // Storing additional data from audiosData
                                $audio->audio_type = $audiosData['audioType'] ?? null;
                                $audio->sound_quality = $audiosData['soundQuality'] ?? null;
                                $audio->connectivity = is_array($audiosData['connectivity']) ? implode(', ', $audiosData['connectivity']) : $audiosData['connectivity'];
                                $audio->max_wireless_range = $audiosData['maxWirelessRange'] ?? null;
                                $audio->battery_life = $audiosData['batteryLife'] ?? null;
                                $audio->charging_time = $audiosData['chargingTime'] ?? null;
                                $audio->condition = $audiosData['condition'] ?? null;
                                $audio->compatibility = is_array($audiosData['compatibility']) ? implode(', ', $audiosData['compatibility']) : $audiosData['compatibility'];


                                $audio->more_details = is_array($audiosData['moreDetails']) ? implode(', ', $audiosData['moreDetails']) : $audiosData['moreDetails'];


                                $audio->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $audiosimg = new Audiosimg();
                                    $audiosimg->audio_id = $audio->id;
                                    $audiosimg->picture = $largePath;
                                    $audiosimg->picturesmall = $smallPath;
                                    $audiosimg->picturesxlarge = $xlargePath;
                                    $audiosimg->save();
                                }





                break;







            case 'cameras':


                $camerasData = $request->input('data.attributes.cameras');
                Log::info('Cameras Data:', $camerasData);




                                $camera = new Camera();
                                $camera->user_id = $user->id;
                                $camera->onlinestore_id = $onlinestore_id;

                                $camera->title = $title;
                                $camera->price = $price;
                                $camera->currency = $currency;

                                $camera->phone = $phone;

                                $camera->address = $address;
                                $camera->city = $city;
                                $camera->country = $country;
                                $camera->zip = $zip;
                                $camera->description = $description;
                                $camera->url = $url;
                                $camera->picture = $thumb;
                                $camera->startdate  = $startdate ;
                                $camera->enddate = $enddate;
                                // Storing additional data from camerasData
                                $camera->photo_size = $camerasData['photoSize'] ?? null;
                                $camera->sensor_size = $camerasData['sensorSize'] ?? null;
                                $camera->image_stabilization = $camerasData['imageStabilization'] ?? null;
                                $camera->shutter_speed = $camerasData['shutterSpeed'] ?? null;
                                $camera->exposure_control = $camerasData['exposureControl'] ?? null;
                                $camera->image_resolution = $camerasData['imageResolution'] ?? null;
                                $camera->condition = $camerasData['condition'] ?? null;
                                $camera->connectivity = is_array($camerasData['connectivity']) ? implode(', ', $camerasData['connectivity']) : $camerasData['connectivity'];
                                $camera->memory = $camerasData['memory'] ?? null;
                                $camera->lens = $camerasData['lens'] ?? null;


                                $camera->more_details = is_array($camerasData['moreDetails']) ? implode(', ', $camerasData['moreDetails']) : $camerasData['moreDetails'];



                                $camera->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $camerasimg = new Camerasimg();
                                    $camerasimg->camera_id = $camera->id;
                                    $camerasimg->picture = $largePath;
                                    $camerasimg->picturesmall = $smallPath;
                                    $camerasimg->picturesxlarge = $xlargePath;
                                    $camerasimg->save();
                                }




                break;






            case 'chargers':


                $chargersData = $request->input('data.attributes.chargers');
                Log::info('Chargers Data:', $chargersData);

                                $charger = new Charger();
                                $charger->user_id = $user->id;
                                $charger->onlinestore_id = $onlinestore_id;

                                $charger->title = $title;
                                $charger->price = $price;
                                $charger->currency = $currency;

                                $charger->phone = $phone;

                                $charger->address = $address;
                                $charger->city = $city;
                                $charger->country = $country;
                                $charger->zip = $zip;
                                $charger->description = $description;
                                $charger->url = $url;
                                $charger->picture = $thumb;
                                $charger->startdate  = $startdate ;
                                $charger->enddate = $enddate;
                                // Storing additional data from chargersData
                                $charger->compatibility = is_array($chargersData['compatibility']) ? implode(', ', $chargersData['compatibility']) : $chargersData['compatibility'];
                                $charger->number_of_ports = $chargersData['numberOfPorts'] ?? null;
                                $charger->length = $chargersData['length'] ?? null;
                                $charger->input_voltage = $chargersData['inputVoltage'] ?? null;
                                $charger->wattage = $chargersData['wattage'] ?? null;
                                $charger->condition = $chargersData['condition'] ?? null;
                                $charger->connector_type = $chargersData['connectorType'] ?? null;
                                $charger->amperage = $chargersData['amperage'] ?? null;


                                $charger->more_details = is_array($chargersData['moreDetails']) ? implode(', ', $chargersData['moreDetails']) : $chargersData['moreDetails'];



                                $charger->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $chargersimg = new Chargersimg();
                                    $chargersimg->charger_id = $charger->id;
                                    $chargersimg->picture = $largePath;
                                    $chargersimg->picturesmall = $smallPath;
                                    $chargersimg->picturesxlarge = $xlargePath;
                                    $chargersimg->save();
                                }






                break;






            case 'drones':



                $dronesData = $request->input('data.attributes.drones');
                Log::info('Drones Data:', $dronesData);

                                $drone = new Drone();
                                $drone->user_id = $user->id;
                                $drone->onlinestore_id = $onlinestore_id;

                                $drone->title = $title;
                                $drone->price = $price;
                                $drone->currency = $currency;

                                $drone->phone = $phone;

                                $drone->address = $address;
                                $drone->city = $city;
                                $drone->country = $country;
                                $drone->zip = $zip;
                                $drone->description = $description;
                                $drone->url = $url;
                                $drone->picture = $thumb;
                                $drone->startdate  = $startdate ;
                                $drone->enddate = $enddate;
                                // Storing additional data from dronesData
                                $drone->flight_time = $dronesData['flightTime'] ?? null;
                                $drone->battery_life = $dronesData['batteryLife'] ?? null;
                                $drone->condition = $dronesData['condition'] ?? null;
                                $drone->video_resolution = $dronesData['videoResolution'] ?? null;
                                $drone->connectivity = is_array($dronesData['connectivity']) ? implode(', ', $dronesData['connectivity']) : $dronesData['connectivity'];
                                $drone->battery_capacity = $dronesData['batteryCapacity'] ?? null;
                                $drone->memory = $dronesData['memory'] ?? null;
                                $drone->image_resolution = $dronesData['imageResolution'] ?? null;
                                $drone->included_components = is_array($dronesData['includedComponents']) ? implode(', ', $dronesData['includedComponents']) : $dronesData['includedComponents'];
                                $drone->remote_control = $dronesData['remoteControl'] ?? null;
                                $drone->max_distance = $dronesData['maxDistance'] ?? null;


                                $drone->more_details = is_array($dronesData['moreDetails']) ? implode(', ', $dronesData['moreDetails']) : $dronesData['moreDetails'];



                                $drone->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $dronesimg = new Dronesimg();
                                    $dronesimg->drone_id = $drone->id;
                                    $dronesimg->picture = $largePath;
                                    $dronesimg->picturesmall = $smallPath;
                                    $dronesimg->picturesxlarge = $xlargePath;
                                    $dronesimg->save();
                                }





                break;









            case 'gaming':



                $gamingsData = $request->input('data.attributes.gamings');
                Log::info('Gamings Data:', $gamingsData);

                                $gaming = new Gaming();
                                $gaming->user_id = $user->id;
                                $gaming->onlinestore_id = $onlinestore_id;

                                $gaming->title = $title;
                                $gaming->price = $price;
                                $gaming->currency = $currency;

                                $gaming->phone = $phone;

                                $gaming->address = $address;
                                $gaming->city = $city;
                                $gaming->country = $country;
                                $gaming->zip = $zip;
                                $gaming->description = $description;
                                $gaming->url = $url;
                                $gaming->picture = $thumb;
                                $gaming->startdate  = $startdate ;
                                $gaming->enddate = $enddate;
                                // Storing additional data from gamingsData
                                $gaming->storage = $gamingsData['storage'] ?? null;
                                $gaming->connectivity = is_array($gamingsData['connectivity']) ? implode(', ', $gamingsData['connectivity']) : $gamingsData['connectivity'];
                                $gaming->ports = is_array($gamingsData['ports']) ? implode(', ', $gamingsData['ports']) : $gamingsData['ports'];
                                $gaming->online_services = $gamingsData['onlineServices'] ?? null;
                                $gaming->condition = $gamingsData['condition'] ?? null;
                                $gaming->games = is_array($gamingsData['games']) ? implode(', ', $gamingsData['games']) : $gamingsData['games'];
                                $gaming->controllers = is_array($gamingsData['controller']) ? implode(', ', $gamingsData['controller']) : $gamingsData['controller'];


                                $gaming->more_details = is_array($gamingsData['moreDetails']) ? implode(', ', $gamingsData['moreDetails']) : $gamingsData['moreDetails'];



                                $gaming->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $gamingsimg = new Gamingsimg();
                                    $gamingsimg->gaming_id = $gaming->id;
                                    $gamingsimg->picture = $largePath;
                                    $gamingsimg->picturesmall = $smallPath;
                                    $gamingsimg->picturesxlarge = $xlargePath;
                                    $gamingsimg->save();
                                }





                break;







            case 'laptops':


                $laptopsData = $request->input('data.attributes.laptops');
                Log::info('Laptops Data:', $laptopsData);

                                $laptop = new Laptop();
                                $laptop->user_id = $user->id;
                                $laptop->onlinestore_id = $onlinestore_id;

                                $laptop->title = $title;
                                $laptop->price = $price;
                                $laptop->currency = $currency;

                                $laptop->phone = $phone;

                                $laptop->address = $address;
                                $laptop->city = $city;
                                $laptop->country = $country;
                                $laptop->zip = $zip;
                                $laptop->description = $description;
                                $laptop->url = $url;
                                $laptop->picture = $thumb;
                                $laptop->startdate  = $startdate ;
                                $laptop->enddate = $enddate;

                                // Storing additional data from laptopsData
                                $laptop->ram = $laptopsData['ram'] ?? null;
                                $laptop->graphics_card = $laptopsData['graphicsCard'] ?? null;
                                $laptop->operating_system = $laptopsData['operatingSystem'] ?? null;
                                $laptop->number_ports = is_array($laptopsData['numberPorts']) ? implode(', ', $laptopsData['numberPorts']) : $laptopsData['numberPorts'];
                                $laptop->battery_life = $laptopsData['batteryLife'] ?? null;
                                $laptop->drive_storage = $laptopsData['storage'] ?? null;
                                $laptop->resolution = $laptopsData['resolution'] ?? null;
                                $laptop->weight = $laptopsData['weight'] ?? null;
                                $laptop->screen_size = $laptopsData['screenSize'] ?? null;
                                $laptop->cpu = $laptopsData['cpu'] ?? null;
                                $laptop->condition = $laptopsData['condition'] ?? null;


                                $laptop->more_details = is_array($laptopsData['moreDetails']) ? implode(', ', $laptopsData['moreDetails']) : $laptopsData['moreDetails'];



                                $laptop->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $laptopsimg = new Laptopsimg();
                                    $laptopsimg->laptop_id = $laptop->id;
                                    $laptopsimg->picture = $largePath;
                                    $laptopsimg->picturesmall = $smallPath;
                                    $laptopsimg->picturesxlarge = $xlargePath;
                                    $laptopsimg->save();
                                }





                break;








            case 'lighting':


                $lightingsData = $request->input('data.attributes.lightings');
                Log::info('Lightings Data:', $lightingsData);


                                $lighting = new Lighting();
                                $lighting->user_id = $user->id;
                                $lighting->onlinestore_id = $onlinestore_id;

                                $lighting->title = $title;
                                $lighting->price = $price;
                                $lighting->currency = $currency;
                                $lighting->phone = $phone;

                                $lighting->address = $address;
                                $lighting->city = $city;
                                $lighting->country = $country;
                                $lighting->zip = $zip;
                                $lighting->description = $description;
                                $lighting->url = $url;
                                $lighting->picture = $thumb;
                                $lighting->startdate  = $startdate ;
                                $lighting->enddate = $enddate;
                                // Storing additional data from lightingsData
                                $lighting->connectivity = is_array($lightingsData['connectivity']) ? implode(', ', $lightingsData['connectivity']) : $lightingsData['connectivity'];
                                $lighting->included_accessories = is_array($lightingsData['includedAccessories']) ? implode(', ', $lightingsData['includedAccessories']) : $lightingsData['includedAccessories'];
                                $lighting->condition = $lightingsData['condition'] ?? null;
                                $lighting->color_temperature = is_array($lightingsData['colorTemperature']) ? implode(', ', $lightingsData['colorTemperature']) : $lightingsData['colorTemperature'];
                                $lighting->compatibility = is_array($lightingsData['compatibility']) ? implode(', ', $lightingsData['compatibility']) : $lightingsData['compatibility'];


                                $lighting->more_details = is_array($lightingsData['moreDetails']) ? implode(', ', $lightingsData['moreDetails']) : $lightingsData['moreDetails'];



                                $lighting->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $lightingsimg = new Lightingsimg();
                                    $lightingsimg->lighting_id = $lighting->id;
                                    $lightingsimg->picture = $largePath;
                                    $lightingsimg->picturesmall = $smallPath;
                                    $lightingsimg->picturesxlarge = $xlargePath;
                                    $lightingsimg->save();
                                }





                break;








            case 'printers':

                $printersData = $request->input('data.attributes.printers');
                Log::info('Printers Data:', $printersData);



                                $printer = new Printer();
                                $printer->user_id = $user->id;
                                $printer->onlinestore_id = $onlinestore_id;

                                $printer->title = $title;
                                $printer->price = $price;
                                $printer->currency = $currency;

                                $printer->phone = $phone;

                                $printer->address = $address;
                                $printer->city = $city;
                                $printer->country = $country;
                                $printer->zip = $zip;
                                $printer->description = $description;
                                $printer->url = $url;
                                $printer->picture = $thumb;
                                $printer->startdate  = $startdate ;
                                $printer->enddate = $enddate;
                                // Storing additional data from printersData
                                $printer->print_speed = $printersData['printSpeed'] ?? null;
                                $printer->print_resolution = is_array($printersData['printResolution']) ? implode(', ', $printersData['printResolution']) : $printersData['printResolution'];
                                $printer->connectivity = is_array($printersData['connectivity']) ? implode(', ', $printersData['connectivity']) : $printersData['connectivity'];
                                $printer->paper_size = is_array($printersData['paperSize']) ? implode(', ', $printersData['paperSize']) : $printersData['paperSize'];
                                $printer->compatible = is_array($printersData['compatibleInk']) ? implode(', ', $printersData['compatibleInk']) : $printersData['compatibleInk'];
                                $printer->condition = $printersData['condition'] ?? null;
                                $printer->input_sheets = $printersData['inputSheets'] ?? null;
                                $printer->print_media = is_array($printersData['printMedia']) ? implode(', ', $printersData['printMedia']) : $printersData['printMedia'];


                                $printer->more_details = is_array($printersData['moreDetails']) ? implode(', ', $printersData['moreDetails']) : $printersData['moreDetails'];



                                $printer->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $printersimg = new Printersimg();
                                    $printersimg->printer_id = $printer->id;
                                    $printersimg->picture = $largePath;
                                    $printersimg->picturesmall = $smallPath;
                                    $printersimg->picturesxlarge = $xlargePath;
                                    $printersimg->save();
                                }




                break;






            case 'routers':


                $routersData = $request->input('data.attributes.routers');
                Log::info('Routers Data:', $routersData);


                                $router = new Router();
                                $router->user_id = $user->id;
                                $router->onlinestore_id = $onlinestore_id;

                                $router->title = $title;
                                $router->price = $price;
                                $router->currency = $currency;

                                $router->phone = $phone;

                                $router->address = $address;
                                $router->city = $city;
                                $router->country = $country;
                                $router->zip = $zip;
                                $router->description = $description;
                                $router->url = $url;
                                $router->picture = $thumb;
                                $router->startdate  = $startdate ;
                                $router->enddate = $enddate;
                                // Storing additional data from routersData
                                $router->gbps_speed = $routersData['gbpsSpeed'] ?? null;
                                $router->wireless = $routersData['wireless'] ?? null;
                                $router->frequency = $routersData['frequency'] ?? null;
                                $router->connectivity = is_array($routersData['connectivity']) ? implode(', ', $routersData['connectivity']) : $routersData['connectivity'];
                                $router->antennas = $routersData['antennas'] ?? null;
                                $router->condition = $routersData['condition'] ?? null;
                                $router->compatible = is_array($routersData['compatible']) ? implode(', ', $routersData['compatible']) : $routersData['compatible'];
                                $router->signal_coverage = $routersData['signalCoverage'] ?? null;


                                $router->more_details = is_array($routersData['moreDetails']) ? implode(', ', $routersData['moreDetails']) : $routersData['moreDetails'];



                                $router->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $routersimg = new Routersimg();
                                    $routersimg->router_id = $router->id;
                                    $routersimg->picture = $largePath;
                                    $routersimg->picturesmall = $smallPath;
                                    $routersimg->picturesxlarge = $xlargePath;
                                    $routersimg->save();
                                }






                break;







            case 'tablets':


                $tablettesData = $request->input('data.attributes.tablettes');
                Log::info('Tablettes Data:', $tablettesData);


                                $tablette = new Tablette();
                                $tablette->user_id = $user->id;
                                $tablette->onlinestore_id = $onlinestore_id;

                                $tablette->title = $title;
                                $tablette->price = $price;
                                $tablette->currency = $currency;

                                $tablette->phone = $phone;

                                $tablette->address = $address;
                                $tablette->city = $city;
                                $tablette->country = $country;
                                $tablette->zip = $zip;
                                $tablette->description = $description;
                                $tablette->url = $url;
                                $tablette->picture = $thumb;
                                $tablette->startdate  = $startdate ;
                                $tablette->enddate = $enddate;
                                // Storing additional data from tablettesData
                                $tablette->operating_system = $tablettesData['operatingSystem'] ?? null;
                                $tablette->ram = $tablettesData['ram'] ?? null;
                                $tablette->storage = $tablettesData['storage'] ?? null;
                                $tablette->display_size = $tablettesData['displaySize'] ?? null;
                                $tablette->display_resolution = $tablettesData['displayResolution'] ?? null;
                                $tablette->connectivity = is_array($tablettesData['connectivity']) ? implode(', ', $tablettesData['connectivity']) : $tablettesData['connectivity'];
                                $tablette->condition = $tablettesData['condition'] ?? null;


                                $tablette->more_details = is_array($tablettesData['moreDetails']) ? implode(', ', $tablettesData['moreDetails']) : $tablettesData['moreDetails'];



                                $tablette->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $tablettesimg = new Tablettesimg();
                                    $tablettesimg->tablette_id = $tablette->id;
                                    $tablettesimg->picture = $largePath;
                                    $tablettesimg->picturesmall = $smallPath;
                                    $tablettesimg->picturesxlarge = $xlargePath;
                                    $tablettesimg->save();
                                }






                break;







            case 'eclairage':


                $eclairagesData = $request->input('data.attributes.eclairages');
                Log::info('Eclairages Data:', $eclairagesData);


                                $eclairage = new Eclairage();
                                $eclairage->user_id = $user->id;
                                $eclairage->onlinestore_id = $onlinestore_id;

                                $eclairage->title = $title;
                                $eclairage->price = $price;
                                $eclairage->currency = $currency;

                                $eclairage->phone = $phone;

                                $eclairage->address = $address;
                                $eclairage->city = $city;
                                $eclairage->country = $country;
                                $eclairage->zip = $zip;
                                $eclairage->description = $description;
                                $eclairage->url = $url;
                                $eclairage->picture = $thumb;
                                $eclairage->startdate  = $startdate ;
                                $eclairage->enddate = $enddate;

                                // Storing additional data from eclairagesData
                                $eclairage->brand_name = $eclairagesData['brandName'] ?? null;
                                $eclairage->size = $eclairagesData['size'] ?? null;
                                $eclairage->voltage = $eclairagesData['voltage'] ?? null;
                                $eclairage->chandeliers = is_array($eclairagesData['chandeliers']) ? implode(', ', $eclairagesData['chandeliers']) : $eclairagesData['chandeliers'];
                                $eclairage->lamps = is_array($eclairagesData['lamps']) ? implode(', ', $eclairagesData['lamps']) : $eclairagesData['lamps'];
                                $eclairage->light_fixtures = is_array($eclairagesData['light']) ? implode(', ', $eclairagesData['light']) : $eclairagesData['light'];
                                $eclairage->projectors = is_array($eclairagesData['projectors']) ? implode(', ', $eclairagesData['projectors']) : $eclairagesData['projectors'];
                                $eclairage->leds = is_array($eclairagesData['led']) ? implode(', ', $eclairagesData['led']) : $eclairagesData['led'];
                                $eclairage->power_source = $eclairagesData['power'] ?? null;
                                $eclairage->light_source = $eclairagesData['lightSourceType'] ?? null;
                                $eclairage->light_color = is_array($eclairagesData['lightColor']) ? implode(', ', $eclairagesData['lightColor']) : $eclairagesData['lightColor'];
                                $eclairage->lighting_method = is_array($eclairagesData['lightingMethod']) ? implode(', ', $eclairagesData['lightingMethod']) : $eclairagesData['lightingMethod'];
                                $eclairage->controller = $eclairagesData['controller'] ?? null;
                                $eclairage->other = is_array($eclairagesData['other']) ? implode(', ', $eclairagesData['other']) : $eclairagesData['other'];


                                $eclairage->more_details = is_array($eclairagesData['moreDetails']) ? implode(', ', $eclairagesData['moreDetails']) : $eclairagesData['moreDetails'];



                                $eclairage->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $eclairagesimg = new Eclairagesimg();
                                    $eclairagesimg->eclairage_id = $eclairage->id;
                                    $eclairagesimg->picture = $largePath;
                                    $eclairagesimg->picturesmall = $smallPath;
                                    $eclairagesimg->picturesxlarge = $xlargePath;
                                    $eclairagesimg->save();
                                }





                break;







            case 'mobilier':


                $mobiliersData = $request->input('data.attributes.mobiliers');
                Log::info('Mobiliers Data:', $mobiliersData);


                                $mobilier = new Mobilier();
                                $mobilier->user_id = $user->id;
                                $mobilier->onlinestore_id = $onlinestore_id;

                                $mobilier->title = $title;
                                $mobilier->price = $price;
                                $mobilier->currency = $currency;


                                $mobilier->phone = $phone;

                                $mobilier->address = $address;
                                $mobilier->city = $city;
                                $mobilier->country = $country;
                                $mobilier->zip = $zip;
                                $mobilier->description = $description;
                                $mobilier->url = $url;
                                $mobilier->picture = $thumb;
                                $mobilier->startdate  = $startdate ;
                                $mobilier->enddate = $enddate;
                                // Storing additional data from mobiliersData
                                $mobilier->material = is_array($mobiliersData['material']) ? implode(', ', $mobiliersData['material']) : $mobiliersData['material'];
                                $mobilier->theme = $mobiliersData['theme'] ?? null;
                                $mobilier->plant_decorations = is_array($mobiliersData['plantDecorations']) ? implode(', ', $mobiliersData['plantDecorations']) : $mobiliersData['plantDecorations'];
                                $mobilier->light_decorations = is_array($mobiliersData['lightDecorations']) ? implode(', ', $mobiliersData['lightDecorations']) : $mobiliersData['lightDecorations'];
                                $mobilier->festive_decorations = $mobiliersData['festiveDecorations'] ?? null;
                                $mobilier->others = is_array($mobiliersData['otherEquipment']) ? implode(', ', $mobiliersData['otherEquipment']) : $mobiliersData['otherEquipment'];


                                $mobilier->more_details = is_array($mobiliersData['moreDetails']) ? implode(', ', $mobiliersData['moreDetails']) : $mobiliersData['moreDetails'];



                                $mobilier->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $mobiliersimg = new Mobiliersimg();
                                    $mobiliersimg->mobilier_id = $mobilier->id;
                                    $mobiliersimg->picture = $largePath;
                                    $mobiliersimg->picturesmall = $smallPath;
                                    $mobiliersimg->picturesxlarge = $xlargePath;
                                    $mobiliersimg->save();
                                }





                break;







            case 'photography':


                $photographiesData = $request->input('data.attributes.photographies');
                Log::info('Photographies Data:', $photographiesData);

                                $photographie = new Photographie();
                                $photographie->user_id = $user->id;
                                $photographie->onlinestore_id = $onlinestore_id;

                                $photographie->title = $title;
                                $photographie->price = $price;
                                $photographie->currency = $currency;


                                $photographie->phone = $phone;

                                $photographie->address = $address;
                                $photographie->city = $city;
                                $photographie->country = $country;
                                $photographie->zip = $zip;
                                $photographie->description = $description;
                                $photographie->url = $url;
                                $photographie->picture = $thumb;
                                $photographie->startdate  = $startdate ;
                                $photographie->enddate = $enddate;
                                // Storing additional data from photographiesData
                                $photographie->size = $photographiesData['size'] ?? null;
                                $photographie->battery = $photographiesData['battery'] ?? null;
                                $photographie->brand_name = $photographiesData['brand'] ?? null;
                                $photographie->camera = is_array($photographiesData['camera']) ? implode(', ', $photographiesData['camera']) : $photographiesData['camera'];
                                $photographie->sensor = is_array($photographiesData['sensor']) ? implode(', ', $photographiesData['sensor']) : $photographiesData['sensor'];
                                $photographie->angle = is_array($photographiesData['wideAngle']) ? implode(', ', $photographiesData['wideAngle']) : $photographiesData['wideAngle'];
                                $photographie->lcd = is_array($photographiesData['lcd']) ? implode(', ', $photographiesData['lcd']) : $photographiesData['lcd'];
                                $photographie->other_equipment = is_array($photographiesData['otherEquipment']) ? implode(', ', $photographiesData['otherEquipment']) : $photographiesData['otherEquipment'];


                                $photographie->more_details = is_array($photographiesData['moreDetails']) ? implode(', ', $photographiesData['moreDetails']) : $photographiesData['moreDetails'];


                                $photographie->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $photographiesimg = new Photographiesimg();
                                    $photographiesimg->photographie_id = $photographie->id;
                                    $photographiesimg->picture = $largePath;
                                    $photographiesimg->picturesmall = $smallPath;
                                    $photographiesimg->picturesxlarge = $xlargePath;
                                    $photographiesimg->save();
                                }





                break;






            case 'sound-systems':


                $sonorisationsData = $request->input('data.attributes.sonorisations');
                Log::info('Sonorisations Data:', $sonorisationsData);



                                $sonorisation = new Sonorisation();
                                $sonorisation->user_id = $user->id;
                                $sonorisation->onlinestore_id = $onlinestore_id;

                                $sonorisation->title = $title;
                                $sonorisation->price = $price;
                                $sonorisation->currency = $currency;

                                $sonorisation->phone = $phone;

                                $sonorisation->address = $address;
                                $sonorisation->city = $city;
                                $sonorisation->country = $country;
                                $sonorisation->zip = $zip;
                                $sonorisation->description = $description;
                                $sonorisation->url = $url;
                                $sonorisation->picture = $thumb;
                                $sonorisation->startdate  = $startdate ;
                                $sonorisation->enddate = $enddate;
                                // Storing additional data from sonorisationsData
                                $sonorisation->brand_name = $sonorisationsData['brand'] ?? null;
                                $sonorisation->size = $sonorisationsData['size'] ?? null;
                                $sonorisation->connectivity = $sonorisationsData['connectivityTechnology'] ?? null;
                                $sonorisation->fastener_type = $sonorisationsData['fastenerType'] ?? null;
                                $sonorisation->power_source = $sonorisationsData['powerSource'] ?? null;
                                $sonorisation->output_power = $sonorisationsData['outputPower'] ?? null;
                                $sonorisation->number_of_channels = $sonorisationsData['numberOfChannels'] ?? null;
                                $sonorisation->compatibility = $sonorisationsData['deviceCompatibility'] ?? null;
                                $sonorisation->power_watts = $sonorisationsData['powerInWatts'] ?? null;
                                $sonorisation->power_type = is_array($sonorisationsData['powerType']) ? implode(', ', $sonorisationsData['powerType']) : $sonorisationsData['powerType'];
                                $sonorisation->battery = is_array($sonorisationsData['battery']) ? implode(', ', $sonorisationsData['battery']) : $sonorisationsData['battery'];
                                $sonorisation->weight = $sonorisationsData['weight'] ?? null;
                                $sonorisation->microphone = is_array($sonorisationsData['microphone']) ? implode(', ', $sonorisationsData['microphone']) : $sonorisationsData['microphone'];
                                $sonorisation->mixage_table = $sonorisationsData['mixageTable'] ?? null;
                                $sonorisation->amplifier = $sonorisationsData['amplifier'] ?? null;
                                $sonorisation->cables_connectors = is_array($sonorisationsData['cablesAndConnectors']) ? implode(', ', $sonorisationsData['cablesAndConnectors']) : $sonorisationsData['cablesAndConnectors'];
                                $sonorisation->speaker = is_array($sonorisationsData['speaker']) ? implode(', ', $sonorisationsData['speaker']) : $sonorisationsData['speaker'];


                                $sonorisation->more_details = is_array($sonorisationsData['moreDetails']) ? implode(', ', $sonorisationsData['moreDetails']) : $sonorisationsData['moreDetails'];



                                $sonorisation->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $sonorisationsimg = new Sonorisationsimg();
                                    $sonorisationsimg->sonorisation_id = $sonorisation->id;
                                    $sonorisationsimg->picture = $largePath;
                                    $sonorisationsimg->picturesmall = $smallPath;
                                    $sonorisationsimg->picturesxlarge = $xlargePath;
                                    $sonorisationsimg->save();
                                }






                break;







            case 'tents':


                $tentesData = $request->input('data.attributes.tentes');
                Log::info('Tentes Data:', $tentesData);


                                $tente = new Tente();
                                $tente->user_id = $user->id;
                                $tente->onlinestore_id = $onlinestore_id;

                                $tente->title = $title;
                                $tente->price = $price;
                                $tente->currency = $currency;

                                $tente->phone = $phone;

                                $tente->address = $address;
                                $tente->city = $city;
                                $tente->country = $country;
                                $tente->zip = $zip;
                                $tente->description = $description;
                                $tente->url = $url;
                                $tente->picture = $thumb;
                                $tente->startdate  = $startdate ;
                                $tente->enddate = $enddate;
                                $tente->material = $tentesData['material'] ?? null;
                                $tente->style = $tentesData['style'] ?? null;
                                $tente->fabric_type = $tentesData['fabric'] ?? null;
                                $tente->otherEquipment = is_array($tentesData['otherEquipment']) ? implode(', ', $tentesData['otherEquipment']) : $tentesData['otherEquipment'];


                                $tente->more_details = is_array($tentesData['moreDetails']) ? implode(', ', $tentesData['moreDetails']) : $tentesData['moreDetails'];



                                $tente->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $tentesimg = new Tentesimg();
                                    $tentesimg->tente_id = $tente->id;
                                    $tentesimg->picture = $largePath;
                                    $tentesimg->picturesmall = $smallPath;
                                    $tentesimg->picturesxlarge = $xlargePath;
                                    $tentesimg->save();
                                }





                break;






            case 'clothes':



                $clothesData = $request->input('data.attributes.clothes');
                Log::info('Clothes Data:', $clothesData);



                                $clothes = new Clothes();
                                $clothes->user_id = $user->id;
                                $clothes->onlinestore_id = $onlinestore_id;

                                $clothes->title = $title;
                                $clothes->price = $price;
                                $clothes->currency = $currency;

                                $clothes->phone = $phone;

                                $clothes->address = $address;
                                $clothes->city = $city;
                                $clothes->country = $country;
                                $clothes->zip = $zip;
                                $clothes->description = $description;
                                $clothes->url = $url;
                                $clothes->picture = $thumb;
                                $clothes->startdate  = $startdate ;
                                $clothes->enddate = $enddate;
                                // Storing additional data from clothesData
                                $clothes->number_of_pieces = $clothesData['numberOfPieces'] ?? null;
                                $clothes->closure_type = $clothesData['closureType'] ?? null;
                                $clothes->strap_type = is_array($clothesData['strapType']) ? implode(', ', $clothesData['strapType']) : $clothesData['strapType'];
                                $clothes->number_of_pockets = $clothesData['numberOfPockets'] ?? null;
                                $clothes->heel_height = $clothesData['heelHeight'] ?? null;
                                $clothes->condition = $clothesData['condition'] ?? null;
                                $clothes->color = $clothesData['color'] ?? null;


                                $clothes->more_details = is_array($clothesData['moreDetails']) ? implode(', ', $clothesData['moreDetails']) : $clothesData['moreDetails'];



                                $clothes->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $clothessimg = new Clothesimg();
                                    $clothessimg->clothes_id = $clothes->id;
                                    $clothessimg->picture = $largePath;
                                    $clothessimg->picturesmall = $smallPath;
                                    $clothessimg->picturesxlarge = $xlargePath;
                                    $clothessimg->save();
                                }





                break;







            case 'jewelry':


                $jewelrysData = $request->input('data.attributes.jewelrys');
                Log::info('Jewelrys Data:', $jewelrysData);



                                $jewelry = new Jewelry();
                                $jewelry->user_id = $user->id;
                                $jewelry->onlinestore_id = $onlinestore_id;

                                $jewelry->title = $title;
                                $jewelry->price = $price;
                                $jewelry->currency = $currency;

                                $jewelry->phone = $phone;

                                $jewelry->address = $address;
                                $jewelry->city = $city;
                                $jewelry->country = $country;
                                $jewelry->zip = $zip;
                                $jewelry->description = $description;
                                $jewelry->url = $url;
                                $jewelry->picture = $thumb;
                                $jewelry->startdate  = $startdate ;
                                $jewelry->enddate = $enddate;
                                // Storing additional data from jewelrysData
                                $jewelry->type = $jewelrysData['type'] ?? null;
                                $jewelry->materials = $jewelrysData['material'] ?? null;
                                $jewelry->occasion = $jewelrysData['occasion'] ?? null;
                                $jewelry->chain_type = $jewelrysData['chainType'] ?? null;
                                $jewelry->gem_type = $jewelrysData['gemType'] ?? null;
                                $jewelry->color = $jewelrysData['color'] ?? null;
                                $jewelry->closure_type = is_array($jewelrysData['closureType']) ? implode(', ', $jewelrysData['closureType']) : $jewelrysData['closureType'];
                                $jewelry->condition = $jewelrysData['condition'] ?? null;


                                $jewelry->more_details = is_array($jewelrysData['moreDetails']) ? implode(', ', $jewelrysData['moreDetails']) : $jewelrysData['moreDetails'];



                                $jewelry->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $jewelrysimg = new Jewelrysimg();
                                    $jewelrysimg->jewelry_id = $jewelry->id;
                                    $jewelrysimg->picture = $largePath;
                                    $jewelrysimg->picturesmall = $smallPath;
                                    $jewelrysimg->picturesxlarge = $xlargePath;
                                    $jewelrysimg->save();
                                }





                break;






            case 'apartments':


                $apartmentsData = $request->input('data.attributes.apartments');
                Log::info('Apartments Data:', $apartmentsData);



                                $apartment = new Apartment();
                                $apartment->user_id = $user->id;
                                $apartment->onlinestore_id = $onlinestore_id;

                                $apartment->title = $title;
                                $apartment->price = $price;
                                $apartment->currency = $currency;

                                $apartment->phone = $phone;

                                $apartment->address = $address;
                                $apartment->city = $city;
                                $apartment->country = $country;
                                $apartment->zip = $zip;
                                $apartment->description = $description;
                                $apartment->url = $url;
                                $apartment->picture = $thumb;
                                $apartment->startdate  = $startdate ;
                                $apartment->enddate = $enddate;

                                                                // Storing additional data from apartmentsData
                                $apartment->rooms = $apartmentsData['rooms'] ?? null;
                                $apartment->living_rooms = $apartmentsData['livingRooms'] ?? null;
                                $apartment->bathrooms = $apartmentsData['bathrooms'] ?? null;
                                $apartment->bedrooms = $apartmentsData['bedrooms'] ?? null;
                                $apartment->security_system = is_array($apartmentsData['securitySystem']) ? implode(', ', $apartmentsData['securitySystem']) : $apartmentsData['securitySystem'];
                                $apartment->equipped_kitchen = is_array($apartmentsData['kitchen']) ? implode(', ', $apartmentsData['kitchen']) : $apartmentsData['kitchen'];
                                $apartment->service = is_array($apartmentsData['service']) ? implode(', ', $apartmentsData['service']) : $apartmentsData['service'];
                                $apartment->facilities = is_array($apartmentsData['facilities']) ? implode(', ', $apartmentsData['facilities']) : $apartmentsData['facilities'];


                                $apartment->more_details = is_array($apartmentsData['moreDetails']) ? implode(', ', $apartmentsData['moreDetails']) : $apartmentsData['moreDetails'];



                                $apartment->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $apartmentsimg = new Apartmentsimg();
                                    $apartmentsimg->apartment_id = $apartment->id;
                                    $apartmentsimg->picture = $largePath;
                                    $apartmentsimg->picturesmall = $smallPath;
                                    $apartmentsimg->picturesxlarge = $xlargePath;
                                    $apartmentsimg->save();
                                }





                break;







            case 'offices':




                $bureauxsData = $request->input('data.attributes.bureauxs');
                Log::info('Bureauxs Data:', $bureauxsData);


                                $bureaux = new Bureaux();
                                $bureaux->user_id = $user->id;
                                $bureaux->onlinestore_id = $onlinestore_id;

                                $bureaux->title = $title;
                                $bureaux->price = $price;
                                $bureaux->currency = $currency;

                                $bureaux->phone = $phone;

                                $bureaux->address = $address;
                                $bureaux->city = $city;
                                $bureaux->country = $country;
                                $bureaux->zip = $zip;
                                $bureaux->description = $description;
                                $bureaux->url = $url;
                                $bureaux->picture = $thumb;
                                $bureaux->startdate  = $startdate ;
                                $bureaux->enddate = $enddate;
                                // Storing additional data from bureauxsData
                                $bureaux->property_type = $bureauxsData['propertyType'] ?? null;
                                $bureaux->security = is_array($bureauxsData['security']) ? implode(', ', $bureauxsData['security']) : $bureauxsData['security'];
                                $bureaux->soil_type = is_array($bureauxsData['soilType']) ? implode(', ', $bureauxsData['soilType']) : $bureauxsData['soilType'];
                                $bureaux->parking = $bureauxsData['parking'] ?? null;
                                $bureaux->bathrooms = $bureauxsData['bathrooms'] ?? null;
                                $bureaux->conference_room = $bureauxsData['conferenceRoom'] ?? null;
                                $bureaux->building_size = $bureauxsData['buildingSize'] ?? null;
                                $bureaux->capacity = $bureauxsData['capacity'] ?? null;
                                $bureaux->bail_type = $bureauxsData['bailType'] ?? null;
                                $bureaux->security_deposit = $bureauxsData['securityDeposit'] ?? null;
                                $bureaux->office_taxes = $bureauxsData['officeTaxes'] ?? null;
                                $bureaux->facilities = is_array($bureauxsData['facilities']) ? implode(', ', $bureauxsData['facilities']) : $bureauxsData['facilities'];
                                $bureaux->amenities = is_array($bureauxsData['amenities']) ? implode(', ', $bureauxsData['amenities']) : $bureauxsData['amenities'];
                                $bureaux->services = is_array($bureauxsData['services']) ? implode(', ', $bureauxsData['services']) : $bureauxsData['services'];


                                $bureaux->more_details = is_array($bureauxsData['moreDetails']) ? implode(', ', $bureauxsData['moreDetails']) : $bureauxsData['moreDetails'];



                                $bureaux->save();


                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $bureauxsimg = new Bureauxsimg();
                                    $bureauxsimg->bureaux_id = $bureaux->id;
                                    $bureauxsimg->picture = $largePath;
                                    $bureauxsimg->picturesmall = $smallPath;
                                    $bureauxsimg->picturesxlarge = $xlargePath;
                                    $bureauxsimg->save();
                                }






                break;






            case 'shops':


                $magasinsData = $request->input('data.attributes.magasins');
                Log::info('Magasins Data:', $magasinsData);


                                $magasin = new Magasin();
                                $magasin->user_id = $user->id;
                                $magasin->onlinestore_id = $onlinestore_id;

                                $magasin->title = $title;
                                $magasin->price = $price;
                                $magasin->currency = $currency;

                                $magasin->phone = $phone;

                                $magasin->address = $address;
                                $magasin->city = $city;
                                $magasin->country = $country;
                                $magasin->zip = $zip;
                                $magasin->description = $description;
                                $magasin->url = $url;
                                $magasin->picture = $thumb;
                                $magasin->startdate  = $startdate ;
                                $magasin->enddate = $enddate;
                                // Storing additional data from magasinsData
                                $magasin->property_type = $magasinsData['propertyType'] ?? null;
                                $magasin->surface_area = $magasinsData['surfaceArea'] ?? null;
                                $magasin->capacity = $magasinsData['capacity'] ?? null;
                                $magasin->offices_number = $magasinsData['officeNumber'] ?? null;
                                $magasin->individual_offices = $magasinsData['individualOffices'] ?? null;
                                $magasin->floors = $magasinsData['numberOfFloors'] ?? null;
                                $magasin->garage = $magasinsData['garage'] ?? null;
                                $magasin->approved_uses = is_array($magasinsData['approvedUses']) ? implode(', ', $magasinsData['approvedUses']) : $magasinsData['approvedUses'];
                                $magasin->facility_size = is_array($magasinsData['totalFacilitySize']) ? implode(', ', $magasinsData['totalFacilitySize']) : $magasinsData['totalFacilitySize'];
                                $magasin->operating_days = is_array($magasinsData['operatingDays']) ? implode(', ', $magasinsData['operatingDays']) : $magasinsData['operatingDays'];

                                $magasin->facilities = is_array($magasinsData['facilities']) ? implode(', ', $magasinsData['facilities']) : $magasinsData['facilities'];
                                $magasin->amenities = is_array($magasinsData['amenities']) ? implode(', ', $magasinsData['amenities']) : $magasinsData['amenities'];


                                $magasin->more_details = is_array($magasinsData['moreDetails']) ? implode(', ', $magasinsData['moreDetails']) : $magasinsData['moreDetails'];



                                $magasin->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $magasinsimg = new Magasinsimg();
                                    $magasinsimg->magasin_id = $magasin->id;
                                    $magasinsimg->picture = $largePath;
                                    $magasinsimg->picturesmall = $smallPath;
                                    $magasinsimg->picturesxlarge = $xlargePath;
                                    $magasinsimg->save();
                                }





                break;






            case 'houses':




                $maisonsData = $request->input('data.attributes.maisons');
                Log::info('Maisons Data:', $maisonsData);

                                $maison = new Maison();
                                $maison->user_id = $user->id;
                                $maison->onlinestore_id = $onlinestore_id;

                                $maison->title = $title;
                                $maison->price = $price;
                                $maison->currency = $currency;

                                $maison->phone = $phone;

                                $maison->address = $address;
                                $maison->city = $city;
                                $maison->country = $country;
                                $maison->zip = $zip;
                                $maison->description = $description;
                                $maison->url = $url;
                                $maison->picture = $thumb;
                                $maison->startdate  = $startdate ;
                                $maison->enddate = $enddate;
                                // Storing additional data from maisonsData
                                $maison->security_system = is_array($maisonsData['securitySystem']) ? implode(', ', $maisonsData['securitySystem']) : $maisonsData['securitySystem'];
                                $maison->rooms = $maisonsData['rooms'] ?? null;
                                $maison->living_rooms = $maisonsData['livingRooms'] ?? null;
                                $maison->bedrooms = $maisonsData['bedrooms'] ?? null;
                                $maison->bathrooms = $maisonsData['bathrooms'] ?? null;
                                $maison->floors = $maisonsData['floors'] ?? null;
                                $maison->amenities = is_array($maisonsData['amenities']) ? implode(', ', $maisonsData['amenities']) : $maisonsData['amenities'];
                                $maison->facilities = is_array($maisonsData['facilities']) ? implode(', ', $maisonsData['facilities']) : $maisonsData['facilities'];


                                $maison->more_details = is_array($maisonsData['moreDetails']) ? implode(', ', $maisonsData['moreDetails']) : $maisonsData['moreDetails'];



                                $maison->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $maisonsimg = new Maisonsimg();
                                    $maisonsimg->maison_id = $maison->id;
                                    $maisonsimg->picture = $largePath;
                                    $maisonsimg->picturesmall = $smallPath;
                                    $maisonsimg->picturesxlarge = $xlargePath;
                                    $maisonsimg->save();
                                }




                break;






            case 'riads':




                $riadsData = $request->input('data.attributes.riads');
                Log::info('Riads Data:', $riadsData);


                                $riad = new Riad();
                                $riad->user_id = $user->id;
                                $riad->onlinestore_id = $onlinestore_id;

                                $riad->title = $title;
                                $riad->price = $price;
                                $riad->currency = $currency;

                                $riad->phone = $phone;

                                $riad->address = $address;
                                $riad->city = $city;
                                $riad->country = $country;
                                $riad->zip = $zip;
                                $riad->description = $description;
                                $riad->url = $url;
                                $riad->picture = $thumb;
                                $riad->startdate  = $startdate ;
                                $riad->enddate = $enddate;
                                // Storing additional data from riadsData
                                $riad->entire_home = $riadsData['entire_home'] ?? null;
                                $riad->doorkeeper = $riadsData['doorkeeper'] ?? null;
                                $riad->security_system = is_array($riadsData['securitySystem']) ? implode(', ', $riadsData['securitySystem']) : $riadsData['securitySystem'];
                                $riad->equipped_kitchen = $riadsData['equipped_kitchen'] ?? null;
                                $riad->wifi = $riadsData['wifi'] ?? null;
                                $riad->tv = $riadsData['tv'] ?? null;
                                $riad->heating = $riadsData['heating'] ?? null;
                                $riad->furniture = $riadsData['furniture'] ?? null;
                                $riad->air_conditioner = $riadsData['air_conditioner'] ?? null;
                                $riad->washing_machine = $riadsData['washing_machine'] ?? null;
                                $riad->pool = $riadsData['pool'] ?? null;
                                $riad->rooms = $riadsData['rooms'] ?? null;
                                $riad->living_rooms = $riadsData['livingRooms'] ?? null;
                                $riad->surface = $riadsData['surface'] ?? null;

                                $riad->bedrooms = $riadsData['bedrooms'] ?? null;
                                $riad->bathrooms = $riadsData['bathrooms'] ?? null;
                                $riad->garden = $riadsData['garden'] ?? null;
                                $riad->terrace = $riadsData['terrace'] ?? null;
                                $riad->housekeeping = $riadsData['housekeeping'] ?? null;
                                $riad->dishwasher = $riadsData['dishwasher'] ?? null;
                                $riad->barbecue = $riadsData['barbecue'] ?? null;
                                $riad->refrigerator = $riadsData['refrigerator'] ?? null;
                                $riad->microwave = $riadsData['microwave'] ?? null;
                                $riad->private_entrance = $riadsData['private_entrance'] ?? null;
                                $riad->hammam = $riadsData['hammam'] ?? null;
                                $riad->jacuzzi = $riadsData['jacuzzi'] ?? null;
                                $riad->gym = $riadsData['gym'] ?? null;

                                $riad->restaurant = $riadsData['restaurant'] ?? null;
                                $riad->spa = $riadsData['spa'] ?? null;



                                $riad->more_details = is_array($riadsData['moreDetails']) ? implode(', ', $riadsData['moreDetails']) : $riadsData['moreDetails'];



                                $riad->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $riadsimg = new Riadsimg();
                                    $riadsimg->riad_id = $riad->id;
                                    $riadsimg->picture = $largePath;
                                    $riadsimg->picturesmall = $smallPath;
                                    $riadsimg->picturesxlarge = $xlargePath;
                                    $riadsimg->save();
                                }





                break;





            case 'lands':



                $terrainsData = $request->input('data.attributes.terrains');
                Log::info('Terrains Data:', $terrainsData);


                                $terrain = new Terrain();
                                $terrain->user_id = $user->id;
                                $terrain->onlinestore_id = $onlinestore_id;

                                $terrain->title = $title;
                                $terrain->price = $price;
                                $terrain->currency = $currency;

                                $terrain->phone = $phone;

                                $terrain->address = $address;
                                $terrain->city = $city;
                                $terrain->country = $country;
                                $terrain->zip = $zip;
                                $terrain->description = $description;
                                $terrain->url = $url;
                                $terrain->picture = $thumb;
                                $terrain->startdate  = $startdate ;
                                $terrain->enddate = $enddate;
                                $terrain->property_type = $terrainsData['propertyType'] ?? null;
                                $terrain->property_subtype = $terrainsData['propertySubtype'] ?? null;
                                $terrain->total_lot_size = $terrainsData['totalLotSize'] ?? null;
                                $terrain->land_valuation = $terrainsData['landValuation'] ?? null;
                                $terrain->total_rating = $terrainsData['totalRating'] ?? null;
                                $terrain->road_access = $terrainsData['roadAccess'] ?? null;
                                $terrain->slope_description = $terrainsData['slopeDescription'] ?? null;
                                $terrain->property_usage = $terrainsData['propertyUsage'] ?? null;
                                $terrain->annual_taxes = $terrainsData['annualTaxes'] ?? null;
                                $terrain->deeded_acres = $terrainsData['deededAcres'] ?? null;
                                $terrain->leased_acres = $terrainsData['leasedAcres'] ?? null;
                                $terrain->elevation = $terrainsData['elevation'] ?? null;
                                $terrain->vegetation = $terrainsData['vegetation'] ?? null;
                                $terrain->nearby_usage = is_array($terrainsData['nearbyUsage']) ? implode(', ', $terrainsData['nearbyUsage']) : $terrainsData['nearbyUsage'];
                                $terrain->topography = is_array($terrainsData['topography']) ? implode(', ', $terrainsData['topography']) : $terrainsData['topography'];
                                $terrain->zoning = $terrainsData['zoning'] ?? null;

                                $terrain->more_details = is_array($terrainsData['moreDetails']) ? implode(', ', $terrainsData['moreDetails']) : $terrainsData['moreDetails'];



                                $terrain->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $terrainsimg = new Terrainsimg();
                                    $terrainsimg->terrain_id = $terrain->id;
                                    $terrainsimg->picture = $largePath;
                                    $terrainsimg->picturesmall = $smallPath;
                                    $terrainsimg->picturesxlarge = $xlargePath;
                                    $terrainsimg->save();
                                }





                break;







            case 'villas':




                $villasData = $request->input('data.attributes.villas');
                Log::info('Villas Data:', $villasData);

                                $villa = new Villa();
                                $villa->user_id = $user->id;
                                $villa->onlinestore_id = $onlinestore_id;

                                $villa->title = $title;
                                $villa->price = $price;
                                $villa->currency = $currency;

                                $villa->phone = $phone;

                                $villa->address = $address;
                                $villa->city = $city;
                                $villa->country = $country;
                                $villa->zip = $zip;
                                $villa->description = $description;
                                $villa->url = $url;
                                $villa->picture = $thumb;
                                $villa->startdate  = $startdate ;
                                $villa->enddate = $enddate;
                                $villa->rooms = $villasData['rooms'] ?? null;
                                $villa->living_rooms = $villasData['livingRooms'] ?? null;
                                $villa->bedrooms = $villasData['bedrooms'] ?? null;
                                $villa->bathrooms = $villasData['bathrooms'] ?? null;
                                $villa->view = $villasData['view'] ?? null;
                                $villa->security_system = is_array($villasData['securitySystem']) ? implode(', ', $villasData['securitySystem']) : $villasData['securitySystem'];
                                $villa->facilities = is_array($villasData['facilities']) ? implode(', ', $villasData['facilities']) : $villasData['facilities'];
                                $villa->amenities = is_array($villasData['amenities']) ? implode(', ', $villasData['amenities']) : $villasData['amenities'];
                                $villa->services = is_array($villasData['services']) ? implode(', ', $villasData['services']) : $villasData['services'];

                                $villa->more_details = is_array($villasData['moreDetails']) ? implode(', ', $villasData['moreDetails']) : $villasData['moreDetails'];



                                $villa->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $villasimg = new Villasimg();
                                    $villasimg->villa_id = $villa->id;
                                    $villasimg->picture = $largePath;
                                    $villasimg->picturesmall = $smallPath;
                                    $villasimg->picturesxlarge = $xlargePath;
                                    $villasimg->save();
                                }





                break;






            case 'activities':



                $activitiesData = $request->input('data.attributes.activities');


                                $activity = new Activity();
                                $activity->user_id = $user->id;
                                $activity->onlinestore_id = $onlinestore_id;

                                $activity->title = $title;
                                $activity->price = $price;
                                $activity->currency = $currency;

                                $activity->phone = $phone;

                                $activity->address = $address;
                                $activity->city = $city;
                                $activity->country = $country;
                                $activity->zip = $zip;
                                $activity->description = $description;
                                $activity->url = $url;
                                $activity->picture = $thumb;
                                $activity->startdate  = $startdate ;
                                $activity->enddate = $enddate;
                                $activity->type = $activitiesData['type'] ?? null;
                                $activity->equipment = is_array($activitiesData['equipment']) ? implode(', ', $activitiesData['equipment']) : $activitiesData['equipment'];
                                $activity->age_requirement = $activitiesData['ageRequirement'] ?? null;
                                $activity->duration = $activitiesData['duration'] ?? null;



                                $activity->language = is_array($activitiesData['language']) ? implode(', ', $activitiesData['language']) : $activitiesData['language'];

                                $activity->cancellation = $activitiesData['cancellation'] ?? null;
                                $activity->safety_equipment = is_array($activitiesData['safetyEquipment']) ? implode(', ', $activitiesData['safetyEquipment']) : $activitiesData['safetyEquipment'];
                                $activity->monitor = $activitiesData['monitor'] ?? null;

                                $activity->more_details = is_array($activitiesData['moreDetails']) ? implode(', ', $activitiesData['moreDetails']) : $activitiesData['moreDetails'];



                                $activity->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $activitiesimg = new Activitiesimg();
                                    $activitiesimg->activity_id = $activity->id;
                                    $activitiesimg->picture = $largePath;
                                    $activitiesimg->picturesmall = $smallPath;
                                    $activitiesimg->picturesxlarge = $xlargePath;
                                    $activitiesimg->save();
                                }





                break;






            case 'books':




                $livresData = $request->input('data.attributes.livres');
                Log::info('Livres Data:', $livresData);



                                $livre = new Livre();
                                $livre->user_id = $user->id;
                                $livre->onlinestore_id = $onlinestore_id;

                                $livre->title = $title;
                                $livre->price = $price;
                                $livre->currency = $currency;

                                $livre->phone = $phone;

                                $livre->address = $address;
                                $livre->city = $city;
                                $livre->country = $country;
                                $livre->zip = $zip;
                                $livre->description = $description;
                                $livre->url = $url;
                                $livre->picture = $thumb;
                                $livre->startdate  = $startdate ;
                                $livre->enddate = $enddate;

                                // Storing additional data from livresData
                                $livre->genre = $livresData['genre'] ?? null;
                                $livre->type = $livresData['type'] ?? null;
                                $livre->language = is_array($livresData['language']) ? implode(', ', $livresData['language']) : $livresData['language'];
                                $livre->format = $livresData['format'] ?? null;
                                $livre->duration = is_array($livresData['duration']) ? implode(', ', $livresData['duration']) : $livresData['duration'];

                                $livre->more_details = is_array($livresData['moreDetails']) ? implode(', ', $livresData['moreDetails']) : $livresData['moreDetails'];


                                $livre->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $livresimg = new Livresimg();
                                    $livresimg->livre_id = $livre->id;
                                    $livresimg->picture = $largePath;
                                    $livresimg->picturesmall = $smallPath;
                                    $livresimg->picturesxlarge = $xlargePath;
                                    $livresimg->save();
                                }




                break;






            case 'musical':




                $musicalsData = $request->input('data.attributes.musicals');
                Log::info('Musicals Data:', $musicalsData);



                                $musical = new Musical();
                                $musical->user_id = $user->id;
                                $musical->onlinestore_id = $onlinestore_id;

                                $musical->title = $title;
                                $musical->price = $price;
                                $musical->currency = $currency;

                                $musical->phone = $phone;

                                $musical->address = $address;
                                $musical->city = $city;
                                $musical->country = $country;
                                $musical->zip = $zip;
                                $musical->description = $description;
                                $musical->url = $url;
                                $musical->picture = $thumb;
                                $musical->startdate  = $startdate ;
                                $musical->enddate = $enddate;
                                // Storing additional data from musicalsData
                                $musical->music_type = $musicalsData['musicType'] ?? null;
                                $musical->material = $musicalsData['material'] ?? null;
                                $musical->style = $musicalsData['style'] ?? null;
                                $musical->finish_type = $musicalsData['finishType'] ?? null;



                                $musical->more_details = is_array($musicalsData['moreDetails']) ? implode(', ', $musicalsData['moreDetails']) : $musicalsData['moreDetails'];



                                $musical->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $musicalsimg = new Musicalsimg();
                                    $musicalsimg->musical_id = $musical->id;
                                    $musicalsimg->picture = $largePath;
                                    $musicalsimg->picturesmall = $smallPath;
                                    $musicalsimg->picturesxlarge = $xlargePath;
                                    $musicalsimg->save();
                                }





                break;






            case 'furniture':




                $furnituresData = $request->input('data.attributes.furnitures');
                Log::info('Furnitures Data:', $furnituresData);



                                $furniture = new Furniture();
                                $furniture->user_id = $user->id;
                                $furniture->onlinestore_id = $onlinestore_id;

                                $furniture->title = $title;
                                $furniture->price = $price;
                                $furniture->currency = $currency;

                                $furniture->phone = $phone;

                                $furniture->address = $address;
                                $furniture->city = $city;
                                $furniture->country = $country;
                                $furniture->zip = $zip;
                                $furniture->description = $description;
                                $furniture->url = $url;
                                $furniture->picture = $thumb;
                                $furniture->startdate  = $startdate ;
                                $furniture->enddate = $enddate;
                                // Storing additional data from furnituresData
                                $furniture->furniture_type = $furnituresData['type'] ?? null;
                                $furniture->material = $furnituresData['material'] ?? null;
                                $furniture->shape = $furnituresData['shape'] ?? null;
                                $furniture->cushion_thickness = $furnituresData['cushionThickness'] ?? null;
                                $furniture->capacity = $furnituresData['capacity'] ?? null;
                                $furniture->fill_material = $furnituresData['fillMaterial'] ?? null;
                                $furniture->condition = $furnituresData['condition'] ?? null;
                                $furniture->color = is_array($furnituresData['color']) ? implode(', ', $furnituresData['color']) : $furnituresData['color'];


                                $furniture->more_details = is_array($furnituresData['moreDetails']) ? implode(', ', $furnituresData['moreDetails']) : $furnituresData['moreDetails'];



                                $furniture->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $furnituresimg = new Furnituresimg();
                                    $furnituresimg->furniture_id = $furniture->id;
                                    $furnituresimg->picture = $largePath;
                                    $furnituresimg->picturesmall = $smallPath;
                                    $furnituresimg->picturesxlarge = $xlargePath;
                                    $furnituresimg->save();
                                }





                break;






            case 'home-appliances':



                $houseappliancesData = $request->input('data.attributes.houseappliances');
                Log::info('Houseappliances Data:', $houseappliancesData);




                                $houseappliance = new Houseappliance();
                                $houseappliance->user_id = $user->id;
                                $houseappliance->onlinestore_id = $onlinestore_id;

                                $houseappliance->title = $title;
                                $houseappliance->price = $price;
                                $houseappliance->currency = $currency;

                                $houseappliance->phone = $phone;

                                $houseappliance->address = $address;
                                $houseappliance->city = $city;
                                $houseappliance->country = $country;
                                $houseappliance->zip = $zip;
                                $houseappliance->description = $description;
                                $houseappliance->url = $url;
                                $houseappliance->picture = $thumb;
                                $houseappliance->startdate  = $startdate ;
                                $houseappliance->enddate = $enddate;
                                // Storing additional data from houseappliancesData
                                $houseappliance->access_location = $houseappliancesData['accessLocation'] ?? null;
                                $houseappliance->finish_type = $houseappliancesData['finishType'] ?? null;
                                $houseappliance->cycle_options = $houseappliancesData['cycleOptions'] ?? null;
                                $houseappliance->inlet_water = is_array($houseappliancesData['inletWater']) ? implode(', ', $houseappliancesData['inletWater']) : $houseappliancesData['inletWater'];
                                $houseappliance->installation_method = $houseappliancesData['installationMethod'] ?? null;
                                $houseappliance->components = is_array($houseappliancesData['components']) ? implode(', ', $houseappliancesData['components']) : $houseappliancesData['components'];
                                $houseappliance->control_type = $houseappliancesData['controlType'] ?? null;
                                $houseappliance->certification = $houseappliancesData['certification'] ?? null;


                                $houseappliance->more_details = is_array($houseappliancesData['moreDetails']) ? implode(', ', $houseappliancesData['moreDetails']) : $houseappliancesData['moreDetails'];



                                $houseappliance->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $houseappliancesimg = new Houseappliancesimg();
                                    $houseappliancesimg->houseappliance_id = $houseappliance->id;
                                    $houseappliancesimg->picture = $largePath;
                                    $houseappliancesimg->picturesmall = $smallPath;
                                    $houseappliancesimg->picturesxlarge = $xlargePath;
                                    $houseappliancesimg->save();
                                }





                break;






            case 'electrical-tools':




                $electricaltoolsData = $request->input('data.attributes.electricaltools');
                Log::info('Electrical Tools Data:', $electricaltoolsData);



                                $electricaltool = new Electricaltool();
                                $electricaltool->user_id = $user->id;
                                $electricaltool->onlinestore_id = $onlinestore_id;

                                $electricaltool->title = $title;
                                $electricaltool->price = $price;
                                $electricaltool->currency = $currency;

                                $electricaltool->phone = $phone;

                                $electricaltool->address = $address;
                                $electricaltool->city = $city;
                                $electricaltool->country = $country;
                                $electricaltool->zip = $zip;
                                $electricaltool->description = $description;
                                $electricaltool->url = $url;
                                $electricaltool->picture = $thumb;
                                $electricaltool->startdate  = $startdate ;
                                $electricaltool->enddate = $enddate;
                                // Storing additional data from electricaltoolsData
                                $electricaltool->tool_type = $electricaltoolsData['toolType'] ?? null;
                                $electricaltool->condition = $electricaltoolsData['condition'] ?? null;
                                $electricaltool->voltage = $electricaltoolsData['voltage'] ?? null;
                                $electricaltool->amperage = is_array($electricaltoolsData['amperage']) ? implode(', ', $electricaltoolsData['amperage']) : $electricaltoolsData['amperage'];
                                $electricaltool->cord_length = is_array($electricaltoolsData['cordLength']) ? implode(', ', $electricaltoolsData['cordLength']) : $electricaltoolsData['cordLength'];
                                $electricaltool->battery_life = is_array($electricaltoolsData['batteryLife']) ? implode(', ', $electricaltoolsData['batteryLife']) : $electricaltoolsData['batteryLife'];
                                $electricaltool->display = $electricaltoolsData['display'] ?? null;
                                $electricaltool->frequency = $electricaltoolsData['frequency'] ?? null;
                                $electricaltool->temperature = is_array($electricaltoolsData['temperature']) ? implode(', ', $electricaltoolsData['temperature']) : $electricaltoolsData['temperature'];
                                $electricaltool->voltage_sensing_ranges = $electricaltoolsData['voltageSensingRanges'] ?? null;
                                $electricaltool->detector = $electricaltoolsData['detector'] ?? null;
                                $electricaltool->operating_altitude = $electricaltoolsData['operatingAltitude'] ?? null;
                                $electricaltool->compatible = $electricaltoolsData['compatible'] ?? null;
                                $electricaltool->bending_angle = is_array($electricaltoolsData['bindingAngle']) ? implode(', ', $electricaltoolsData['bindingAngle']) : $electricaltoolsData['bindingAngle'];
                                $electricaltool->accessories = $electricaltoolsData['accessories'] ?? null;
                                $electricaltool->style = $electricaltoolsData['style'] ?? null;



                                $electricaltool->more_details = is_array($electricaltoolsData['moreDetails']) ? implode(', ', $electricaltoolsData['moreDetails']) : $electricaltoolsData['moreDetails'];



                                $electricaltool->save();


                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $electricaltoolsimg = new Electricaltoolsimg();
                                    $electricaltoolsimg->electricaltool_id = $electricaltool->id;
                                    $electricaltoolsimg->picture = $largePath;
                                    $electricaltoolsimg->picturesmall = $smallPath;
                                    $electricaltoolsimg->picturesxlarge = $xlargePath;
                                    $electricaltoolsimg->save();
                                }






                break;






            case 'ladders':




                $laddersData = $request->input('data.attributes.ladders');
                Log::info('Ladders Data:', $laddersData);




                                $ladder = new Ladder();
                                $ladder->user_id = $user->id;
                                $ladder->onlinestore_id = $onlinestore_id;

                                $ladder->title = $title;
                                $ladder->price = $price;
                                $ladder->currency = $currency;

                                $ladder->phone = $phone;


                                $ladder->address = $address;
                                $ladder->city = $city;
                                $ladder->country = $country;
                                $ladder->zip = $zip;
                                $ladder->description = $description;
                                $ladder->url = $url;
                                $ladder->picture = $thumb;
                                $ladder->startdate  = $startdate ;
                                $ladder->enddate = $enddate;
                                // Storing additional data from laddersData
                                $ladder->tool_type = $laddersData['toolType'] ?? null;
                                $ladder->condition = $laddersData['condition'] ?? null;
                                $ladder->power_source = $laddersData['powerSource'] ?? null;
                                $ladder->material = $laddersData['material'] ?? null;
                                $ladder->height = $laddersData['height'] ?? null;
                                $ladder->weight = $laddersData['weight'] ?? null;
                                $ladder->number_of_steps = $laddersData['numberOfSteps'] ?? null;
                                $ladder->load_capacity = $laddersData['loadCapacity'] ?? null;
                                $ladder->battery_life = $laddersData['batteryLife'] ?? null;
                                $ladder->style = is_array($laddersData['style']) ? implode(', ', $laddersData['style']) : $laddersData['style'];
                                $ladder->wheel_size = $laddersData['wheelSize'] ?? null;


                                $ladder->more_details = is_array($laddersData['moreDetails']) ? implode(', ', $laddersData['moreDetails']) : $laddersData['moreDetails'];



                                $ladder->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $laddersimg = new Laddersimg();
                                    $laddersimg->ladder_id = $ladder->id;
                                    $laddersimg->picture = $largePath;
                                    $laddersimg->picturesmall = $smallPath;
                                    $laddersimg->picturesxlarge = $xlargePath;
                                    $laddersimg->save();
                                }




                break;






            case 'mechanical-tools':




                $mechanicaltoolsData = $request->input('data.attributes.mechanicaltools');
                Log::info('Mechanicaltools Data:', $mechanicaltoolsData);



                                $mechanicaltool = new Mechanicaltool();
                                $mechanicaltool->user_id = $user->id;
                                $mechanicaltool->onlinestore_id = $onlinestore_id;

                                $mechanicaltool->title = $title;
                                $mechanicaltool->price = $price;
                                $mechanicaltool->currency = $currency;

                                $mechanicaltool->phone = $phone;


                                $mechanicaltool->address = $address;
                                $mechanicaltool->city = $city;
                                $mechanicaltool->country = $country;
                                $mechanicaltool->zip = $zip;
                                $mechanicaltool->description = $description;
                                $mechanicaltool->url = $url;
                                $mechanicaltool->picture = $thumb;
                                $mechanicaltool->startdate  = $startdate ;
                                $mechanicaltool->enddate = $enddate;
                                // Storing additional data from mechanicaltoolsData
                                $mechanicaltool->tool_type = $mechanicaltoolsData['toolType'] ?? null;
                                $mechanicaltool->condition = $mechanicaltoolsData['condition'] ?? null;
                                $mechanicaltool->power_source = $mechanicaltoolsData['powerSource'] ?? null;
                                $mechanicaltool->voltage = $mechanicaltoolsData['voltage'] ?? null;
                                $mechanicaltool->battery_life = $mechanicaltoolsData['batteryLife'] ?? null;
                                $mechanicaltool->blade_diameter = $mechanicaltoolsData['bladeDiameter'] ?? null;
                                $mechanicaltool->material = $mechanicaltoolsData['material'] ?? null;
                                $mechanicaltool->style = $mechanicaltoolsData['style'] ?? null;
                                $mechanicaltool->cutting_width = $mechanicaltoolsData['cuttingWidth'] ?? null;
                                $mechanicaltool->carburetor_type = $mechanicaltoolsData['carburetorType'] ?? null;



                                $mechanicaltool->more_details = is_array($mechanicaltoolsData['moreDetails']) ? implode(', ', $mechanicaltoolsData['moreDetails']) : $mechanicaltoolsData['moreDetails'];



                                $mechanicaltool->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $mechanicaltoolsimg = new Mechanicaltoolsimg();
                                    $mechanicaltoolsimg->mechanicaltool_id = $mechanicaltool->id;
                                    $mechanicaltoolsimg->picture = $largePath;
                                    $mechanicaltoolsimg->picturesmall = $smallPath;
                                    $mechanicaltoolsimg->picturesxlarge = $xlargePath;
                                    $mechanicaltoolsimg->save();
                                }




                break;





            case 'power-tools':





                $powertoolsData = $request->input('data.attributes.powertools');
                Log::info('Powertools Data:', $powertoolsData);

                                $powertool = new Powertool();
                                $powertool->user_id = $user->id;
                                $powertool->onlinestore_id = $onlinestore_id;

                                $powertool->title = $title;
                                $powertool->price = $price;
                                $powertool->currency = $currency;

                                $powertool->phone = $phone;

                                $powertool->address = $address;
                                $powertool->city = $city;
                                $powertool->country = $country;
                                $powertool->zip = $zip;
                                $powertool->description = $description;
                                $powertool->url = $url;
                                $powertool->picture = $thumb;
                                $powertool->startdate  = $startdate ;
                                $powertool->enddate = $enddate;
                                // Storing additional data from powertoolsData
                                $powertool->tool_type = $powertoolsData['toolType'] ?? null;
                                $powertool->condition = $powertoolsData['condition'] ?? null;
                                $powertool->power_source = $powertoolsData['powerSource'] ?? null;
                                $powertool->voltage = $powertoolsData['voltage'] ?? null;
                                $powertool->battery_life = $powertoolsData['batteryLife'] ?? null;
                                $powertool->material = $powertoolsData['material'] ?? null;
                                $powertool->noise_level = $powertoolsData['noiseLevel'] ?? null;
                                $powertool->grit_number = $powertoolsData['gritNumber'] ?? null;
                                $powertool->rotational_speed = $powertoolsData['rotationalSpeed'] ?? null;
                                $powertool->blade_material = $powertoolsData['bladeMaterial'] ?? null;
                                $powertool->surface = $powertoolsData['surface'] ?? null;
                                $powertool->style = $powertoolsData['style'] ?? null;
                                $powertool->amperage = $powertoolsData['amperage'] ?? null;



                                $powertool->more_details = is_array($powertoolsData['moreDetails']) ? implode(', ', $powertoolsData['moreDetails']) : $powertoolsData['moreDetails'];



                                $powertool->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $powertoolsimg = new Powertoolsimg();
                                    $powertoolsimg->powertool_id = $powertool->id;
                                    $powertoolsimg->picture = $largePath;
                                    $powertoolsimg->picturesmall = $smallPath;
                                    $powertoolsimg->picturesxlarge = $xlargePath;
                                    $powertoolsimg->save();
                                }



                break;






            case 'pressure-washers':




                $pressurewashersData = $request->input('data.attributes.pressurewashers');
                Log::info('Pressure Washers Data:', $pressurewashersData);



                                $pressurewasher = new Pressurewasher();
                                $pressurewasher->user_id = $user->id;
                                $pressurewasher->onlinestore_id = $onlinestore_id;

                                $pressurewasher->title = $title;
                                $pressurewasher->price = $price;
                                $pressurewasher->currency = $currency;

                                $pressurewasher->phone = $phone;

                                $pressurewasher->address = $address;
                                $pressurewasher->city = $city;
                                $pressurewasher->country = $country;
                                $pressurewasher->zip = $zip;
                                $pressurewasher->description = $description;
                                $pressurewasher->url = $url;
                                $pressurewasher->picture = $thumb;
                                $pressurewasher->startdate  = $startdate ;
                                $pressurewasher->enddate = $enddate;
                                // Storing additional data from pressurewashersData
                                $pressurewasher->tool_type = $pressurewashersData['toolType'] ?? null;
                                $pressurewasher->condition = $pressurewashersData['condition'] ?? null;
                                $pressurewasher->power_source = $pressurewashersData['powerSource'] ?? null;
                                $pressurewasher->power_output = $pressurewashersData['powerOutput'] ?? null;
                                $pressurewasher->engine_power = $pressurewashersData['enginePower'] ?? null;
                                $pressurewasher->hose_length = $pressurewashersData['hoseLength'] ?? null;
                                $pressurewasher->cord_length = $pressurewashersData['cordLength'] ?? null;
                                $pressurewasher->weight = $pressurewashersData['weight'] ?? null;
                                $pressurewasher->maximum_flow_rate = is_array($pressurewashersData['maximumFlowRate']) ? implode(', ', $pressurewashersData['maximumFlowRate']) : $pressurewashersData['maximumFlowRate'];
                                $pressurewasher->specification_met = is_array($pressurewashersData['specificationMet']) ? implode(', ', $pressurewashersData['specificationMet']) : $pressurewashersData['specificationMet'];
                                $pressurewasher->inlet_connection_type = is_array($pressurewashersData['inletConnectionType']) ? implode(', ', $pressurewashersData['inletConnectionType']) : $pressurewashersData['inletConnectionType'];
                                $pressurewasher->outlet_connection_size = $pressurewashersData['outletConnectionSize'] ?? null;
                                $pressurewasher->max_working_temperature = $pressurewashersData['maxWorkingTemperature'] ?? null;
                                $pressurewasher->connection_type = $pressurewashersData['connectionType'] ?? null;



                                $pressurewasher->more_details = is_array($pressurewashersData['moreDetails']) ? implode(', ', $pressurewashersData['moreDetails']) : $pressurewashersData['moreDetails'];




                                $pressurewasher->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $pressurewashersimg = new Pressurewashersimg();
                                    $pressurewashersimg->pressurewasher_id = $pressurewasher->id;
                                    $pressurewashersimg->picture = $largePath;
                                    $pressurewashersimg->picturesmall = $smallPath;
                                    $pressurewashersimg->picturesxlarge = $xlargePath;
                                    $pressurewashersimg->save();
                                }



                break;






            case 'services':



                $servicesData = $request->input('data.attributes.services');
                Log::info('Services Data:', $servicesData);


                                $service = new Service();
                                $service->user_id = $user->id;
                                $service->onlinestore_id = $onlinestore_id;

                                $service->title = $title;
                                $service->price = $price;
                                $service->currency = $currency;

                                $service->phone = $phone;

                                $service->address = $address;
                                $service->city = $city;
                                $service->country = $country;
                                $service->zip = $zip;
                                $service->description = $description;
                                $service->url = $url;
                                $service->picture = $thumb;
                                $service->startdate  = $startdate ;
                                $service->enddate = $enddate;
                                // Storing additional data from servicesData
                                $service->languages = is_array($servicesData['languages']) ? implode(', ', $servicesData['languages']) : $servicesData['languages'];
                                $service->experience = $servicesData['experience'] ?? null;
                                $service->type_service = $servicesData['type'] ?? null;
                                $service->education = $servicesData['education'] ?? null;
                                $service->delivery_time = $servicesData['deliveryTime'] ?? null;


                                $service->more_details = is_array($servicesData['moreDetails']) ? implode(', ', $servicesData['moreDetails']) : $servicesData['moreDetails'];



                                $service->save();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $servicesimg = new Servicesimg();
                                    $servicesimg->service_id = $service->id;
                                    $servicesimg->picture = $largePath;
                                    $servicesimg->picturesmall = $smallPath;
                                    $servicesimg->picturesxlarge = $xlargePath;
                                    $servicesimg->save();
                                }



                break;




            case 'jobs':



                    $jobsData = $request->input('data.attributes.jobs');



                                    $service = new Job();
                                    $service->user_id = $user->id;
                                    $service->onlinestore_id = $onlinestore_id;

                                    $service->title = $title;
                                    $service->price = $price;
                                    $service->currency = $currency;

                                    $service->phone = $phone;

                                    $service->address = $address;
                                    $service->city = $city;
                                    $service->country = $country;
                                    $service->zip = $zip;
                                    $service->description = $description;
                                    $service->url = $url;
                                    $service->picture = $thumb;
                                    $service->startdate  = $startdate ;
                                    $service->enddate = $enddate;
                                    // Storing additional data from jobsData
                                    $service->language = is_array($jobsData['languages']) ? implode(', ', $jobsData['languages']) : $jobsData['languages'];
                                    $service->experience_level = $jobsData['experience'] ?? null;
                                    $service->employment_type = $jobsData['employmentType'] ?? null;

                                    $service->skills = is_array($jobsData['skills']) ? implode(', ', $jobsData['skills']) : $jobsData['skills'];
                                    $service->salary = $jobsData['salary'] ?? null;
                                    $service->responsibilities = $jobsData['responsibilities'] ?? null;
                                    $service->benefits = is_array($jobsData['benefits']) ? implode(', ', $jobsData['benefits']) : $jobsData['benefits'];

                                    $service->requirements = is_array($jobsData['requirements']) ? implode(', ', $jobsData['requirements']) : $jobsData['requirements'];

                                    $service->more_details = is_array($jobsData['moreDetails']) ? implode(', ', $jobsData['moreDetails']) : $jobsData['moreDetails'];



                                    $service->save();





                                    foreach ($imagePathslarge as $index => $largePath) {

                                        $smallPath = $imagePathssmall[$index];
                                        $xlargePath = $imagePathsxlarge[$index];


                                        $servicesimg = new Jobsimg();
                                        $servicesimg->job_id = $service->id;
                                        $servicesimg->picture = $largePath;
                                        $servicesimg->picturesmall = $smallPath;
                                        $servicesimg->picturesxlarge = $xlargePath;
                                        $servicesimg->save();
                                    }



                    break;





            case 'boats':




                $boatsData = $request->input('data.attributes.boats');
                Log::info('Boats Data:', $boatsData);

                                $boat = new Boat();
                                $boat->user_id = $user->id;

                                $boat->onlinestore_id = $onlinestore_id;

                                $boat->title = $title;
                                $boat->price = $price;
                                $boat->currency = $currency;

                                $boat->phone = $phone;

                                $boat->address = $address;
                                $boat->city = $city;
                                $boat->country = $country;
                                $boat->zip = $zip;
                                $boat->description = $description;
                                $boat->url = $url;
                                $boat->picture = $thumb;
                                $boat->startdate  = $startdate ;
                                $boat->enddate = $enddate;
                                // Storing additional data from boatsData
                                $boat->boat_type = $boatsData['boatsType'] ?? null;
                                $boat->capacity = $boatsData['cruiseCapacity'] ?? null;
                                $boat->cabins = $boatsData['numberOfCabins'] ?? null;
                                $boat->berths_in_cabin = $boatsData['berthsInCabin'] ?? null;
                                $boat->cruising_time = $boatsData['dailyCruisingTime'] ?? null;
                                $boat->length = $boatsData['length'] ?? null;
                                $boat->security = is_array($boatsData['security']) ? implode(', ', $boatsData['security']) : $boatsData['security'];
                                $boat->navigation = is_array($boatsData['navigation']) ? implode(', ', $boatsData['navigation']) : $boatsData['navigation'];
                                $boat->kitchen_equipment = is_array($boatsData['kitchenEquipment']) ? implode(', ', $boatsData['kitchenEquipment']) : $boatsData['kitchenEquipment'];


                                $boat->more_details = is_array($boatsData['moreDetails']) ? implode(', ', $boatsData['moreDetails']) : $boatsData['moreDetails'];



                                $boat->save();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $boatsimg = new Boatsimg();
                                    $boatsimg->boat_id = $boat->id;
                                    $boatsimg->picture = $largePath;
                                    $boatsimg->picturesmall = $smallPath;
                                    $boatsimg->picturesxlarge = $xlargePath;
                                    $boatsimg->save();
                                }



                break;






            case 'trucks':




                $camionsData = $request->input('data.attributes.camions');
                Log::info('Camions Data:', $camionsData);

                                $camion = new Camion();
                                $camion->user_id = $user->id;
                                $camion->onlinestore_id = $onlinestore_id;

                                $camion->title = $title;
                                $camion->price = $price;
                                $camion->currency = $currency;

                                $camion->phone = $phone;

                                $camion->address = $address;
                                $camion->city = $city;
                                $camion->country = $country;
                                $camion->zip = $zip;
                                $camion->description = $description;
                                $camion->url = $url;
                                $camion->picture = $thumb;
                                $camion->startdate  = $startdate ;
                                $camion->enddate = $enddate;
                                // Storing additional data from camionsData
                                $camion->type = $camionsData['type'] ?? null;
                                $camion->fuel_type = $camionsData['fuelType'] ?? null;
                                $camion->condition = $camionsData['condition'] ?? null;
                                $camion->transmission = $camionsData['transmission'] ?? null;
                                $camion->insurance = $camionsData['insurance'] ?? null;
                                $camion->navigation_system = $camionsData['navigation'] ?? null;

                                $camion->more_details = is_array($camionsData['moreDetails']) ? implode(', ', $camionsData['moreDetails']) : $camionsData['moreDetails'];





                                $camion->save();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $camionsimg = new Camionsimg();
                                    $camionsimg->camion_id = $camion->id;
                                    $camionsimg->picture = $largePath;
                                    $camionsimg->picturesmall = $smallPath;
                                    $camionsimg->picturesxlarge = $xlargePath;
                                    $camionsimg->save();
                                }



                break;





            case 'caravans':



                $caravansData = $request->input('data.attributes.caravans');
                Log::info('Caravans Data:', $caravansData);


                                $caravan = new Caravan();
                                $caravan->user_id = $user->id;
                                $caravan->onlinestore_id = $onlinestore_id;

                                $caravan->title = $title;
                                $caravan->price = $price;
                                $caravan->currency = $currency;

                                $caravan->phone = $phone;

                                $caravan->address = $address;
                                $caravan->city = $city;
                                $caravan->country = $country;
                                $caravan->zip = $zip;
                                $caravan->description = $description;
                                $caravan->url = $url;
                                $caravan->picture = $thumb;
                                $caravan->startdate  = $startdate ;
                                $caravan->enddate = $enddate;
                                // Storing additional data from caravansData
                                $caravan->gearbox = $caravansData['gearbox'] ?? null;
                                $caravan->fuel_type = $caravansData['fuelType'] ?? null;
                                $caravan->kitchen_equipment = is_array($caravansData['kitchenEquipment']) ? implode(', ', $caravansData['kitchenEquipment']) : $caravansData['kitchenEquipment'];
                                $caravan->toilet = $caravansData['toilet'] ?? null;
                                $caravan->furniture = is_array($caravansData['furniture']) ? implode(', ', $caravansData['furniture']) : $caravansData['furniture'];
                                $caravan->accessories = is_array($caravansData['accessories']) ? implode(', ', $caravansData['accessories']) : $caravansData['accessories'];


                                $caravan->more_details = is_array($caravansData['moreDetails']) ? implode(', ', $caravansData['moreDetails']) : $caravansData['moreDetails'];



                                $caravan->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $caravansimg = new Caravansimg();
                                    $caravansimg->caravan_id = $caravan->id;
                                    $caravansimg->picture = $largePath;
                                    $caravansimg->picturesmall = $smallPath;
                                    $caravansimg->picturesxlarge = $xlargePath;
                                    $caravansimg->save();
                                }



                break;





            case 'cars':



                $carsData = $request->input('data.attributes.cars');
                Log::info('Cars Data:', $carsData);




                                $car = new Car();
                                $car->user_id = $user->id;
                                $car->onlinestore_id = $onlinestore_id;

                                $car->title = $title;
                                $car->price = $price;
                                $car->currency = $currency;

                                $car->phone = $phone;

                                $car->address = $address;
                                $car->city = $city;
                                $car->country = $country;
                                $car->zip = $zip;
                                $car->description = $description;
                                $car->url = $url;
                                $car->picture = $thumb;
                                $car->startdate  = $startdate ;
                                $car->enddate = $enddate;
                                // Storing additional data from carsData
                                $car->transmission = $carsData['transmission'] ?? null;
                                $car->fuel_type = $carsData['fuelType'] ?? null;
                                $car->number_of_doors = $carsData['numberOfDoors'] ?? null;
                                $car->condition = $carsData['condition'] ?? null;
                                $car->more_details = is_array($carsData['moreDetails']) ? implode(', ', $carsData['moreDetails']) : $carsData['moreDetails'];
                                $car->seats = $carsData['seats'] ?? null;




                                $car->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $carsimg = new Carsimg();
                                    $carsimg->car_id = $car->id;
                                    $carsimg->picture = $largePath;
                                    $carsimg->picturesmall = $smallPath;
                                    $carsimg->picturesxlarge = $xlargePath;
                                    $carsimg->save();
                                }




                break;





            case 'engins':





                $enginsData = $request->input('data.attributes.engins');
                Log::info('Engins Data:', $enginsData);



                                $engin = new Engin();
                                $engin->user_id = $user->id;
                                $engin->onlinestore_id = $onlinestore_id;

                                $engin->title = $title;
                                $engin->price = $price;
                                $engin->currency = $currency;

                                $engin->phone = $phone;

                                $engin->address = $address;
                                $engin->city = $city;
                                $engin->country = $country;
                                $engin->zip = $zip;
                                $engin->description = $description;
                                $engin->url = $url;
                                $engin->picture = $thumb;
                                $engin->startdate  = $startdate ;
                                $engin->enddate = $enddate;
                                // Storing additional data from enginsData
                                $engin->type = $enginsData['type'] ?? null;
                                $engin->mechanical_condition = $enginsData['mechanicalCondition'] ?? null;

                                $engin->transmission = $enginsData['transmissionType'] ?? null;
                                $engin->cab = $enginsData['cabType'] ?? null;
                                $engin->cab_condition = $enginsData['cabCondition'] ?? null;
                                $engin->coupler = $enginsData['couplerType'] ?? null;
                                $engin->hydraulics = $enginsData['hydraulicsType'] ?? null;
                                $engin->more_details = is_array($enginsData['moreDetails']) ? implode(', ', $enginsData['moreDetails']) : $enginsData['moreDetails'];
                                $engin->seats = $enginsData['seats'] ?? null;

                                $engin->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $enginsimg = new Enginsimg();
                                    $enginsimg->engin_id = $engin->id;
                                    $enginsimg->picture = $largePath;
                                    $enginsimg->picturesmall = $smallPath;
                                    $enginsimg->picturesxlarge = $xlargePath;
                                    $enginsimg->save();
                                }




                break;





            case 'motorcycles':




                $motosData = $request->input('data.attributes.motos');
                Log::info('Motos Data:', $motosData);




                                $moto = new Moto();
                                $moto->user_id = $user->id;
                                $moto->onlinestore_id = $onlinestore_id;

                                $moto->title = $title;
                                $moto->price = $price;
                                $moto->currency = $currency;

                                $moto->phone = $phone;

                                $moto->address = $address;
                                $moto->city = $city;
                                $moto->country = $country;
                                $moto->zip = $zip;
                                $moto->description = $description;
                                $moto->url = $url;
                                $moto->picture = $thumb;
                                $moto->startdate  = $startdate ;
                                $moto->enddate = $enddate;
                                // Storing additional data from motosData
                                $moto->condition = $motosData['condition'] ?? null;
                                $moto->gearbox = $motosData['gearbox'] ?? null;
                                $moto->insurance = $motosData['insurance'] ?? null;
                                $moto->power = $motosData['power'] ?? null;
                                $moto->speed = $motosData['speed'] ?? null;
                                $moto->toolkit = $motosData['toolkit'] ?? null;
                                $moto->intercom = $motosData['intercom'] ?? null;


                                $moto->more_details = is_array($motosData['moreDetails']) ? implode(', ', $motosData['moreDetails']) : $motosData['moreDetails'];



                                $moto->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $motosimg = new Motosimg();
                                    $motosimg->moto_id = $moto->id;
                                    $motosimg->picture = $largePath;
                                    $motosimg->picturesmall = $smallPath;
                                    $motosimg->picturesxlarge = $xlargePath;
                                    $motosimg->save();
                                }




                break;





            case 'scooters':





                $scootersData = $request->input('data.attributes.scooters');
                Log::info('Scooters Data:', $scootersData);



                                $scooter = new Scooter();
                                $scooter->user_id = $user->id;
                                $scooter->onlinestore_id = $onlinestore_id;

                                $scooter->title = $title;
                                $scooter->price = $price;
                                $scooter->currency = $currency;

                                $scooter->phone = $phone;

                                $scooter->address = $address;
                                $scooter->city = $city;
                                $scooter->country = $country;
                                $scooter->zip = $zip;
                                $scooter->description = $description;
                                $scooter->url = $url;
                                $scooter->picture = $thumb;
                                $scooter->startdate  = $startdate ;
                                $scooter->enddate = $enddate;

                                // Storing additional data from scootersData
                                $scooter->condition = $scootersData['condition'] ?? null;


                                $scooter->more_details = is_array($scootersData['moreDetails']) ? implode(', ', $scootersData['moreDetails']) : $scootersData['moreDetails'];



                                $scooter->save();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $scootersimg = new Scootersimg();
                                    $scootersimg->scooter_id = $scooter->id;
                                    $scootersimg->picture = $largePath;
                                    $scootersimg->picturesmall = $smallPath;
                                    $scootersimg->picturesxlarge = $xlargePath;
                                    $scootersimg->save();
                                }



                break;






            case 'airport-taxis':




                $taxiaeroportsData = $request->input('data.attributes.taxiaeroports');
                Log::info('Taxiaeroports Data:', $taxiaeroportsData);



                                $taxiaeroport = new Taxiaeroport();
                                $taxiaeroport->user_id = $user->id;
                                $taxiaeroport->onlinestore_id = $onlinestore_id;

                                $taxiaeroport->title = $title;
                                $taxiaeroport->price = $price;
                                $taxiaeroport->currency = $currency;

                                $taxiaeroport->phone = $phone;

                                $taxiaeroport->address = $address;
                                $taxiaeroport->city = $city;
                                $taxiaeroport->country = $country;
                                $taxiaeroport->zip = $zip;
                                $taxiaeroport->description = $description;
                                $taxiaeroport->url = $url;
                                $taxiaeroport->picture = $thumb;
                                $taxiaeroport->startdate  = $startdate ;
                                $taxiaeroport->enddate = $enddate;
                                // Storing additional data from taxiaeroportsData
                                $taxiaeroport->passengers = $taxiaeroportsData['passengers'] ?? null;
                                $taxiaeroport->luggage = $taxiaeroportsData['luggage'] ?? null;
                                $taxiaeroport->storage = $taxiaeroportsData['storage'] ?? null;


                                $taxiaeroport->more_details = is_array($taxiaeroportsData['moreDetails']) ? implode(', ', $taxiaeroportsData['moreDetails']) : $taxiaeroportsData['moreDetails'];



                                $taxiaeroport->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $taxiaeroportsimg = new Taxiaeroportsimg();
                                    $taxiaeroportsimg->taxiaeroport_id = $taxiaeroport->id;
                                    $taxiaeroportsimg->picture = $largePath;
                                    $taxiaeroportsimg->picturesmall = $smallPath;
                                    $taxiaeroportsimg->picturesxlarge = $xlargePath;
                                    $taxiaeroportsimg->save();
                                }



                break;





            case 'transportation':




                $transportationsData = $request->input('data.attributes.transportations');
                Log::info('Transportations Data:', $transportationsData);



                                $transportation = new Transportation();
                                $transportation->user_id = $user->id;
                                $transportation->onlinestore_id = $onlinestore_id;

                                $transportation->title = $title;
                                $transportation->price = $price;
                                $transportation->currency = $currency;
                                $transportation->phone = $phone;

                                $transportation->address = $address;
                                $transportation->city = $city;
                                $transportation->country = $country;
                                $transportation->zip = $zip;
                                $transportation->description = $description;
                                $transportation->url = $url;
                                $transportation->picture = $thumb;
                                $transportation->startdate  = $startdate ;
                                $transportation->enddate = $enddate;
                                $transportation->passengers = $transportationsData['passengers'] ?? null;
                                $transportation->luggage = $transportationsData['luggage'] ?? null;
                                $transportation->condition = $transportationsData['condition'] ?? null;
                                $transportation->duration = is_array($transportationsData['duration']) ? implode(', ', $transportationsData['duration']) : $transportationsData['duration'];
                                $transportation->gearbox = $transportationsData['gearbox'] ?? null;


                                $transportation->more_details = is_array($transportationsData['moreDetails']) ? implode(', ', $transportationsData['moreDetails']) : $transportationsData['moreDetails'];




                                $transportation->save();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $transportationsimg = new Transportationsimg();
                                    $transportationsimg->transportation_id = $transportation->id;
                                    $transportationsimg->picture = $largePath;
                                    $transportationsimg->picturesmall = $smallPath;
                                    $transportationsimg->picturesxlarge = $xlargePath;
                                    $transportationsimg->save();
                                }



                break;







            case 'bicycles':




                $velosData = $request->input('data.attributes.velos');
                Log::info('Velos Data:', $velosData);

                                $velo = new Velo();
                                $velo->user_id = $user->id;
                                $velo->onlinestore_id = $onlinestore_id;

                                $velo->title = $title;
                                $velo->price = $price;
                                $velo->currency = $currency;

                                $velo->phone = $phone;

                                $velo->address = $address;
                                $velo->city = $city;
                                $velo->country = $country;
                                $velo->zip = $zip;
                                $velo->description = $description;
                                $velo->url = $url;
                                $velo->picture = $thumb;
                                $velo->startdate  = $startdate ;
                                $velo->enddate = $enddate;
                                $velo->bike_type = $velosData['bikeType'] ?? null;
                                $velo->seatpost = $velosData['seatpost'] ?? null;
                                $velo->condition = is_array($velosData['condition']) ? implode(', ', $velosData['condition']) : $velosData['condition'];
                                $velo->storage = is_array($velosData['storage']) ? implode(', ', $velosData['storage']) : $velosData['storage'];
                                $velo->fork = is_array($velosData['fork']) ? implode(', ', $velosData['fork']) : $velosData['fork'];
                                $velo->gear = is_array($velosData['gear']) ? implode(', ', $velosData['gear']) : $velosData['gear'];


                                $velo->more_details = is_array($velosData['moreDetails']) ? implode(', ', $velosData['moreDetails']) : $velosData['moreDetails'];



                                $velo->save();


                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $velosimg = new Velosimg();
                                    $velosimg->velo_id = $velo->id;
                                    $velosimg->picture = $largePath;
                                    $velosimg->picturesmall = $smallPath;
                                    $velosimg->picturesxlarge = $xlargePath;
                                    $velosimg->save();
                                }




                break;






            default:
                // Default code
                break;
        }


        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'listings',
                'id' => $listing->id,
                'attributes' => [
                    'category' => $listing->category,
                    'user_id' => $listing->user_id,
                    'created_at' => $listing->created_at,
                    'updated_at' => $listing->updated_at,
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





    public function update(JsonApiRoute $route, Store $store )
    {
        $user = Auth::user();

        $userstore = Onlinestore::where('user_id', $user->id)->first();

        $onlinestore_id = $userstore ? $userstore->id : 0;



        $request = app('request'); // Retrieve the current request



        // Get the ID from the route parameters
        $id = $route->resourceId();


                // Validate the request
        $request->validate([
            'attributes.category' => 'required|string',
            'attributes.title' => 'required|string',
            'attributes.description' => 'required|string',

        ]);



        $category = $request->input('attributes.category');
        $description = $request->input('attributes.description');
        $title = $request->input('attributes.title');
        $address = $request->input('attributes.address');

        $city = $request->input('attributes.city');
        $country = $request->input('attributes.country');
        $zip = $request->input('attributes.zip');

        $startdate = $request->input('attributes.startdate');
        $enddate = $request->input('attributes.enddate');
        $price = $request->input('attributes.price');

        $phone = $request->input('attributes.phone');
        $currency = $request->input('attributes.currency');








        $imagePathslarge = $request->input('attributes.imagePathslarge') ;
        $imagePathssmall = $request->input('attributes.imagePathssmall') ;
        $imagePathsxlarge = $request->input('attributes.imagePathsxlarge') ;
        $thumb = $request->input('attributes.thumb') ;


        $oldimagePathslarge = $request->input('attributes.oldimagePathslarge');




            // Find the existing listing
        $listing = Listing::findOrFail($id);






        $existingImages = Listingsimg::where('listing_id', $listing->id)->get();






            foreach ($existingImages as $image) {
                // Check if the image is in the oldimagePathslarge array
                if (!in_array($image->picture, $oldimagePathslarge)) {


                    Log::info('Deleting image from listing:', [
                        'large_image' => $image->picture,
                        'small_image' => $image->picturesmall,
                        'xlarge_image' => $image->picturesxlarge,
                    ]);


                    // Delete from DigitalOcean Spaces (Large)
                    if (Storage::disk('spaces')->exists('storage/listinglarge/' . $image->picture)) {
                        Storage::disk('spaces')->delete('storage/listinglarge/' . $image->picture);
                    }

                    // Delete from DigitalOcean Spaces (Small)
                    if (Storage::disk('spaces')->exists('storage/listingsmall/' . $image->picturesmall)) {
                        Storage::disk('spaces')->delete('storage/listingsmall/' . $image->picturesmall);
                    }

                    // Delete from DigitalOcean Spaces (X-Large)
                    if (Storage::disk('spaces')->exists('storage/listingxlarge/' . $image->picturesxlarge)) {
                        Storage::disk('spaces')->delete('storage/listingxlarge/' . $image->picturesxlarge);
                    }

                    // Optionally, delete the image record from the database
                    $image->delete();
                }
            }




        // Fetch the remaining images in the database that match the oldimagePathslarge
        $remainingImages = Listingsimg::where('listing_id', $listing->id)
            ->whereIn('picture', $oldimagePathslarge) // Only keep images that are in oldimagePathslarge
            ->get();


            Listingsimg::where('listing_id', $listing->id)->delete();


            $imagePathslarge = $imagePathslarge ?? [];
            $imagePathssmall = $imagePathssmall ?? [];
            $imagePathsxlarge = $imagePathsxlarge ?? [];

            foreach ($remainingImages as $image) {
                // Update the actual arrays by appending values
                $imagePathslarge = array_merge($imagePathslarge, [$image->picture]);
                $imagePathssmall = array_merge($imagePathssmall, [$image->picturesmall]);
                $imagePathsxlarge = array_merge($imagePathsxlarge, [$image->picturesxlarge]);
            }

            $url = $listing->url;



            $listing->category = $category;
            $listing->title = $title;
            $listing->price = $price;
            $listing->currency = $currency;
            $listing->phone = $phone;

            $listing->city = $city;
            $listing->zip = $zip;


            $listing->picture = $imagePathssmall[0];


            $listing->user_id = $user->id;
            $listing->onlinestore_id = $onlinestore_id;

            $listing->save();


        foreach ($imagePathslarge as $index => $largePath) {

            $smallPath = $imagePathssmall[$index];
                        $xlargePath = $imagePathsxlarge[$index];


            $listingsimg = new Listingsimg();
            $listingsimg->listing_id = $listing->id;
            $listingsimg->picture = $largePath;
            $listingsimg->picturesmall = $smallPath;
            $listingsimg->picturesxlarge = $xlargePath;
            $listingsimg->save();
        }




        switch ($category) {



            case 'billiard':



                $billiardsData = $request->input('attributes.billiards');




                $billiard = Billiard::where('url', $url)->first();
                $billiard->user_id = $user->id;
                $billiard->onlinestore_id = $onlinestore_id;

                $billiard->title = $title;
                $billiard->price = $price;
                $billiard->currency = $currency;
                $billiard->phone = $phone;

                $billiard->address = $address;
                $billiard->city = $city;
                $billiard->country = $country;
                $billiard->zip = $zip;
                $billiard->description = $description;

                $billiard->picture = $thumb;
                $billiard->startdate  = $startdate ;
                $billiard->enddate = $enddate;
                $billiard->table_brand = $billiardsData['tableDetails'] ?? null;
                $billiard->condition = $billiardsData['condition'] ?? null;
                $billiard->balls_design = is_array($billiardsData['ballsDesign']) ? implode(', ', $billiardsData['ballsDesign']) : $billiardsData['ballsDesign'];
                $billiard->bridge_stick = is_array($billiardsData['bridgeAndStick']) ? implode(', ', $billiardsData['bridgeAndStick']) : $billiardsData['bridgeAndStick'];
                $billiard->chalk = is_array($billiardsData['chalk']) ? implode(', ', $billiardsData['chalk']) : $billiardsData['chalk'];
                $billiard->scoreboards = is_array($billiardsData['otherInformation']) ? implode(', ', $billiardsData['otherInformation']) : $billiardsData['otherInformation'];

                $billiard->more_details = is_array($billiardsData['moreDetails']) ? implode(', ', $billiardsData['moreDetails']) : $billiardsData['moreDetails'];


                $billiard->save();


                    // Remove old images
                    Billiardsimg::where('billiard_id', $billiard->id)->delete();




                    foreach ($imagePathslarge as $index => $largePath) {

                        $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                        $billiardsimg = new Billiardsimg();
                        $billiardsimg->billiard_id = $billiard->id;
                        $billiardsimg->picture = $largePath;
                        $billiardsimg->picturesmall = $smallPath;
                        $billiardsimg->picturesxlarge = $xlargePath;
                        $billiardsimg->save();
                    }


                break;





            case 'boxing':



                                $boxingsData = $request->input('attributes.boxings');
                                Log::info('Billiards Data:', $boxingsData);

                                $boxing = Boxing::where('url', $url)->first();

                                $boxing->user_id = $user->id;
                                $boxing->onlinestore_id = $onlinestore_id;

                                $boxing->title = $title;
                                $boxing->price = $price;
                                $boxing->currency = $currency;

                                $boxing->phone = $phone;

                                $boxing->address = $address;
                                $boxing->city = $city;
                                $boxing->country = $country;
                                $boxing->zip = $zip;
                                $boxing->description = $description;

                                $boxing->picture = $thumb;
                                $boxing->startdate  = $startdate ;
                                $boxing->enddate = $enddate;
                                $boxing->brand_name = $boxingsData['brand'] ?? null;
                                $boxing->ring_dimensions = $boxingsData['ringDimensions'] ?? null;
                                $boxing->padding_thickness = $boxingsData['padding'] ?? null;
                                $boxing->boxing_clothing = is_array($boxingsData['clothing']) ? implode(', ', $boxingsData['clothing']) : $boxingsData['clothing'];
                                $boxing->other_equipment = is_array($boxingsData['otherEquipment']) ? implode(', ', $boxingsData['otherEquipment']) : $boxingsData['otherEquipment'];


                                $boxing->more_details = is_array($boxingsData['moreDetails']) ? implode(', ', $boxingsData['moreDetails']) : $boxingsData['moreDetails'];



                                $boxing->save();

                                Boxingsimg::where('boxing_id', $boxing->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $boxingsimg = new Boxingsimg();
                                    $boxingsimg->boxing_id = $boxing->id;
                                    $boxingsimg->picture = $largePath;
                                    $boxingsimg->picturesmall = $smallPath;
                                    $boxingsimg->picturesxlarge = $xlargePath;
                                    $boxingsimg->save();
                                }




                break;






            case 'diving':


                $divingsData = $request->input('attributes.divings');
                Log::info('Divings Data:', $divingsData);

                $diving = Diving::where('url', $url)->first();

                                $diving->user_id = $user->id;
                                $diving->onlinestore_id = $onlinestore_id;

                                $diving->title = $title;
                                $diving->price = $price;
                                $diving->currency = $currency;

                                $diving->phone = $phone;

                                $diving->address = $address;
                                $diving->city = $city;
                                $diving->country = $country;
                                $diving->zip = $zip;
                                $diving->description = $description;

                                $diving->picture = $thumb;
                                $diving->startdate  = $startdate ;
                                $diving->enddate = $enddate;
                                // Storing additional data from divingsData
                                $diving->brand_name = $divingsData['brandName'] ?? null;
                                $diving->material = $divingsData['material'] ?? null;
                                $diving->other_equipment = is_array($divingsData['otherEquipment']) ? implode(', ', $divingsData['otherEquipment']) : $divingsData['otherEquipment'];


                                $diving->more_details = is_array($divingsData['moreDetails']) ? implode(', ', $divingsData['moreDetails']) : $divingsData['moreDetails'];



                                $diving->save();

                                Divingsimg::where('diving_id', $diving->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $divingsimg = new Divingsimg();
                                    $divingsimg->diving_id = $diving->id;
                                    $divingsimg->picture = $largePath;
                                    $divingsimg->picturesmall = $smallPath;
                                    $divingsimg->picturesxlarge = $xlargePath;
                                    $divingsimg->save();
                                }





                break;







            case 'football':


                $footballsData = $request->input('attributes.footballs');
                Log::info('Footballs Data:', $footballsData);


                $football = Football::where('url', $url)->first();

                                $football->user_id = $user->id;
                                $football->onlinestore_id = $onlinestore_id;

                                $football->title = $title;
                                $football->price = $price;
                                $football->currency = $currency;

                                $football->phone = $phone;

                                $football->address = $address;
                                $football->city = $city;
                                $football->country = $country;
                                $football->zip = $zip;
                                $football->description = $description;

                                $football->picture = $thumb;
                                $football->startdate  = $startdate ;
                                $football->enddate = $enddate;

                                // Storing additional data from footballsData
                                $football->type = $footballsData['type'] ?? null;
                                $football->equipment = is_array($footballsData['equipment']) ? implode(', ', $footballsData['equipment']) : $footballsData['equipment'];

                                $football->more_details = is_array($footballsData['moreDetails']) ? implode(', ', $footballsData['moreDetails']) : $footballsData['moreDetails'];


                                $football->save();

                                Footballsimg::where('football_id', $football->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $footballsimg = new Footballsimg();
                                    $footballsimg->football_id = $football->id;
                                    $footballsimg->picture = $largePath;
                                    $footballsimg->picturesmall = $smallPath;
                                    $footballsimg->picturesxlarge = $xlargePath;
                                    $footballsimg->save();
                                }





                break;







            case 'golf':


                $golfsData = $request->input('attributes.golfs');
                Log::info('Golfs Data:', $golfsData);


                $golf = Golf::where('url', $url)->first();

                                $golf->user_id = $user->id;
                                $golf->onlinestore_id = $onlinestore_id;

                                $golf->title = $title;
                                $golf->price = $price;
                                $golf->currency = $currency;

                                $golf->phone = $phone;

                                $golf->address = $address;
                                $golf->city = $city;
                                $golf->country = $country;
                                $golf->zip = $zip;
                                $golf->description = $description;

                                $golf->picture = $thumb;
                                $golf->startdate  = $startdate ;
                                $golf->enddate = $enddate;
                                // Storing additional data from golfsData
                                $golf->clothing = is_array($golfsData['clothing']) ? implode(', ', $golfsData['clothing']) : $golfsData['clothing'];
                                $golf->golf_cars = $golfsData['cars'] ?? null;
                                $golf->other_equipment = is_array($golfsData['otherEquipment']) ? implode(', ', $golfsData['otherEquipment']) : $golfsData['otherEquipment'];


                                $golf->more_details = is_array($golfsData['moreDetails']) ? implode(', ', $golfsData['moreDetails']) : $golfsData['moreDetails'];


                                $golf->save();

                                Golfsimg::where('golf_id', $golf->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $golfsimg = new Golfsimg();
                                    $golfsimg->golf_id = $golf->id;
                                    $golfsimg->picture = $largePath;
                                    $golfsimg->picturesmall = $smallPath;
                                    $golfsimg->picturesxlarge = $xlargePath;
                                    $golfsimg->save();
                                }





                break;








            case 'hunting':



                $huntingsData = $request->input('attributes.huntings');
                Log::info('Huntings Data:', $huntingsData);


                $hunting = Hunting::where('url', $url)->first();

                                $hunting->user_id = $user->id;
                                $hunting->onlinestore_id = $onlinestore_id;

                                $hunting->title = $title;
                                $hunting->price = $price;
                                $hunting->currency = $currency;

                                $hunting->phone = $phone;

                                $hunting->address = $address;
                                $hunting->city = $city;
                                $hunting->country = $country;
                                $hunting->zip = $zip;
                                $hunting->description = $description;

                                $hunting->picture = $thumb;
                                $hunting->startdate  = $startdate ;
                                $hunting->enddate = $enddate;
                                // Storing additional data from huntingsData
                                $hunting->bow_arrow = $huntingsData['bowArrow'] ?? null;
                                $hunting->crossbow = $huntingsData['crossbow'] ?? null;
                                $hunting->decoy = is_array($huntingsData['decoy']) ? implode(', ', $huntingsData['decoy']) : $huntingsData['decoy'];
                                $hunting->game_call = is_array($huntingsData['gameCall']) ? implode(', ', $huntingsData['gameCall']) : $huntingsData['gameCall'];
                                $hunting->binoculars = is_array($huntingsData['binoculars']) ? implode(', ', $huntingsData['binoculars']) : $huntingsData['binoculars'];
                                $hunting->clothing = is_array($huntingsData['clothing']) ? implode(', ', $huntingsData['clothing']) : $huntingsData['clothing'];
                                $hunting->equipment = is_array($huntingsData['equipment']) ? implode(', ', $huntingsData['equipment']) : $huntingsData['equipment'];


                                $hunting->more_details = is_array($huntingsData['moreDetails']) ? implode(', ', $huntingsData['moreDetails']) : $huntingsData['moreDetails'];



                                $hunting->save();


                                Huntingsimg::where('hunting_id', $hunting->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $huntingsimg = new Huntingsimg();
                                    $huntingsimg->hunting_id = $hunting->id;
                                    $huntingsimg->picture = $largePath;
                                    $huntingsimg->picturesmall = $smallPath;
                                    $huntingsimg->picturesxlarge = $xlargePath;
                                    $huntingsimg->save();
                                }




                break;







            case 'gym':


                $musculationsData = $request->input('attributes.musculations');
                Log::info('Musculations Data:', $musculationsData);


                $musculation = Musculation::where('url', $url)->first();

                                $musculation->user_id = $user->id;
                                $musculation->onlinestore_id = $onlinestore_id;

                                $musculation->title = $title;
                                $musculation->price = $price;
                                $musculation->currency = $currency;

                                $musculation->phone = $phone;

                                $musculation->address = $address;
                                $musculation->city = $city;
                                $musculation->country = $country;
                                $musculation->zip = $zip;
                                $musculation->description = $description;

                                $musculation->picture = $thumb;
                                $musculation->startdate  = $startdate ;
                                $musculation->enddate = $enddate;
                                // Storing additional data from musculationsData
                                $musculation->brand_name = is_array($musculationsData['brand']) ? implode(', ', $musculationsData['brand']) : $musculationsData['brand'];
                                $musculation->arms = is_array($musculationsData['arms']) ? implode(', ', $musculationsData['arms']) : $musculationsData['arms'];
                                $musculation->back = is_array($musculationsData['back']) ? implode(', ', $musculationsData['back']) : $musculationsData['back'];
                                $musculation->shoulders = is_array($musculationsData['shoulders']) ? implode(', ', $musculationsData['shoulders']) : $musculationsData['shoulders'];
                                $musculation->glutes = is_array($musculationsData['glutes']) ? implode(', ', $musculationsData['glutes']) : $musculationsData['glutes'];
                                $musculation->legs = is_array($musculationsData['legs']) ? implode(', ', $musculationsData['legs']) : $musculationsData['legs'];
                                $musculation->chest = is_array($musculationsData['chest']) ? implode(', ', $musculationsData['chest']) : $musculationsData['chest'];
                                $musculation->abs = is_array($musculationsData['abs']) ? implode(', ', $musculationsData['abs']) : $musculationsData['abs'];
                                $musculation->cardio_machines = is_array($musculationsData['cardio']) ? implode(', ', $musculationsData['cardio']) : $musculationsData['cardio'];
                                $musculation->dumbbells = is_array($musculationsData['other']) ? implode(', ', $musculationsData['other']) : $musculationsData['other'];


                                $musculation->more_details = is_array($musculationsData['moreDetails']) ? implode(', ', $musculationsData['moreDetails']) : $musculationsData['moreDetails'];



                                $musculation->save();

                                Musculationsimg::where('musculation_id', $musculation->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $musculationsimg = new Musculationsimg();
                                    $musculationsimg->musculation_id = $musculation->id;
                                    $musculationsimg->picture = $largePath;
                                    $musculationsimg->picturesmall = $smallPath;
                                    $musculationsimg->picturesxlarge = $xlargePath;
                                    $musculationsimg->save();
                                }





                break;








            case 'surf':


                $surfsData = $request->input('attributes.surfs');
                Log::info('Surfs Data:', $surfsData);



                $surf = Surf::where('url', $url)->first();

                                $surf->user_id = $user->id;
                                $surf->onlinestore_id = $onlinestore_id;

                                $surf->title = $title;
                                $surf->price = $price;
                                $surf->currency = $currency;

                                $surf->phone = $phone;

                                $surf->address = $address;
                                $surf->city = $city;
                                $surf->country = $country;
                                $surf->zip = $zip;
                                $surf->description = $description;

                                $surf->picture = $thumb;
                                $surf->startdate  = $startdate ;
                                $surf->enddate = $enddate;

                                // Storing additional data from surfsData
                                $surf->surf_category = $surfsData['surfCategory'] ?? null;
                                $surf->board_types = $surfsData['surfTypes'] ?? null;
                                $surf->board_size = $surfsData['surfingSize'] ?? null;
                                $surf->wetsuits = is_array($surfsData['surfWetsuits']) ? implode(', ', $surfsData['surfWetsuits']) : $surfsData['surfWetsuits'];
                                $surf->surf_other = is_array($surfsData['surfOther']) ? implode(', ', $surfsData['surfOther']) : $surfsData['surfOther'];


                                $surf->more_details = is_array($surfsData['moreDetails']) ? implode(', ', $surfsData['moreDetails']) : $surfsData['moreDetails'];



                                $surf->save();

                                Surfsimg::where('surf_id', $surf->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $surfsimg = new Surfsimg();
                                    $surfsimg->surf_id = $surf->id;
                                    $surfsimg->picture = $largePath;
                                    $surfsimg->picturesmall = $smallPath;
                                    $surfsimg->picturesxlarge = $xlargePath;
                                    $surfsimg->save();
                                }




                break;







            case 'tennis':


                $tennisData = $request->input('attributes.tennis');
                Log::info('Tennis Data:', $tennisData);


                $tennis = Tennis::where('url', $url)->first();

                                $tennis->user_id = $user->id;
                                $tennis->onlinestore_id = $onlinestore_id;

                                $tennis->title = $title;
                                $tennis->price = $price;
                                $tennis->currency = $currency;

                                $tennis->phone = $phone;

                                $tennis->address = $address;
                                $tennis->city = $city;
                                $tennis->country = $country;
                                $tennis->zip = $zip;
                                $tennis->description = $description;

                                $tennis->picture = $thumb;
                                $tennis->startdate  = $startdate ;
                                $tennis->enddate = $enddate;
                                $tennis->terrain_dimensions = $tennisData['tennisTerrain'] ?? null;
                                $tennis->brand = $tennisData['brandName'] ?? null;
                                $tennis->clothing = is_array($tennisData['clothing']) ? implode(', ', $tennisData['clothing']) : $tennisData['clothing'];


                                $tennis->more_details = is_array($tennisData['moreDetails']) ? implode(', ', $tennisData['moreDetails']) : $tennisData['moreDetails'];


                                $tennis->save();

                                Tennisimg::where('tennis_id', $tennis->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $Tennisimg = new Tennisimg();
                                    $Tennisimg->tennis_id = $tennis->id;
                                    $Tennisimg->picture = $largePath;
                                    $Tennisimg->picturesmall = $smallPath;
                                    $Tennisimg->picturesxlarge = $xlargePath;
                                    $Tennisimg->save();
                                }





                break;







            case 'audio':


                $audiosData = $request->input('attributes.audios');
                Log::info('Audios Data:', $audiosData);


                $audio = Audio::where('url', $url)->first();

                                $audio->user_id = $user->id;
                                $audio->onlinestore_id = $onlinestore_id;

                                $audio->title = $title;
                                $audio->price = $price;
                                $audio->currency = $currency;

                                $audio->phone = $phone;

                                $audio->address = $address;
                                $audio->city = $city;
                                $audio->country = $country;
                                $audio->zip = $zip;
                                $audio->description = $description;

                                $audio->picture = $thumb;
                                $audio->startdate  = $startdate ;
                                $audio->enddate = $enddate;


                                // Storing additional data from audiosData
                                $audio->audio_type = $audiosData['audioType'] ?? null;
                                $audio->sound_quality = $audiosData['soundQuality'] ?? null;
                                $audio->connectivity = is_array($audiosData['connectivity']) ? implode(', ', $audiosData['connectivity']) : $audiosData['connectivity'];
                                $audio->max_wireless_range = $audiosData['maxWirelessRange'] ?? null;
                                $audio->battery_life = $audiosData['batteryLife'] ?? null;
                                $audio->charging_time = $audiosData['chargingTime'] ?? null;
                                $audio->condition = $audiosData['condition'] ?? null;
                                $audio->compatibility = is_array($audiosData['compatibility']) ? implode(', ', $audiosData['compatibility']) : $audiosData['compatibility'];


                                $audio->more_details = is_array($audiosData['moreDetails']) ? implode(', ', $audiosData['moreDetails']) : $audiosData['moreDetails'];


                                $audio->save();

                                Audiosimg::where('audio_id', $audio->id)->delete();






                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $audiosimg = new Audiosimg();
                                    $audiosimg->audio_id = $audio->id;
                                    $audiosimg->picture = $largePath;
                                    $audiosimg->picturesmall = $smallPath;
                                    $audiosimg->picturesxlarge = $xlargePath;
                                    $audiosimg->save();
                                }




                break;







            case 'cameras':


                $camerasData = $request->input('attributes.cameras');
                Log::info('Cameras Data:', $camerasData);




                $camera = Camera::where('url', $url)->first();

                                $camera->user_id = $user->id;
                                $camera->onlinestore_id = $onlinestore_id;

                                $camera->title = $title;
                                $camera->price = $price;
                                $camera->currency = $currency;

                                $camera->phone = $phone;

                                $camera->address = $address;
                                $camera->city = $city;
                                $camera->country = $country;
                                $camera->zip = $zip;
                                $camera->description = $description;

                                $camera->picture = $thumb;
                                $camera->startdate  = $startdate ;
                                $camera->enddate = $enddate;
                                // Storing additional data from camerasData
                                $camera->photo_size = $camerasData['photoSize'] ?? null;
                                $camera->sensor_size = $camerasData['sensorSize'] ?? null;
                                $camera->image_stabilization = $camerasData['imageStabilization'] ?? null;
                                $camera->shutter_speed = $camerasData['shutterSpeed'] ?? null;
                                $camera->exposure_control = $camerasData['exposureControl'] ?? null;
                                $camera->image_resolution = $camerasData['imageResolution'] ?? null;
                                $camera->condition = $camerasData['condition'] ?? null;
                                $camera->connectivity = is_array($camerasData['connectivity']) ? implode(', ', $camerasData['connectivity']) : $camerasData['connectivity'];
                                $camera->memory = $camerasData['memory'] ?? null;
                                $camera->lens = $camerasData['lens'] ?? null;


                                $camera->more_details = is_array($camerasData['moreDetails']) ? implode(', ', $camerasData['moreDetails']) : $camerasData['moreDetails'];



                                $camera->save();

                                Camerasimg::where('camera_id', $camera->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $camerasimg = new Camerasimg();
                                    $camerasimg->camera_id = $camera->id;
                                    $camerasimg->picture = $largePath;
                                    $camerasimg->picturesmall = $smallPath;
                                    $camerasimg->picturesxlarge = $xlargePath;
                                    $camerasimg->save();
                                }




                break;






            case 'chargers':


                $chargersData = $request->input('attributes.chargers');
                Log::info('Chargers Data:', $chargersData);

                $charger = Charger::where('url', $url)->first();

                                $charger->user_id = $user->id;
                                $charger->onlinestore_id = $onlinestore_id;

                                $charger->title = $title;
                                $charger->price = $price;
                                $charger->currency = $currency;

                                $charger->phone = $phone;

                                $charger->address = $address;
                                $charger->city = $city;
                                $charger->country = $country;
                                $charger->zip = $zip;
                                $charger->description = $description;

                                $charger->picture = $thumb;
                                $charger->startdate  = $startdate ;
                                $charger->enddate = $enddate;
                                // Storing additional data from chargersData
                                $charger->compatibility = is_array($chargersData['compatibility']) ? implode(', ', $chargersData['compatibility']) : $chargersData['compatibility'];
                                $charger->number_of_ports = $chargersData['numberOfPorts'] ?? null;
                                $charger->length = $chargersData['length'] ?? null;
                                $charger->input_voltage = $chargersData['inputVoltage'] ?? null;
                                $charger->wattage = $chargersData['wattage'] ?? null;
                                $charger->condition = $chargersData['condition'] ?? null;
                                $charger->connector_type = $chargersData['connectorType'] ?? null;
                                $charger->amperage = $chargersData['amperage'] ?? null;


                                $charger->more_details = is_array($chargersData['moreDetails']) ? implode(', ', $chargersData['moreDetails']) : $chargersData['moreDetails'];



                                $charger->save();

                                Chargersimg::where('charger_id', $charger->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $chargersimg = new Chargersimg();
                                    $chargersimg->charger_id = $charger->id;
                                    $chargersimg->picture = $largePath;
                                    $chargersimg->picturesmall = $smallPath;
                                    $chargersimg->picturesxlarge = $xlargePath;
                                    $chargersimg->save();
                                }





                break;






            case 'drones':



                $dronesData = $request->input('attributes.drones');
                Log::info('Drones Data:', $dronesData);

                $drone = Drone::where('url', $url)->first();

                                $drone->user_id = $user->id;
                                $drone->onlinestore_id = $onlinestore_id;

                                $drone->title = $title;
                                $drone->price = $price;
                                $drone->currency = $currency;

                                $drone->phone = $phone;

                                $drone->address = $address;
                                $drone->city = $city;
                                $drone->country = $country;
                                $drone->zip = $zip;
                                $drone->description = $description;

                                $drone->picture = $thumb;
                                $drone->startdate  = $startdate ;
                                $drone->enddate = $enddate;
                                // Storing additional data from dronesData
                                $drone->flight_time = $dronesData['flightTime'] ?? null;
                                $drone->battery_life = $dronesData['batteryLife'] ?? null;
                                $drone->condition = $dronesData['condition'] ?? null;
                                $drone->video_resolution = $dronesData['videoResolution'] ?? null;
                                $drone->connectivity = is_array($dronesData['connectivity']) ? implode(', ', $dronesData['connectivity']) : $dronesData['connectivity'];
                                $drone->battery_capacity = $dronesData['batteryCapacity'] ?? null;
                                $drone->memory = $dronesData['memory'] ?? null;
                                $drone->image_resolution = $dronesData['imageResolution'] ?? null;
                                $drone->included_components = is_array($dronesData['includedComponents']) ? implode(', ', $dronesData['includedComponents']) : $dronesData['includedComponents'];
                                $drone->remote_control = $dronesData['remoteControl'] ?? null;
                                $drone->max_distance = $dronesData['maxDistance'] ?? null;


                                $drone->more_details = is_array($dronesData['moreDetails']) ? implode(', ', $dronesData['moreDetails']) : $dronesData['moreDetails'];



                                $drone->save();

                                Dronesimg::where('drone_id', $drone->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $dronesimg = new Dronesimg();
                                    $dronesimg->drone_id = $drone->id;
                                    $dronesimg->picture = $largePath;
                                    $dronesimg->picturesmall = $smallPath;
                                    $dronesimg->picturesxlarge = $xlargePath;
                                    $dronesimg->save();
                                }





                break;









            case 'gaming':



                $gamingsData = $request->input('attributes.gamings');
                Log::info('Gamings Data:', $gamingsData);

                $gaming = Gaming::where('url', $url)->first();

                                $gaming->user_id = $user->id;
                                $gaming->onlinestore_id = $onlinestore_id;

                                $gaming->title = $title;
                                $gaming->price = $price;
                                $gaming->currency = $currency;

                                $gaming->phone = $phone;

                                $gaming->address = $address;
                                $gaming->city = $city;
                                $gaming->country = $country;
                                $gaming->zip = $zip;
                                $gaming->description = $description;

                                $gaming->picture = $thumb;
                                $gaming->startdate  = $startdate ;
                                $gaming->enddate = $enddate;
                                // Storing additional data from gamingsData
                                $gaming->storage = $gamingsData['storage'] ?? null;
                                $gaming->connectivity = is_array($gamingsData['connectivity']) ? implode(', ', $gamingsData['connectivity']) : $gamingsData['connectivity'];
                                $gaming->ports = is_array($gamingsData['ports']) ? implode(', ', $gamingsData['ports']) : $gamingsData['ports'];
                                $gaming->online_services = $gamingsData['onlineServices'] ?? null;
                                $gaming->condition = $gamingsData['condition'] ?? null;
                                $gaming->games = is_array($gamingsData['games']) ? implode(', ', $gamingsData['games']) : $gamingsData['games'];
                                $gaming->controllers = is_array($gamingsData['controller']) ? implode(', ', $gamingsData['controller']) : $gamingsData['controller'];


                                $gaming->more_details = is_array($gamingsData['moreDetails']) ? implode(', ', $gamingsData['moreDetails']) : $gamingsData['moreDetails'];



                                $gaming->save();

                                Gamingsimg::where('gaming_id', $gaming->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $gamingsimg = new Gamingsimg();
                                    $gamingsimg->gaming_id = $gaming->id;
                                    $gamingsimg->picture = $largePath;
                                    $gamingsimg->picturesmall = $smallPath;
                                    $gamingsimg->picturesxlarge = $xlargePath;
                                    $gamingsimg->save();
                                }




                break;







            case 'laptops':


                $laptopsData = $request->input('attributes.laptops');
                Log::info('Laptops Data:', $laptopsData);

                $laptop = Laptop::where('url', $url)->first();

                                $laptop->user_id = $user->id;
                                $laptop->onlinestore_id = $onlinestore_id;

                                $laptop->title = $title;
                                $laptop->price = $price;
                                $laptop->currency = $currency;

                                $laptop->phone = $phone;

                                $laptop->address = $address;
                                $laptop->city = $city;
                                $laptop->country = $country;
                                $laptop->zip = $zip;
                                $laptop->description = $description;

                                $laptop->picture = $thumb;
                                $laptop->startdate  = $startdate ;
                                $laptop->enddate = $enddate;

                                // Storing additional data from laptopsData
                                $laptop->ram = $laptopsData['ram'] ?? null;
                                $laptop->graphics_card = $laptopsData['graphicsCard'] ?? null;
                                $laptop->operating_system = $laptopsData['operatingSystem'] ?? null;
                                $laptop->number_ports = is_array($laptopsData['numberPorts']) ? implode(', ', $laptopsData['numberPorts']) : $laptopsData['numberPorts'];
                                $laptop->battery_life = $laptopsData['batteryLife'] ?? null;
                                $laptop->drive_storage = $laptopsData['storage'] ?? null;
                                $laptop->resolution = $laptopsData['resolution'] ?? null;
                                $laptop->weight = $laptopsData['weight'] ?? null;
                                $laptop->screen_size = $laptopsData['screenSize'] ?? null;
                                $laptop->cpu = $laptopsData['cpu'] ?? null;
                                $laptop->condition = $laptopsData['condition'] ?? null;


                                $laptop->more_details = is_array($laptopsData['moreDetails']) ? implode(', ', $laptopsData['moreDetails']) : $laptopsData['moreDetails'];



                                $laptop->save();

                                Laptopsimg::where('laptop_id', $laptop->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $laptopsimg = new Laptopsimg();
                                    $laptopsimg->laptop_id = $laptop->id;
                                    $laptopsimg->picture = $largePath;
                                    $laptopsimg->picturesmall = $smallPath;
                                    $laptopsimg->picturesxlarge = $xlargePath;
                                    $laptopsimg->save();
                                }




                break;








            case 'lighting':


                $lightingsData = $request->input('attributes.lightings');
                Log::info('Lightings Data:', $lightingsData);


                $lighting = Lighting::where('url', $url)->first();

                                $lighting->user_id = $user->id;
                                $lighting->onlinestore_id = $onlinestore_id;

                                $lighting->title = $title;
                                $lighting->price = $price;
                                $lighting->currency = $currency;

                                $lighting->phone = $phone;

                                $lighting->address = $address;
                                $lighting->city = $city;
                                $lighting->country = $country;
                                $lighting->zip = $zip;
                                $lighting->description = $description;

                                $lighting->picture = $thumb;
                                $lighting->startdate  = $startdate ;
                                $lighting->enddate = $enddate;
                                // Storing additional data from lightingsData
                                $lighting->connectivity = is_array($lightingsData['connectivity']) ? implode(', ', $lightingsData['connectivity']) : $lightingsData['connectivity'];
                                $lighting->included_accessories = is_array($lightingsData['includedAccessories']) ? implode(', ', $lightingsData['includedAccessories']) : $lightingsData['includedAccessories'];
                                $lighting->condition = $lightingsData['condition'] ?? null;
                                $lighting->color_temperature = is_array($lightingsData['colorTemperature']) ? implode(', ', $lightingsData['colorTemperature']) : $lightingsData['colorTemperature'];
                                $lighting->compatibility = is_array($lightingsData['compatibility']) ? implode(', ', $lightingsData['compatibility']) : $lightingsData['compatibility'];


                                $lighting->more_details = is_array($lightingsData['moreDetails']) ? implode(', ', $lightingsData['moreDetails']) : $lightingsData['moreDetails'];



                                $lighting->save();

                                Lightingsimg::where('lighting_id', $lighting->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $lightingsimg = new Lightingsimg();
                                    $lightingsimg->lighting_id = $lighting->id;
                                    $lightingsimg->picture = $largePath;
                                    $lightingsimg->picturesmall = $smallPath;
                                    $lightingsimg->picturesxlarge = $xlargePath;
                                    $lightingsimg->save();
                                }




                break;








            case 'printers':

                $printersData = $request->input('attributes.printers');
                Log::info('Printers Data:', $printersData);



                $printer = Printer::where('url', $url)->first();

                                $printer->user_id = $user->id;
                                $printer->onlinestore_id = $onlinestore_id;

                                $printer->title = $title;
                                $printer->price = $price;
                                $printer->currency = $currency;

                                $printer->phone = $phone;

                                $printer->address = $address;
                                $printer->city = $city;
                                $printer->country = $country;
                                $printer->zip = $zip;
                                $printer->description = $description;

                                $printer->picture = $thumb;
                                $printer->startdate  = $startdate ;
                                $printer->enddate = $enddate;
                                // Storing additional data from printersData
                                $printer->print_speed = $printersData['printSpeed'] ?? null;
                                $printer->print_resolution = is_array($printersData['printResolution']) ? implode(', ', $printersData['printResolution']) : $printersData['printResolution'];
                                $printer->connectivity = is_array($printersData['connectivity']) ? implode(', ', $printersData['connectivity']) : $printersData['connectivity'];
                                $printer->paper_size = is_array($printersData['paperSize']) ? implode(', ', $printersData['paperSize']) : $printersData['paperSize'];
                                $printer->compatible = is_array($printersData['compatibleInk']) ? implode(', ', $printersData['compatibleInk']) : $printersData['compatibleInk'];
                                $printer->condition = $printersData['condition'] ?? null;
                                $printer->input_sheets = $printersData['inputSheets'] ?? null;
                                $printer->print_media = is_array($printersData['printMedia']) ? implode(', ', $printersData['printMedia']) : $printersData['printMedia'];


                                $printer->more_details = is_array($printersData['moreDetails']) ? implode(', ', $printersData['moreDetails']) : $printersData['moreDetails'];



                                $printer->save();

                                Printersimg::where('printer_id', $printer->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $printersimg = new Printersimg();
                                    $printersimg->printer_id = $printer->id;
                                    $printersimg->picture = $largePath;
                                    $printersimg->picturesmall = $smallPath;
                                    $printersimg->picturesxlarge = $xlargePath;
                                    $printersimg->save();
                                }




                break;






            case 'routers':


                $routersData = $request->input('attributes.routers');
                Log::info('Routers Data:', $routersData);


                $router = Router::where('url', $url)->first();

                                $router->user_id = $user->id;
                                $router->onlinestore_id = $onlinestore_id;

                                $router->title = $title;
                                $router->price = $price;
                                $router->currency = $currency;
                                $router->phone = $phone;

                                $router->address = $address;
                                $router->city = $city;
                                $router->country = $country;
                                $router->zip = $zip;
                                $router->description = $description;

                                $router->picture = $thumb;
                                $router->startdate  = $startdate ;
                                $router->enddate = $enddate;
                                // Storing additional data from routersData
                                $router->gbps_speed = $routersData['gbpsSpeed'] ?? null;
                                $router->wireless = $routersData['wireless'] ?? null;
                                $router->frequency = $routersData['frequency'] ?? null;
                                $router->connectivity = is_array($routersData['connectivity']) ? implode(', ', $routersData['connectivity']) : $routersData['connectivity'];
                                $router->antennas = $routersData['antennas'] ?? null;
                                $router->condition = $routersData['condition'] ?? null;
                                $router->compatible = is_array($routersData['compatible']) ? implode(', ', $routersData['compatible']) : $routersData['compatible'];
                                $router->signal_coverage = $routersData['signalCoverage'] ?? null;


                                $router->more_details = is_array($routersData['moreDetails']) ? implode(', ', $routersData['moreDetails']) : $routersData['moreDetails'];



                                $router->save();

                                Routersimg::where('router_id', $router->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $routersimg = new Routersimg();
                                    $routersimg->router_id = $router->id;
                                    $routersimg->picture = $largePath;
                                    $routersimg->picturesmall = $smallPath;
                                    $routersimg->picturesxlarge = $xlargePath;
                                    $routersimg->save();
                                }





                break;







            case 'tablets':


                $tablettesData = $request->input('attributes.tablettes');
                Log::info('Tablettes Data:', $tablettesData);


                $tablette = Tablette::where('url', $url)->first();

                                $tablette->user_id = $user->id;
                                $tablette->onlinestore_id = $onlinestore_id;

                                $tablette->title = $title;
                                $tablette->price = $price;
                                $tablette->currency = $currency;

                                $tablette->phone = $phone;

                                $tablette->address = $address;
                                $tablette->city = $city;
                                $tablette->country = $country;
                                $tablette->zip = $zip;
                                $tablette->description = $description;

                                $tablette->picture = $thumb;
                                $tablette->startdate  = $startdate ;
                                $tablette->enddate = $enddate;
                                // Storing additional data from tablettesData
                                $tablette->operating_system = $tablettesData['operatingSystem'] ?? null;
                                $tablette->ram = $tablettesData['ram'] ?? null;
                                $tablette->storage = $tablettesData['storage'] ?? null;
                                $tablette->display_size = $tablettesData['displaySize'] ?? null;
                                $tablette->display_resolution = $tablettesData['displayResolution'] ?? null;
                                $tablette->connectivity = is_array($tablettesData['connectivity']) ? implode(', ', $tablettesData['connectivity']) : $tablettesData['connectivity'];
                                $tablette->condition = $tablettesData['condition'] ?? null;


                                $tablette->more_details = is_array($tablettesData['moreDetails']) ? implode(', ', $tablettesData['moreDetails']) : $tablettesData['moreDetails'];



                                $tablette->save();

                                Tablettesimg::where('tablette_id', $tablette->id)->delete();







                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $tablettesimg = new Tablettesimg();
                                    $tablettesimg->tablette_id = $tablette->id;
                                    $tablettesimg->picture = $largePath;
                                    $tablettesimg->picturesmall = $smallPath;
                                    $tablettesimg->picturesxlarge = $xlargePath;
                                    $tablettesimg->save();
                                }



                break;







            case 'eclairage':


                $eclairagesData = $request->input('attributes.eclairages');
                Log::info('Eclairages Data:', $eclairagesData);


                $eclairage = Eclairage::where('url', $url)->first();

                                $eclairage->user_id = $user->id;
                                $eclairage->onlinestore_id = $onlinestore_id;

                                $eclairage->title = $title;
                                $eclairage->price = $price;
                                $eclairage->currency = $currency;

                                $eclairage->phone = $phone;

                                $eclairage->address = $address;
                                $eclairage->city = $city;
                                $eclairage->country = $country;
                                $eclairage->zip = $zip;
                                $eclairage->description = $description;

                                $eclairage->picture = $thumb;
                                $eclairage->startdate  = $startdate ;
                                $eclairage->enddate = $enddate;

                                // Storing additional data from eclairagesData
                                $eclairage->brand_name = $eclairagesData['brandName'] ?? null;
                                $eclairage->size = $eclairagesData['size'] ?? null;
                                $eclairage->voltage = $eclairagesData['voltage'] ?? null;
                                $eclairage->chandeliers = is_array($eclairagesData['chandeliers']) ? implode(', ', $eclairagesData['chandeliers']) : $eclairagesData['chandeliers'];
                                $eclairage->lamps = is_array($eclairagesData['lamps']) ? implode(', ', $eclairagesData['lamps']) : $eclairagesData['lamps'];
                                $eclairage->light_fixtures = is_array($eclairagesData['light']) ? implode(', ', $eclairagesData['light']) : $eclairagesData['light'];
                                $eclairage->projectors = is_array($eclairagesData['projectors']) ? implode(', ', $eclairagesData['projectors']) : $eclairagesData['projectors'];
                                $eclairage->leds = is_array($eclairagesData['led']) ? implode(', ', $eclairagesData['led']) : $eclairagesData['led'];
                                $eclairage->power_source = $eclairagesData['power'] ?? null;
                                $eclairage->light_source = $eclairagesData['lightSourceType'] ?? null;
                                $eclairage->light_color = is_array($eclairagesData['lightColor']) ? implode(', ', $eclairagesData['lightColor']) : $eclairagesData['lightColor'];
                                $eclairage->lighting_method = is_array($eclairagesData['lightingMethod']) ? implode(', ', $eclairagesData['lightingMethod']) : $eclairagesData['lightingMethod'];
                                $eclairage->controller = $eclairagesData['controller'] ?? null;
                                $eclairage->other = is_array($eclairagesData['other']) ? implode(', ', $eclairagesData['other']) : $eclairagesData['other'];


                                $eclairage->more_details = is_array($eclairagesData['moreDetails']) ? implode(', ', $eclairagesData['moreDetails']) : $eclairagesData['moreDetails'];



                                $eclairage->save();

                                Eclairagesimg::where('eclairage_id', $eclairage->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $eclairagesimg = new Eclairagesimg();
                                    $eclairagesimg->eclairage_id = $eclairage->id;
                                    $eclairagesimg->picture = $largePath;
                                    $eclairagesimg->picturesmall = $smallPath;
                                    $eclairagesimg->picturesxlarge = $xlargePath;
                                    $eclairagesimg->save();
                                }




                break;







            case 'mobilier':


                $mobiliersData = $request->input('attributes.mobiliers');
                Log::info('Mobiliers Data:', $mobiliersData);


                $mobilier = Mobilier::where('url', $url)->first();

                                $mobilier->user_id = $user->id;
                                $mobilier->onlinestore_id = $onlinestore_id;

                                $mobilier->title = $title;
                                $mobilier->price = $price;
                                $mobilier->currency = $currency;

                                $mobilier->phone = $phone;

                                $mobilier->address = $address;
                                $mobilier->city = $city;
                                $mobilier->country = $country;
                                $mobilier->zip = $zip;
                                $mobilier->description = $description;

                                $mobilier->picture = $thumb;
                                $mobilier->startdate  = $startdate ;
                                $mobilier->enddate = $enddate;
                                // Storing additional data from mobiliersData
                                $mobilier->material = is_array($mobiliersData['material']) ? implode(', ', $mobiliersData['material']) : $mobiliersData['material'];
                                $mobilier->theme = $mobiliersData['theme'] ?? null;
                                $mobilier->plant_decorations = is_array($mobiliersData['plantDecorations']) ? implode(', ', $mobiliersData['plantDecorations']) : $mobiliersData['plantDecorations'];
                                $mobilier->light_decorations = is_array($mobiliersData['lightDecorations']) ? implode(', ', $mobiliersData['lightDecorations']) : $mobiliersData['lightDecorations'];
                                $mobilier->festive_decorations = $mobiliersData['festiveDecorations'] ?? null;
                                $mobilier->others = is_array($mobiliersData['otherEquipment']) ? implode(', ', $mobiliersData['otherEquipment']) : $mobiliersData['otherEquipment'];


                                $mobilier->more_details = is_array($mobiliersData['moreDetails']) ? implode(', ', $mobiliersData['moreDetails']) : $mobiliersData['moreDetails'];



                                $mobilier->save();

                                Mobiliersimg::where('mobilier_id', $mobilier->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $mobiliersimg = new Mobiliersimg();
                                    $mobiliersimg->mobilier_id = $mobilier->id;
                                    $mobiliersimg->picture = $largePath;
                                    $mobiliersimg->picturesmall = $smallPath;
                                    $mobiliersimg->picturesxlarge = $xlargePath;
                                    $mobiliersimg->save();
                                }




                break;







            case 'photography':


                $photographiesData = $request->input('attributes.photographies');
                Log::info('Photographies Data:', $photographiesData);

                $photographie = Photographie::where('url', $url)->first();

                                $photographie->user_id = $user->id;
                                $photographie->onlinestore_id = $onlinestore_id;

                                $photographie->title = $title;
                                $photographie->price = $price;
                                $photographie->currency = $currency;

                                $photographie->phone = $phone;

                                $photographie->address = $address;
                                $photographie->city = $city;
                                $photographie->country = $country;
                                $photographie->zip = $zip;
                                $photographie->description = $description;

                                $photographie->picture = $thumb;
                                $photographie->startdate  = $startdate ;
                                $photographie->enddate = $enddate;
                                // Storing additional data from photographiesData
                                $photographie->size = $photographiesData['size'] ?? null;
                                $photographie->battery = $photographiesData['battery'] ?? null;
                                $photographie->brand_name = $photographiesData['brand'] ?? null;
                                $photographie->camera = is_array($photographiesData['camera']) ? implode(', ', $photographiesData['camera']) : $photographiesData['camera'];
                                $photographie->sensor = is_array($photographiesData['sensor']) ? implode(', ', $photographiesData['sensor']) : $photographiesData['sensor'];
                                $photographie->angle = is_array($photographiesData['wideAngle']) ? implode(', ', $photographiesData['wideAngle']) : $photographiesData['wideAngle'];
                                $photographie->lcd = is_array($photographiesData['lcd']) ? implode(', ', $photographiesData['lcd']) : $photographiesData['lcd'];
                                $photographie->other_equipment = is_array($photographiesData['otherEquipment']) ? implode(', ', $photographiesData['otherEquipment']) : $photographiesData['otherEquipment'];


                                $photographie->more_details = is_array($photographiesData['moreDetails']) ? implode(', ', $photographiesData['moreDetails']) : $photographiesData['moreDetails'];


                                $photographie->save();

                                Photographiesimg::where('photographie_id', $photographie->id)->delete();






                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $photographiesimg = new Photographiesimg();
                                    $photographiesimg->photographie_id = $photographie->id;
                                    $photographiesimg->picture = $largePath;
                                    $photographiesimg->picturesmall = $smallPath;
                                    $photographiesimg->picturesxlarge = $xlargePath;
                                    $photographiesimg->save();
                                }



                break;






            case 'sound-systems':


                $sonorisationsData = $request->input('attributes.sonorisations');
                Log::info('Sonorisations Data:', $sonorisationsData);



                $sonorisation = Sonorisation::where('url', $url)->first();

                                $sonorisation->user_id = $user->id;
                                $sonorisation->onlinestore_id = $onlinestore_id;

                                $sonorisation->title = $title;
                                $sonorisation->price = $price;
                                $sonorisation->currency = $currency;

                                $sonorisation->phone = $phone;

                                $sonorisation->address = $address;
                                $sonorisation->city = $city;
                                $sonorisation->country = $country;
                                $sonorisation->zip = $zip;
                                $sonorisation->description = $description;

                                $sonorisation->picture = $thumb;
                                $sonorisation->startdate  = $startdate ;
                                $sonorisation->enddate = $enddate;
                                // Storing additional data from sonorisationsData
                                $sonorisation->brand_name = $sonorisationsData['brand'] ?? null;
                                $sonorisation->size = $sonorisationsData['size'] ?? null;
                                $sonorisation->connectivity = $sonorisationsData['connectivityTechnology'] ?? null;
                                $sonorisation->fastener_type = $sonorisationsData['fastenerType'] ?? null;
                                $sonorisation->power_source = $sonorisationsData['powerSource'] ?? null;
                                $sonorisation->output_power = $sonorisationsData['outputPower'] ?? null;
                                $sonorisation->number_of_channels = $sonorisationsData['numberOfChannels'] ?? null;
                                $sonorisation->compatibility = $sonorisationsData['deviceCompatibility'] ?? null;
                                $sonorisation->power_watts = $sonorisationsData['powerInWatts'] ?? null;
                                $sonorisation->power_type = is_array($sonorisationsData['powerType']) ? implode(', ', $sonorisationsData['powerType']) : $sonorisationsData['powerType'];
                                $sonorisation->battery = is_array($sonorisationsData['battery']) ? implode(', ', $sonorisationsData['battery']) : $sonorisationsData['battery'];
                                $sonorisation->weight = $sonorisationsData['weight'] ?? null;
                                $sonorisation->microphone = is_array($sonorisationsData['microphone']) ? implode(', ', $sonorisationsData['microphone']) : $sonorisationsData['microphone'];
                                $sonorisation->mixage_table = $sonorisationsData['mixageTable'] ?? null;
                                $sonorisation->amplifier = $sonorisationsData['amplifier'] ?? null;
                                $sonorisation->cables_connectors = is_array($sonorisationsData['cablesAndConnectors']) ? implode(', ', $sonorisationsData['cablesAndConnectors']) : $sonorisationsData['cablesAndConnectors'];
                                $sonorisation->speaker = is_array($sonorisationsData['speaker']) ? implode(', ', $sonorisationsData['speaker']) : $sonorisationsData['speaker'];


                                $sonorisation->more_details = is_array($sonorisationsData['moreDetails']) ? implode(', ', $sonorisationsData['moreDetails']) : $sonorisationsData['moreDetails'];



                                $sonorisation->save();

                                Sonorisationsimg::where('sonorisation_id', $sonorisation->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $sonorisationsimg = new Sonorisationsimg();
                                    $sonorisationsimg->sonorisation_id = $sonorisation->id;
                                    $sonorisationsimg->picture = $largePath;
                                    $sonorisationsimg->picturesmall = $smallPath;
                                    $sonorisationsimg->picturesxlarge = $xlargePath;
                                    $sonorisationsimg->save();
                                }




                break;







            case 'tents':


                $tentesData = $request->input('attributes.tentes');
                Log::info('Tentes Data:', $tentesData);


                $tente = Tente::where('url', $url)->first();

                                $tente->user_id = $user->id;
                                $tente->onlinestore_id = $onlinestore_id;

                                $tente->title = $title;
                                $tente->price = $price;
                                $tente->currency = $currency;

                                $tente->phone = $phone;

                                $tente->address = $address;
                                $tente->city = $city;
                                $tente->country = $country;
                                $tente->zip = $zip;
                                $tente->description = $description;

                                $tente->picture = $thumb;
                                $tente->startdate  = $startdate ;
                                $tente->enddate = $enddate;
                                $tente->material = $tentesData['material'] ?? null;
                                $tente->style = $tentesData['style'] ?? null;
                                $tente->fabric_type = $tentesData['fabric'] ?? null;
                                $tente->otherEquipment = is_array($tentesData['otherEquipment']) ? implode(', ', $tentesData['otherEquipment']) : $tentesData['otherEquipment'];


                                $tente->more_details = is_array($tentesData['moreDetails']) ? implode(', ', $tentesData['moreDetails']) : $tentesData['moreDetails'];



                                $tente->save();

                                Tentesimg::where('tente_id', $tente->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $tentesimg = new Tentesimg();
                                    $tentesimg->tente_id = $tente->id;
                                    $tentesimg->picture = $largePath;
                                    $tentesimg->picturesmall = $smallPath;
                                    $tentesimg->picturesxlarge = $xlargePath;
                                    $tentesimg->save();
                                }



                break;






            case 'clothes':



                $clothesData = $request->input('attributes.clothes');
                Log::info('Clothes Data:', $clothesData);



                $clothes = Clothes::where('url', $url)->first();

                                $clothes->user_id = $user->id;
                                $clothes->onlinestore_id = $onlinestore_id;

                                $clothes->title = $title;
                                $clothes->price = $price;
                                $clothes->currency = $currency;

                                $clothes->phone = $phone;

                                $clothes->address = $address;
                                $clothes->city = $city;
                                $clothes->country = $country;
                                $clothes->zip = $zip;
                                $clothes->description = $description;

                                $clothes->picture = $thumb;
                                $clothes->startdate  = $startdate ;
                                $clothes->enddate = $enddate;
                                // Storing additional data from clothesData
                                $clothes->number_of_pieces = $clothesData['numberOfPieces'] ?? null;
                                $clothes->closure_type = $clothesData['closureType'] ?? null;
                                $clothes->strap_type = is_array($clothesData['strapType']) ? implode(', ', $clothesData['strapType']) : $clothesData['strapType'];
                                $clothes->number_of_pockets = $clothesData['numberOfPockets'] ?? null;
                                $clothes->heel_height = $clothesData['heelHeight'] ?? null;
                                $clothes->condition = $clothesData['condition'] ?? null;
                                $clothes->color = $clothesData['color'] ?? null;


                                $clothes->more_details = is_array($clothesData['moreDetails']) ? implode(', ', $clothesData['moreDetails']) : $clothesData['moreDetails'];



                                $clothes->save();

                                Clothesimg::where('clothes_id', $clothes->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $clothessimg = new Clothesimg();
                                    $clothessimg->clothes_id = $clothes->id;
                                    $clothessimg->picture = $largePath;
                                    $clothessimg->picturesmall = $smallPath;
                                    $clothessimg->picturesxlarge = $xlargePath;
                                    $clothessimg->save();
                                }



                break;







            case 'jewelry':


                $jewelrysData = $request->input('attributes.jewelrys');
                Log::info('Jewelrys Data:', $jewelrysData);



                $jewelry = Jewelry::where('url', $url)->first();

                                $jewelry->user_id = $user->id;
                                $jewelry->onlinestore_id = $onlinestore_id;

                                $jewelry->title = $title;
                                $jewelry->price = $price;
                                $jewelry->currency = $currency;

                                $jewelry->phone = $phone;

                                $jewelry->address = $address;
                                $jewelry->city = $city;
                                $jewelry->country = $country;
                                $jewelry->zip = $zip;
                                $jewelry->description = $description;

                                $jewelry->picture = $thumb;
                                $jewelry->startdate  = $startdate ;
                                $jewelry->enddate = $enddate;
                                // Storing additional data from jewelrysData
                                $jewelry->type = $jewelrysData['type'] ?? null;
                                $jewelry->materials = $jewelrysData['material'] ?? null;
                                $jewelry->occasion = $jewelrysData['occasion'] ?? null;
                                $jewelry->chain_type = $jewelrysData['chainType'] ?? null;
                                $jewelry->gem_type = $jewelrysData['gemType'] ?? null;
                                $jewelry->color = $jewelrysData['color'] ?? null;
                                $jewelry->closure_type = is_array($jewelrysData['closureType']) ? implode(', ', $jewelrysData['closureType']) : $jewelrysData['closureType'];
                                $jewelry->condition = $jewelrysData['condition'] ?? null;


                                $jewelry->more_details = is_array($jewelrysData['moreDetails']) ? implode(', ', $jewelrysData['moreDetails']) : $jewelrysData['moreDetails'];



                                $jewelry->save();

                                Jewelrysimg::where('jewelry_id', $jewelry->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $jewelrysimg = new Jewelrysimg();
                                    $jewelrysimg->jewelry_id = $jewelry->id;
                                    $jewelrysimg->picture = $largePath;
                                    $jewelrysimg->picturesmall = $smallPath;
                                    $jewelrysimg->picturesxlarge = $xlargePath;
                                    $jewelrysimg->save();
                                }



                break;






            case 'apartments':


                $apartmentsData = $request->input('attributes.apartments');
                Log::info('Apartments Data:', $apartmentsData);



                $apartment = Apartment::where('url', $url)->first();

                                $apartment->user_id = $user->id;
                                $apartment->onlinestore_id = $onlinestore_id;

                                $apartment->title = $title;
                                $apartment->price = $price;
                                $apartment->currency = $currency;

                                $apartment->phone = $phone;

                                $apartment->address = $address;
                                $apartment->city = $city;
                                $apartment->country = $country;
                                $apartment->zip = $zip;
                                $apartment->description = $description;

                                $apartment->picture = $thumb;
                                $apartment->startdate  = $startdate ;
                                $apartment->enddate = $enddate;

                                                                // Storing additional data from apartmentsData
                                $apartment->rooms = $apartmentsData['rooms'] ?? null;
                                $apartment->living_rooms = $apartmentsData['livingRooms'] ?? null;
                                $apartment->bathrooms = $apartmentsData['bathrooms'] ?? null;
                                $apartment->bedrooms = $apartmentsData['bedrooms'] ?? null;
                                $apartment->security_system = is_array($apartmentsData['securitySystem']) ? implode(', ', $apartmentsData['securitySystem']) : $apartmentsData['securitySystem'];
                                $apartment->equipped_kitchen = is_array($apartmentsData['kitchen']) ? implode(', ', $apartmentsData['kitchen']) : $apartmentsData['kitchen'];
                                $apartment->service = is_array($apartmentsData['service']) ? implode(', ', $apartmentsData['service']) : $apartmentsData['service'];
                                $apartment->facilities = is_array($apartmentsData['facilities']) ? implode(', ', $apartmentsData['facilities']) : $apartmentsData['facilities'];


                                $apartment->more_details = is_array($apartmentsData['moreDetails']) ? implode(', ', $apartmentsData['moreDetails']) : $apartmentsData['moreDetails'];



                                $apartment->save();

                                Apartmentsimg::where('apartment_id', $apartment->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $apartmentsimg = new Apartmentsimg();
                                    $apartmentsimg->apartment_id = $apartment->id;
                                    $apartmentsimg->picture = $largePath;
                                    $apartmentsimg->picturesmall = $smallPath;
                                    $apartmentsimg->picturesxlarge = $xlargePath;
                                    $apartmentsimg->save();
                                }



                break;







            case 'offices':




                $bureauxsData = $request->input('attributes.bureauxs');
                Log::info('Bureauxs Data:', $bureauxsData);


                $bureaux = Bureaux::where('url', $url)->first();

                                $bureaux->user_id = $user->id;
                                $bureaux->onlinestore_id = $onlinestore_id;

                                $bureaux->title = $title;
                                $bureaux->price = $price;
                                $bureaux->currency = $currency;

                                $bureaux->phone = $phone;

                                $bureaux->address = $address;
                                $bureaux->city = $city;
                                $bureaux->country = $country;
                                $bureaux->zip = $zip;
                                $bureaux->description = $description;

                                $bureaux->picture = $thumb;
                                $bureaux->startdate  = $startdate ;
                                $bureaux->enddate = $enddate;
                                // Storing additional data from bureauxsData
                                $bureaux->property_type = $bureauxsData['propertyType'] ?? null;
                                $bureaux->security = is_array($bureauxsData['security']) ? implode(', ', $bureauxsData['security']) : $bureauxsData['security'];
                                $bureaux->soil_type = is_array($bureauxsData['soilType']) ? implode(', ', $bureauxsData['soilType']) : $bureauxsData['soilType'];
                                $bureaux->parking = $bureauxsData['parking'] ?? null;
                                $bureaux->bathrooms = $bureauxsData['bathrooms'] ?? null;
                                $bureaux->conference_room = $bureauxsData['conferenceRoom'] ?? null;
                                $bureaux->building_size = $bureauxsData['buildingSize'] ?? null;
                                $bureaux->capacity = $bureauxsData['capacity'] ?? null;
                                $bureaux->bail_type = $bureauxsData['bailType'] ?? null;
                                $bureaux->security_deposit = $bureauxsData['securityDeposit'] ?? null;
                                $bureaux->office_taxes = $bureauxsData['officeTaxes'] ?? null;
                                $bureaux->facilities = is_array($bureauxsData['facilities']) ? implode(', ', $bureauxsData['facilities']) : $bureauxsData['facilities'];
                                $bureaux->amenities = is_array($bureauxsData['amenities']) ? implode(', ', $bureauxsData['amenities']) : $bureauxsData['amenities'];
                                $bureaux->services = is_array($bureauxsData['services']) ? implode(', ', $bureauxsData['services']) : $bureauxsData['services'];


                                $bureaux->more_details = is_array($bureauxsData['moreDetails']) ? implode(', ', $bureauxsData['moreDetails']) : $bureauxsData['moreDetails'];



                                $bureaux->save();

                                Bureauxsimg::where('bureaux_id', $bureaux->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $bureauxsimg = new Bureauxsimg();
                                    $bureauxsimg->bureaux_id = $bureaux->id;
                                    $bureauxsimg->picture = $largePath;
                                    $bureauxsimg->picturesmall = $smallPath;
                                    $bureauxsimg->picturesxlarge = $xlargePath;
                                    $bureauxsimg->save();
                                }



                break;






            case 'shops':


                $magasinsData = $request->input('attributes.magasins');
                Log::info('Magasins Data:', $magasinsData);


                $magasin = Magasin::where('url', $url)->first();

                                $magasin->user_id = $user->id;
                                $magasin->onlinestore_id = $onlinestore_id;

                                $magasin->title = $title;
                                $magasin->price = $price;
                                $magasin->currency = $currency;

                                $magasin->phone = $phone;

                                $magasin->address = $address;
                                $magasin->city = $city;
                                $magasin->country = $country;
                                $magasin->zip = $zip;
                                $magasin->description = $description;

                                $magasin->picture = $thumb;
                                $magasin->startdate  = $startdate ;
                                $magasin->enddate = $enddate;
                                // Storing additional data from magasinsData
                                $magasin->property_type = $magasinsData['propertyType'] ?? null;
                                $magasin->surface_area = $magasinsData['surfaceArea'] ?? null;
                                $magasin->capacity = $magasinsData['capacity'] ?? null;
                                $magasin->offices_number = $magasinsData['officeNumber'] ?? null;
                                $magasin->individual_offices = $magasinsData['individualOffices'] ?? null;
                                $magasin->floors = $magasinsData['numberOfFloors'] ?? null;
                                $magasin->garage = $magasinsData['garage'] ?? null;
                                $magasin->approved_uses = is_array($magasinsData['approvedUses']) ? implode(', ', $magasinsData['approvedUses']) : $magasinsData['approvedUses'];
                                $magasin->facility_size = is_array($magasinsData['totalFacilitySize']) ? implode(', ', $magasinsData['totalFacilitySize']) : $magasinsData['totalFacilitySize'];
                                $magasin->operating_days = is_array($magasinsData['operatingDays']) ? implode(', ', $magasinsData['operatingDays']) : $magasinsData['operatingDays'];

                                $magasin->facilities = is_array($magasinsData['facilities']) ? implode(', ', $magasinsData['facilities']) : $magasinsData['facilities'];
                                $magasin->amenities = is_array($magasinsData['amenities']) ? implode(', ', $magasinsData['amenities']) : $magasinsData['amenities'];


                                $magasin->more_details = is_array($magasinsData['moreDetails']) ? implode(', ', $magasinsData['moreDetails']) : $magasinsData['moreDetails'];



                                $magasin->save();

                                Magasinsimg::where('magasin_id', $magasin->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $magasinsimg = new Magasinsimg();
                                    $magasinsimg->magasin_id = $magasin->id;
                                    $magasinsimg->picture = $largePath;
                                    $magasinsimg->picturesmall = $smallPath;
                                    $magasinsimg->picturesxlarge = $xlargePath;
                                    $magasinsimg->save();
                                }




                break;






            case 'houses':




                $maisonsData = $request->input('attributes.maisons');
                Log::info('Maisons Data:', $maisonsData);

                $maison = Maison::where('url', $url)->first();

                                $maison->user_id = $user->id;
                                $maison->onlinestore_id = $onlinestore_id;

                                $maison->title = $title;
                                $maison->price = $price;
                                $maison->currency = $currency;

                                $maison->phone = $phone;

                                $maison->address = $address;
                                $maison->city = $city;
                                $maison->country = $country;
                                $maison->zip = $zip;
                                $maison->description = $description;

                                $maison->picture = $thumb;
                                $maison->startdate  = $startdate ;
                                $maison->enddate = $enddate;
                                // Storing additional data from maisonsData
                                $maison->security_system = is_array($maisonsData['securitySystem']) ? implode(', ', $maisonsData['securitySystem']) : $maisonsData['securitySystem'];
                                $maison->rooms = $maisonsData['rooms'] ?? null;
                                $maison->living_rooms = $maisonsData['livingRooms'] ?? null;
                                $maison->bedrooms = $maisonsData['bedrooms'] ?? null;
                                $maison->bathrooms = $maisonsData['bathrooms'] ?? null;
                                $maison->floors = $maisonsData['floors'] ?? null;
                                $maison->amenities = is_array($maisonsData['amenities']) ? implode(', ', $maisonsData['amenities']) : $maisonsData['amenities'];
                                $maison->facilities = is_array($maisonsData['facilities']) ? implode(', ', $maisonsData['facilities']) : $maisonsData['facilities'];


                                $maison->more_details = is_array($maisonsData['moreDetails']) ? implode(', ', $maisonsData['moreDetails']) : $maisonsData['moreDetails'];



                                $maison->save();

                                Maisonsimg::where('maison_id', $maison->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $maisonsimg = new Maisonsimg();
                                    $maisonsimg->maison_id = $maison->id;
                                    $maisonsimg->picture = $largePath;
                                    $maisonsimg->picturesmall = $smallPath;
                                    $maisonsimg->picturesxlarge = $xlargePath;
                                    $maisonsimg->save();
                                }


                break;






            case 'riads':




                $riadsData = $request->input('attributes.riads');
                Log::info('Riads Data:', $riadsData);


                $riad = Riad::where('url', $url)->first();

                                $riad->user_id = $user->id;
                                $riad->onlinestore_id = $onlinestore_id;

                                $riad->title = $title;
                                $riad->price = $price;
                                $riad->currency = $currency;

                                $riad->phone = $phone;

                                $riad->address = $address;
                                $riad->city = $city;
                                $riad->country = $country;
                                $riad->zip = $zip;
                                $riad->description = $description;

                                $riad->picture = $thumb;
                                $riad->startdate  = $startdate ;
                                $riad->enddate = $enddate;
                                // Storing additional data from riadsData
                                $riad->entire_home = $riadsData['entire_home'] ?? null;
                                $riad->doorkeeper = $riadsData['doorkeeper'] ?? null;
                                $riad->security_system = is_array($riadsData['securitySystem']) ? implode(', ', $riadsData['securitySystem']) : $riadsData['securitySystem'];
                                $riad->equipped_kitchen = $riadsData['equipped_kitchen'] ?? null;
                                $riad->wifi = $riadsData['wifi'] ?? null;
                                $riad->tv = $riadsData['tv'] ?? null;
                                $riad->heating = $riadsData['heating'] ?? null;
                                $riad->furniture = $riadsData['furniture'] ?? null;
                                $riad->air_conditioner = $riadsData['air_conditioner'] ?? null;
                                $riad->washing_machine = $riadsData['washing_machine'] ?? null;
                                $riad->pool = $riadsData['pool'] ?? null;
                                $riad->rooms = $riadsData['rooms'] ?? null;
                                $riad->living_rooms = $riadsData['livingRooms'] ?? null;
                                $riad->surface = $riadsData['surface'] ?? null;

                                $riad->bedrooms = $riadsData['bedrooms'] ?? null;
                                $riad->bathrooms = $riadsData['bathrooms'] ?? null;
                                $riad->garden = $riadsData['garden'] ?? null;
                                $riad->terrace = $riadsData['terrace'] ?? null;
                                $riad->housekeeping = $riadsData['housekeeping'] ?? null;
                                $riad->dishwasher = $riadsData['dishwasher'] ?? null;
                                $riad->barbecue = $riadsData['barbecue'] ?? null;
                                $riad->refrigerator = $riadsData['refrigerator'] ?? null;
                                $riad->microwave = $riadsData['microwave'] ?? null;
                                $riad->private_entrance = $riadsData['private_entrance'] ?? null;
                                $riad->hammam = $riadsData['hammam'] ?? null;
                                $riad->jacuzzi = $riadsData['jacuzzi'] ?? null;
                                $riad->gym = $riadsData['gym'] ?? null;

                                $riad->restaurant = $riadsData['restaurant'] ?? null;
                                $riad->spa = $riadsData['spa'] ?? null;



                                $riad->more_details = is_array($riadsData['moreDetails']) ? implode(', ', $riadsData['moreDetails']) : $riadsData['moreDetails'];



                                $riad->save();

                                Riadsimg::where('riad_id', $riad->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $riadsimg = new Riadsimg();
                                    $riadsimg->riad_id = $riad->id;
                                    $riadsimg->picture = $largePath;
                                    $riadsimg->picturesmall = $smallPath;
                                    $riadsimg->picturesxlarge = $xlargePath;
                                    $riadsimg->save();
                                }



                break;





            case 'lands':



                $terrainsData = $request->input('attributes.terrains');
                Log::info('Terrains Data:', $terrainsData);


                $terrain = Terrain::where('url', $url)->first();

                                $terrain->user_id = $user->id;
                                $terrain->onlinestore_id = $onlinestore_id;

                                $terrain->title = $title;
                                $terrain->price = $price;
                                $terrain->currency = $currency;

                                $terrain->phone = $phone;

                                $terrain->address = $address;
                                $terrain->city = $city;
                                $terrain->country = $country;
                                $terrain->zip = $zip;
                                $terrain->description = $description;

                                $terrain->picture = $thumb;
                                $terrain->startdate  = $startdate ;
                                $terrain->enddate = $enddate;
                                $terrain->property_type = $terrainsData['propertyType'] ?? null;
                                $terrain->property_subtype = $terrainsData['propertySubtype'] ?? null;
                                $terrain->total_lot_size = $terrainsData['totalLotSize'] ?? null;
                                $terrain->land_valuation = $terrainsData['landValuation'] ?? null;
                                $terrain->total_rating = $terrainsData['totalRating'] ?? null;
                                $terrain->road_access = $terrainsData['roadAccess'] ?? null;
                                $terrain->slope_description = $terrainsData['slopeDescription'] ?? null;
                                $terrain->property_usage = $terrainsData['propertyUsage'] ?? null;
                                $terrain->annual_taxes = $terrainsData['annualTaxes'] ?? null;
                                $terrain->deeded_acres = $terrainsData['deededAcres'] ?? null;
                                $terrain->leased_acres = $terrainsData['leasedAcres'] ?? null;
                                $terrain->elevation = $terrainsData['elevation'] ?? null;
                                $terrain->vegetation = $terrainsData['vegetation'] ?? null;
                                $terrain->nearby_usage = is_array($terrainsData['nearbyUsage']) ? implode(', ', $terrainsData['nearbyUsage']) : $terrainsData['nearbyUsage'];
                                $terrain->topography = is_array($terrainsData['topography']) ? implode(', ', $terrainsData['topography']) : $terrainsData['topography'];
                                $terrain->zoning = $terrainsData['zoning'] ?? null;

                                $terrain->more_details = is_array($terrainsData['moreDetails']) ? implode(', ', $terrainsData['moreDetails']) : $terrainsData['moreDetails'];



                                $terrain->save();


                                Terrainsimg::where('terrain_id', $terrain->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $terrainsimg = new Terrainsimg();
                                    $terrainsimg->terrain_id = $terrain->id;
                                    $terrainsimg->picture = $largePath;
                                    $terrainsimg->picturesmall = $smallPath;
                                    $terrainsimg->picturesxlarge = $xlargePath;
                                    $terrainsimg->save();
                                }



                break;







            case 'villas':




                $villasData = $request->input('attributes.villas');
                Log::info('Villas Data:', $villasData);

                $villa = Villa::where('url', $url)->first();

                                $villa->user_id = $user->id;
                                $villa->onlinestore_id = $onlinestore_id;

                                $villa->title = $title;
                                $villa->price = $price;
                                $villa->currency = $currency;

                                $villa->phone = $phone;

                                $villa->address = $address;
                                $villa->city = $city;
                                $villa->country = $country;
                                $villa->zip = $zip;
                                $villa->description = $description;

                                $villa->picture = $thumb;
                                $villa->startdate  = $startdate ;
                                $villa->enddate = $enddate;
                                $villa->rooms = $villasData['rooms'] ?? null;
                                $villa->living_rooms = $villasData['livingRooms'] ?? null;
                                $villa->bedrooms = $villasData['bedrooms'] ?? null;
                                $villa->bathrooms = $villasData['bathrooms'] ?? null;
                                $villa->view = $villasData['view'] ?? null;
                                $villa->security_system = is_array($villasData['securitySystem']) ? implode(', ', $villasData['securitySystem']) : $villasData['securitySystem'];
                                $villa->facilities = is_array($villasData['facilities']) ? implode(', ', $villasData['facilities']) : $villasData['facilities'];
                                $villa->amenities = is_array($villasData['amenities']) ? implode(', ', $villasData['amenities']) : $villasData['amenities'];
                                $villa->services = is_array($villasData['services']) ? implode(', ', $villasData['services']) : $villasData['services'];

                                $villa->more_details = is_array($villasData['moreDetails']) ? implode(', ', $villasData['moreDetails']) : $villasData['moreDetails'];



                                $villa->save();


                                Villasimg::where('villa_id', $villa->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $villasimg = new Villasimg();
                                    $villasimg->villa_id = $villa->id;
                                    $villasimg->picture = $largePath;
                                    $villasimg->picturesmall = $smallPath;
                                    $villasimg->picturesxlarge = $xlargePath;
                                    $villasimg->save();
                                }


                break;






            case 'activities':



                $activitiesData = $request->input('attributes.activities');
                Log::info('Activities Data:', $activitiesData);


                $activity = Activity::where('url', $url)->first();

                                $activity->user_id = $user->id;
                                $activity->onlinestore_id = $onlinestore_id;

                                $activity->title = $title;
                                $activity->price = $price;
                                $activity->currency = $currency;
                                $activity->phone = $phone;

                                $activity->address = $address;
                                $activity->city = $city;
                                $activity->country = $country;
                                $activity->zip = $zip;
                                $activity->description = $description;

                                $activity->picture = $thumb;
                                $activity->startdate  = $startdate ;
                                $activity->enddate = $enddate;
                                $activity->type = $activitiesData['type'] ?? null;
                                $activity->equipment = is_array($activitiesData['equipment']) ? implode(', ', $activitiesData['equipment']) : $activitiesData['equipment'];
                                $activity->age_requirement = $activitiesData['ageRequirement'] ?? null;
                                $activity->duration = $activitiesData['duration'] ?? null;
                                $activity->language = is_array($activitiesData['language']) ? implode(', ', $activitiesData['language']) : $activitiesData['language'];

                                $activity->cancellation = $activitiesData['cancellation'] ?? null;
                                $activity->safety_equipment = is_array($activitiesData['safetyEquipment']) ? implode(', ', $activitiesData['safetyEquipment']) : $activitiesData['safetyEquipment'];
                                $activity->monitor = $activitiesData['monitor'] ?? null;

                                $activity->more_details = is_array($activitiesData['moreDetails']) ? implode(', ', $activitiesData['moreDetails']) : $activitiesData['moreDetails'];



                                $activity->save();

                                Activitiesimg::where('activity_id', $activity->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $activitiesimg = new Activitiesimg();
                                    $activitiesimg->activity_id = $activity->id;
                                    $activitiesimg->picture = $largePath;
                                    $activitiesimg->picturesmall = $smallPath;
                                    $activitiesimg->picturesxlarge = $xlargePath;
                                    $activitiesimg->save();
                                }


                break;






            case 'books':




                $livresData = $request->input('attributes.livres');
                Log::info('Livres Data:', $livresData);



                $livre = Livre::where('url', $url)->first();

                                $livre->user_id = $user->id;
                                $livre->onlinestore_id = $onlinestore_id;

                                $livre->title = $title;
                                $livre->price = $price;
                                $livre->currency = $currency;

                                $livre->phone = $phone;

                                $livre->address = $address;
                                $livre->city = $city;
                                $livre->country = $country;
                                $livre->zip = $zip;
                                $livre->description = $description;

                                $livre->picture = $thumb;
                                $livre->startdate  = $startdate ;
                                $livre->enddate = $enddate;

                                // Storing additional data from livresData
                                $livre->genre = $livresData['genre'] ?? null;
                                $livre->type = $livresData['type'] ?? null;
                                $livre->language = is_array($livresData['language']) ? implode(', ', $livresData['language']) : $livresData['language'];
                                $livre->format = $livresData['format'] ?? null;
                                $livre->duration = is_array($livresData['duration']) ? implode(', ', $livresData['duration']) : $livresData['duration'];

                                $livre->more_details = is_array($livresData['moreDetails']) ? implode(', ', $livresData['moreDetails']) : $livresData['moreDetails'];


                                $livre->save();

                                Livresimg::where('livre_id', $livre->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $livresimg = new Livresimg();
                                    $livresimg->livre_id = $livre->id;
                                    $livresimg->picture = $largePath;
                                    $livresimg->picturesmall = $smallPath;
                                    $listingsimg->picturesxlarge = $xlargePath;
                                    $livresimg->save();
                                }


                break;






            case 'musical':




                $musicalsData = $request->input('attributes.musicals');
                Log::info('Musicals Data:', $musicalsData);



                $musical = Musical::where('url', $url)->first();

                                $musical->user_id = $user->id;
                                $musical->onlinestore_id = $onlinestore_id;

                                $musical->title = $title;
                                $musical->price = $price;
                                $musical->currency = $currency;

                                $musical->phone = $phone;

                                $musical->address = $address;
                                $musical->city = $city;
                                $musical->country = $country;
                                $musical->zip = $zip;
                                $musical->description = $description;

                                $musical->picture = $thumb;
                                $musical->startdate  = $startdate ;
                                $musical->enddate = $enddate;
                                // Storing additional data from musicalsData
                                $musical->music_type = $musicalsData['musicType'] ?? null;
                                $musical->material = $musicalsData['material'] ?? null;
                                $musical->style = $musicalsData['style'] ?? null;
                                $musical->finish_type = $musicalsData['finishType'] ?? null;



                                $musical->more_details = is_array($musicalsData['moreDetails']) ? implode(', ', $musicalsData['moreDetails']) : $musicalsData['moreDetails'];



                                $musical->save();

                                Musicalsimg::where('musical_id', $musical->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $musicalsimg = new Musicalsimg();
                                    $musicalsimg->musical_id = $musical->id;
                                    $musicalsimg->picture = $largePath;
                                    $musicalsimg->picturesmall = $smallPath;
                                    $musicalsimg->picturesxlarge = $xlargePath;
                                    $musicalsimg->save();
                                }



                break;






            case 'furniture':




                $furnituresData = $request->input('attributes.furnitures');
                Log::info('Furnitures Data:', $furnituresData);



                $furniture = Furniture::where('url', $url)->first();

                                $furniture->user_id = $user->id;
                                $furniture->onlinestore_id = $onlinestore_id;

                                $furniture->title = $title;
                                $furniture->price = $price;
                                $furniture->currency = $currency;

                                $furniture->phone = $phone;

                                $furniture->address = $address;
                                $furniture->city = $city;
                                $furniture->country = $country;
                                $furniture->zip = $zip;
                                $furniture->description = $description;

                                $furniture->picture = $thumb;
                                $furniture->startdate  = $startdate ;
                                $furniture->enddate = $enddate;
                                // Storing additional data from furnituresData
                                $furniture->furniture_type = $furnituresData['type'] ?? null;
                                $furniture->material = $furnituresData['material'] ?? null;
                                $furniture->shape = $furnituresData['shape'] ?? null;
                                $furniture->cushion_thickness = $furnituresData['cushionThickness'] ?? null;
                                $furniture->capacity = $furnituresData['capacity'] ?? null;
                                $furniture->fill_material = $furnituresData['fillMaterial'] ?? null;
                                $furniture->condition = $furnituresData['condition'] ?? null;
                                $furniture->color = is_array($furnituresData['color']) ? implode(', ', $furnituresData['color']) : $furnituresData['color'];


                                $furniture->more_details = is_array($furnituresData['moreDetails']) ? implode(', ', $furnituresData['moreDetails']) : $furnituresData['moreDetails'];



                                $furniture->save();

                                Furnituresimg::where('furniture_id', $furniture->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $furnituresimg = new Furnituresimg();
                                    $furnituresimg->furniture_id = $furniture->id;
                                    $furnituresimg->picture = $largePath;
                                    $furnituresimg->picturesmall = $smallPath;
                                    $furnituresimg->picturesxlarge = $xlargePath;
                                    $furnituresimg->save();
                                }



                break;






            case 'home-appliances':



                $houseappliancesData = $request->input('attributes.houseappliances');
                Log::info('Houseappliances Data:', $houseappliancesData);




                $houseappliance = Houseappliance::where('url', $url)->first();

                                $houseappliance->user_id = $user->id;
                                $houseappliance->onlinestore_id = $onlinestore_id;

                                $houseappliance->title = $title;
                                $houseappliance->price = $price;
                                $houseappliance->currency = $currency;

                                $houseappliance->phone = $phone;

                                $houseappliance->address = $address;
                                $houseappliance->city = $city;
                                $houseappliance->country = $country;
                                $houseappliance->zip = $zip;
                                $houseappliance->description = $description;

                                $houseappliance->picture = $thumb;
                                $houseappliance->startdate  = $startdate ;
                                $houseappliance->enddate = $enddate;
                                // Storing additional data from houseappliancesData
                                $houseappliance->access_location = $houseappliancesData['accessLocation'] ?? null;
                                $houseappliance->finish_type = $houseappliancesData['finishType'] ?? null;
                                $houseappliance->cycle_options = $houseappliancesData['cycleOptions'] ?? null;
                                $houseappliance->inlet_water = is_array($houseappliancesData['inletWater']) ? implode(', ', $houseappliancesData['inletWater']) : $houseappliancesData['inletWater'];
                                $houseappliance->installation_method = $houseappliancesData['installationMethod'] ?? null;
                                $houseappliance->components = is_array($houseappliancesData['components']) ? implode(', ', $houseappliancesData['components']) : $houseappliancesData['components'];
                                $houseappliance->control_type = $houseappliancesData['controlType'] ?? null;
                                $houseappliance->certification = $houseappliancesData['certification'] ?? null;


                                $houseappliance->more_details = is_array($houseappliancesData['moreDetails']) ? implode(', ', $houseappliancesData['moreDetails']) : $houseappliancesData['moreDetails'];



                                $houseappliance->save();

                                Houseappliancesimg::where('houseappliance_id', $houseappliance->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $houseappliancesimg = new Houseappliancesimg();
                                    $houseappliancesimg->houseappliance_id = $houseappliance->id;
                                    $houseappliancesimg->picture = $largePath;
                                    $houseappliancesimg->picturesmall = $smallPath;
                                    $houseappliancesimg->picturesxlarge = $xlargePath;
                                    $houseappliancesimg->save();
                                }



                break;






            case 'electrical-tools':




                $electricaltoolsData = $request->input('attributes.electricaltools');
                Log::info('Electrical Tools Data:', $electricaltoolsData);



                $electricaltool = Electricaltool::where('url', $url)->first();

                                $electricaltool->user_id = $user->id;
                                $electricaltool->onlinestore_id = $onlinestore_id;

                                $electricaltool->title = $title;
                                $electricaltool->price = $price;
                                $electricaltool->currency = $currency;

                                $electricaltool->phone = $phone;

                                $electricaltool->address = $address;
                                $electricaltool->city = $city;
                                $electricaltool->country = $country;
                                $electricaltool->zip = $zip;
                                $electricaltool->description = $description;

                                $electricaltool->picture = $thumb;
                                $electricaltool->startdate  = $startdate ;
                                $electricaltool->enddate = $enddate;
                                // Storing additional data from electricaltoolsData
                                $electricaltool->tool_type = $electricaltoolsData['toolType'] ?? null;
                                $electricaltool->condition = $electricaltoolsData['condition'] ?? null;
                                $electricaltool->voltage = $electricaltoolsData['voltage'] ?? null;
                                $electricaltool->amperage = is_array($electricaltoolsData['amperage']) ? implode(', ', $electricaltoolsData['amperage']) : $electricaltoolsData['amperage'];
                                $electricaltool->cord_length = is_array($electricaltoolsData['cordLength']) ? implode(', ', $electricaltoolsData['cordLength']) : $electricaltoolsData['cordLength'];
                                $electricaltool->battery_life = is_array($electricaltoolsData['batteryLife']) ? implode(', ', $electricaltoolsData['batteryLife']) : $electricaltoolsData['batteryLife'];
                                $electricaltool->display = $electricaltoolsData['display'] ?? null;
                                $electricaltool->frequency = $electricaltoolsData['frequency'] ?? null;
                                $electricaltool->temperature = is_array($electricaltoolsData['temperature']) ? implode(', ', $electricaltoolsData['temperature']) : $electricaltoolsData['temperature'];
                                $electricaltool->voltage_sensing_ranges = $electricaltoolsData['voltageSensingRanges'] ?? null;
                                $electricaltool->detector = $electricaltoolsData['detector'] ?? null;
                                $electricaltool->operating_altitude = $electricaltoolsData['operatingAltitude'] ?? null;
                                $electricaltool->compatible = $electricaltoolsData['compatible'] ?? null;
                                $electricaltool->bending_angle = is_array($electricaltoolsData['bindingAngle']) ? implode(', ', $electricaltoolsData['bindingAngle']) : $electricaltoolsData['bindingAngle'];
                                $electricaltool->accessories = $electricaltoolsData['accessories'] ?? null;
                                $electricaltool->style = $electricaltoolsData['style'] ?? null;



                                $electricaltool->more_details = is_array($electricaltoolsData['moreDetails']) ? implode(', ', $electricaltoolsData['moreDetails']) : $electricaltoolsData['moreDetails'];



                                $electricaltool->save();

                                Electricaltoolsimg::where('electricaltool_id', $electricaltool->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $electricaltoolsimg = new Electricaltoolsimg();
                                    $electricaltoolsimg->electricaltool_id = $electricaltool->id;
                                    $electricaltoolsimg->picture = $largePath;
                                    $electricaltoolsimg->picturesmall = $smallPath;
                                    $electricaltoolsimg->picturesxlarge = $xlargePath;
                                    $electricaltoolsimg->save();
                                }



                break;






            case 'ladders':




                $laddersData = $request->input('attributes.ladders');
                Log::info('Ladders Data:', $laddersData);




                $ladder = Ladder::where('url', $url)->first();

                                $ladder->user_id = $user->id;
                                $ladder->onlinestore_id = $onlinestore_id;

                                $ladder->title = $title;
                                $ladder->price = $price;
                                $ladder->currency = $currency;

                                $ladder->phone = $phone;

                                $ladder->address = $address;
                                $ladder->city = $city;
                                $ladder->country = $country;
                                $ladder->zip = $zip;
                                $ladder->description = $description;

                                $ladder->picture = $thumb;
                                $ladder->startdate  = $startdate ;
                                $ladder->enddate = $enddate;
                                // Storing additional data from laddersData
                                $ladder->tool_type = $laddersData['toolType'] ?? null;
                                $ladder->condition = $laddersData['condition'] ?? null;
                                $ladder->power_source = $laddersData['powerSource'] ?? null;
                                $ladder->material = $laddersData['material'] ?? null;
                                $ladder->height = $laddersData['height'] ?? null;
                                $ladder->weight = $laddersData['weight'] ?? null;
                                $ladder->number_of_steps = $laddersData['numberOfSteps'] ?? null;
                                $ladder->load_capacity = $laddersData['loadCapacity'] ?? null;
                                $ladder->battery_life = $laddersData['batteryLife'] ?? null;
                                $ladder->style = is_array($laddersData['style']) ? implode(', ', $laddersData['style']) : $laddersData['style'];
                                $ladder->wheel_size = $laddersData['wheelSize'] ?? null;


                                $ladder->more_details = is_array($laddersData['moreDetails']) ? implode(', ', $laddersData['moreDetails']) : $laddersData['moreDetails'];



                                $ladder->save();

                                Laddersimg::where('ladder_id', $ladder->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $laddersimg = new Laddersimg();
                                    $laddersimg->ladder_id = $ladder->id;
                                    $laddersimg->picture = $largePath;
                                    $laddersimg->picturesmall = $smallPath;
                                    $laddersimg->picturesxlarge = $xlargePath;
                                    $laddersimg->save();
                                }


                break;






            case 'mechanical-tools':




                $mechanicaltoolsData = $request->input('attributes.mechanicaltools');
                Log::info('Mechanicaltools Data:', $mechanicaltoolsData);



                $mechanicaltool = Mechanicaltool::where('url', $url)->first();

                                $mechanicaltool->user_id = $user->id;
                                $mechanicaltool->onlinestore_id = $onlinestore_id;

                                $mechanicaltool->title = $title;
                                $mechanicaltool->price = $price;
                                $mechanicaltool->currency = $currency;

                                $mechanicaltool->phone = $phone;

                                $mechanicaltool->address = $address;
                                $mechanicaltool->city = $city;
                                $mechanicaltool->country = $country;
                                $mechanicaltool->zip = $zip;
                                $mechanicaltool->description = $description;

                                $mechanicaltool->picture = $thumb;
                                $mechanicaltool->startdate  = $startdate ;
                                $mechanicaltool->enddate = $enddate;
                                // Storing additional data from mechanicaltoolsData
                                $mechanicaltool->tool_type = $mechanicaltoolsData['toolType'] ?? null;
                                $mechanicaltool->condition = $mechanicaltoolsData['condition'] ?? null;
                                $mechanicaltool->power_source = $mechanicaltoolsData['powerSource'] ?? null;
                                $mechanicaltool->voltage = $mechanicaltoolsData['voltage'] ?? null;
                                $mechanicaltool->battery_life = $mechanicaltoolsData['batteryLife'] ?? null;
                                $mechanicaltool->blade_diameter = $mechanicaltoolsData['bladeDiameter'] ?? null;
                                $mechanicaltool->material = $mechanicaltoolsData['material'] ?? null;
                                $mechanicaltool->style = $mechanicaltoolsData['style'] ?? null;
                                $mechanicaltool->cutting_width = $mechanicaltoolsData['cuttingWidth'] ?? null;
                                $mechanicaltool->carburetor_type = $mechanicaltoolsData['carburetorType'] ?? null;



                                $mechanicaltool->more_details = is_array($mechanicaltoolsData['moreDetails']) ? implode(', ', $mechanicaltoolsData['moreDetails']) : $mechanicaltoolsData['moreDetails'];



                                $mechanicaltool->save();

                                Mechanicaltoolsimg::where('mechanicaltool_id', $mechanicaltool->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $mechanicaltoolsimg = new Mechanicaltoolsimg();
                                    $mechanicaltoolsimg->mechanicaltool_id = $mechanicaltool->id;
                                    $mechanicaltoolsimg->picture = $largePath;
                                    $mechanicaltoolsimg->picturesmall = $smallPath;
                                    $mechanicaltoolsimg->picturesxlarge = $xlargePath;
                                    $mechanicaltoolsimg->save();
                                }



                break;





            case 'power-tools':





                $powertoolsData = $request->input('attributes.powertools');
                Log::info('Powertools Data:', $powertoolsData);

                $powertool = Powertool::where('url', $url)->first();

                                $powertool->user_id = $user->id;
                                $powertool->onlinestore_id = $onlinestore_id;

                                $powertool->title = $title;
                                $powertool->price = $price;
                                $powertool->currency = $currency;

                                $powertool->phone = $phone;

                                $powertool->address = $address;
                                $powertool->city = $city;
                                $powertool->country = $country;
                                $powertool->zip = $zip;
                                $powertool->description = $description;

                                $powertool->picture = $thumb;
                                $powertool->startdate  = $startdate ;
                                $powertool->enddate = $enddate;
                                // Storing additional data from powertoolsData
                                $powertool->tool_type = $powertoolsData['toolType'] ?? null;
                                $powertool->condition = $powertoolsData['condition'] ?? null;
                                $powertool->power_source = $powertoolsData['powerSource'] ?? null;
                                $powertool->voltage = $powertoolsData['voltage'] ?? null;
                                $powertool->battery_life = $powertoolsData['batteryLife'] ?? null;
                                $powertool->material = $powertoolsData['material'] ?? null;
                                $powertool->noise_level = $powertoolsData['noiseLevel'] ?? null;
                                $powertool->grit_number = $powertoolsData['gritNumber'] ?? null;
                                $powertool->rotational_speed = $powertoolsData['rotationalSpeed'] ?? null;
                                $powertool->blade_material = $powertoolsData['bladeMaterial'] ?? null;
                                $powertool->surface = $powertoolsData['surface'] ?? null;
                                $powertool->style = $powertoolsData['style'] ?? null;
                                $powertool->amperage = $powertoolsData['amperage'] ?? null;



                                $powertool->more_details = is_array($powertoolsData['moreDetails']) ? implode(', ', $powertoolsData['moreDetails']) : $powertoolsData['moreDetails'];



                                $powertool->save();

                                Powertoolsimg::where('powertool_id', $powertool->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $powertoolsimg = new Powertoolsimg();
                                    $powertoolsimg->powertool_id = $powertool->id;
                                    $powertoolsimg->picture = $largePath;
                                    $powertoolsimg->picturesmall = $smallPath;
                                    $powertoolsimg->picturesxlarge = $xlargePath;
                                    $powertoolsimg->save();
                                }


                break;






            case 'pressure-washers':




                $pressurewashersData = $request->input('attributes.pressurewashers');
                Log::info('Pressure Washers Data:', $pressurewashersData);



                $pressurewasher = Pressurewasher::where('url', $url)->first();

                                $pressurewasher->user_id = $user->id;
                                $pressurewasher->onlinestore_id = $onlinestore_id;

                                $pressurewasher->title = $title;
                                $pressurewasher->price = $price;
                                $pressurewasher->currency = $currency;

                                $pressurewasher->phone = $phone;

                                $pressurewasher->address = $address;
                                $pressurewasher->city = $city;
                                $pressurewasher->country = $country;
                                $pressurewasher->zip = $zip;
                                $pressurewasher->description = $description;

                                $pressurewasher->picture = $thumb;
                                $pressurewasher->startdate  = $startdate ;
                                $pressurewasher->enddate = $enddate;
                                // Storing additional data from pressurewashersData
                                $pressurewasher->tool_type = $pressurewashersData['toolType'] ?? null;
                                $pressurewasher->condition = $pressurewashersData['condition'] ?? null;
                                $pressurewasher->power_source = $pressurewashersData['powerSource'] ?? null;
                                $pressurewasher->power_output = $pressurewashersData['powerOutput'] ?? null;
                                $pressurewasher->engine_power = $pressurewashersData['enginePower'] ?? null;
                                $pressurewasher->hose_length = $pressurewashersData['hoseLength'] ?? null;
                                $pressurewasher->cord_length = $pressurewashersData['cordLength'] ?? null;
                                $pressurewasher->weight = $pressurewashersData['weight'] ?? null;
                                $pressurewasher->maximum_flow_rate = is_array($pressurewashersData['maximumFlowRate']) ? implode(', ', $pressurewashersData['maximumFlowRate']) : $pressurewashersData['maximumFlowRate'];
                                $pressurewasher->specification_met = is_array($pressurewashersData['specificationMet']) ? implode(', ', $pressurewashersData['specificationMet']) : $pressurewashersData['specificationMet'];
                                $pressurewasher->inlet_connection_type = is_array($pressurewashersData['inletConnectionType']) ? implode(', ', $pressurewashersData['inletConnectionType']) : $pressurewashersData['inletConnectionType'];
                                $pressurewasher->outlet_connection_size = $pressurewashersData['outletConnectionSize'] ?? null;
                                $pressurewasher->max_working_temperature = $pressurewashersData['maxWorkingTemperature'] ?? null;
                                $pressurewasher->connection_type = $pressurewashersData['connectionType'] ?? null;



                                $pressurewasher->more_details = is_array($pressurewashersData['moreDetails']) ? implode(', ', $pressurewashersData['moreDetails']) : $pressurewashersData['moreDetails'];




                                $pressurewasher->save();

                                Pressurewashersimg::where('pressurewasher_id', $pressurewasher->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $pressurewashersimg = new Pressurewashersimg();
                                    $pressurewashersimg->pressurewasher_id = $pressurewasher->id;
                                    $pressurewashersimg->picture = $largePath;
                                    $pressurewashersimg->picturesmall = $smallPath;
                                    $pressurewashersimg->picturesxlarge = $xlargePath;
                                    $pressurewashersimg->save();
                                }


                break;






            case 'services':



                $servicesData = $request->input('attributes.services');


                $service = Service::where('url', $url)->first();

                                $service->user_id = $user->id;
                                $service->onlinestore_id = $onlinestore_id;

                                $service->title = $title;
                                $service->price = $price;
                                $service->currency = $currency;

                                $service->phone = $phone;

                                $service->address = $address;
                                $service->city = $city;
                                $service->country = $country;
                                $service->zip = $zip;
                                $service->description = $description;

                                $service->picture = $thumb;
                                $service->startdate  = $startdate ;
                                $service->enddate = $enddate;
                                // Storing additional data from servicesData
                                $service->languages = is_array($servicesData['languages']) ? implode(', ', $servicesData['languages']) : $servicesData['languages'];
                                $service->experience = $servicesData['experience'] ?? null;
                                $service->type_service = $servicesData['type'] ?? null;
                                $service->education = $servicesData['education'] ?? null;
                                $service->delivery_time = $servicesData['deliveryTime'] ?? null;


                                $service->more_details = is_array($servicesData['moreDetails']) ? implode(', ', $servicesData['moreDetails']) : $servicesData['moreDetails'];



                                $service->save();

                                Servicesimg::where('service_id', $service->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $servicesimg = new Servicesimg();
                                    $servicesimg->service_id = $service->id;
                                    $servicesimg->picture = $largePath;
                                    $servicesimg->picturesmall = $smallPath;
                                    $servicesimg->picturesxlarge = $xlargePath;
                                    $servicesimg->save();
                                }


                break;



            case 'jobs':




                $jobsData = $request->input('attributes.jobs');


                $service = Job::where('url', $url)->first();

                                $service->user_id = $user->id;
                                $service->onlinestore_id = $onlinestore_id;

                                $service->title = $title;
                                $service->price = $price;
                                $service->currency = $currency;

                                $service->phone = $phone;

                                $service->address = $address;
                                $service->city = $city;
                                $service->country = $country;
                                $service->zip = $zip;
                                $service->description = $description;

                                $service->picture = $thumb;
                                $service->startdate  = $startdate ;
                                $service->enddate = $enddate;
                                // Storing additional data from jobsData

                                $service->language = is_array($jobsData['languages']) ? implode(', ', $jobsData['languages']) : $jobsData['languages'];
                                $service->experience_level = $jobsData['experience'] ?? null;
                                $service->employment_type = $jobsData['employmentType'] ?? null;

                                $service->skills = is_array($jobsData['skills']) ? implode(', ', $jobsData['skills']) : $jobsData['skills'];
                                $service->salary = $jobsData['salary'] ?? null;

                                $service->responsibilities = $jobsData['responsibilities'] ?? null;

                                $service->benefits = is_array($jobsData['benefits']) ? implode(', ', $jobsData['benefits']) : $jobsData['benefits'];

                                $service->requirements = is_array($jobsData['requirements']) ? implode(', ', $jobsData['requirements']) : $jobsData['requirements'];

                                $service->more_details = is_array($jobsData['moreDetails']) ? implode(', ', $jobsData['moreDetails']) : $jobsData['moreDetails'];




                                $service->save();

                                Jobsimg::where('job_id', $service->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $servicesimg = new Jobsimg();
                                    $servicesimg->job_id = $service->id;
                                    $servicesimg->picture = $largePath;
                                    $servicesimg->picturesmall = $smallPath;
                                    $servicesimg->picturesxlarge = $xlargePath;
                                    $servicesimg->save();
                                }




                break;





            case 'boats':




                $boatsData = $request->input('attributes.boats');
                Log::info('Boats Data:', $boatsData);

                $boat = Boat::where('url', $url)->first();

                                $boat->user_id = $user->id;

                                $boat->onlinestore_id = $onlinestore_id;

                                $boat->title = $title;
                                $boat->price = $price;
                                $boat->currency = $currency;

                                $boat->phone = $phone;

                                $boat->address = $address;
                                $boat->city = $city;
                                $boat->country = $country;
                                $boat->zip = $zip;
                                $boat->description = $description;

                                $boat->picture = $thumb;
                                $boat->startdate  = $startdate ;
                                $boat->enddate = $enddate;
                                // Storing additional data from boatsData
                                $boat->boat_type = $boatsData['boatsType'] ?? null;
                                $boat->capacity = $boatsData['cruiseCapacity'] ?? null;
                                $boat->cabins = $boatsData['numberOfCabins'] ?? null;
                                $boat->berths_in_cabin = $boatsData['berthsInCabin'] ?? null;
                                $boat->cruising_time = $boatsData['dailyCruisingTime'] ?? null;
                                $boat->length = $boatsData['length'] ?? null;
                                $boat->security = is_array($boatsData['security']) ? implode(', ', $boatsData['security']) : $boatsData['security'];
                                $boat->navigation = is_array($boatsData['navigation']) ? implode(', ', $boatsData['navigation']) : $boatsData['navigation'];
                                $boat->kitchen_equipment = is_array($boatsData['kitchenEquipment']) ? implode(', ', $boatsData['kitchenEquipment']) : $boatsData['kitchenEquipment'];


                                $boat->more_details = is_array($boatsData['moreDetails']) ? implode(', ', $boatsData['moreDetails']) : $boatsData['moreDetails'];



                                $boat->save();

                                Boatsimg::where('boat_id', $boat->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $boatsimg = new Boatsimg();
                                    $boatsimg->boat_id = $boat->id;
                                    $boatsimg->picture = $largePath;
                                    $boatsimg->picturesmall = $smallPath;
                                    $boatsimg->picturesxlarge = $xlargePath;
                                    $boatsimg->save();
                                }


                break;






            case 'trucks':




                $camionsData = $request->input('attributes.camions');
                Log::info('Camions Data:', $camionsData);

                $camion = Camion::where('url', $url)->first();

                                $camion->user_id = $user->id;
                                $camion->onlinestore_id = $onlinestore_id;

                                $camion->title = $title;
                                $camion->price = $price;
                                $camion->currency = $currency;

                                $camion->phone = $phone;

                                $camion->address = $address;
                                $camion->city = $city;
                                $camion->country = $country;
                                $camion->zip = $zip;
                                $camion->description = $description;

                                $camion->picture = $thumb;
                                $camion->startdate  = $startdate ;
                                $camion->enddate = $enddate;
                                // Storing additional data from camionsData
                                $camion->type = $camionsData['type'] ?? null;
                                $camion->fuel_type = $camionsData['fuelType'] ?? null;
                                $camion->condition = $camionsData['condition'] ?? null;
                                $camion->transmission = $camionsData['transmission'] ?? null;
                                $camion->insurance = $camionsData['insurance'] ?? null;
                                $camion->navigation_system = $camionsData['navigation'] ?? null;

                                $camion->more_details = is_array($camionsData['moreDetails']) ? implode(', ', $camionsData['moreDetails']) : $camionsData['moreDetails'];





                                $camion->save();

                                Camionsimg::where('camion_id', $camion->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $camionsimg = new Camionsimg();
                                    $camionsimg->camion_id = $camion->id;
                                    $camionsimg->picture = $largePath;
                                    $camionsimg->picturesmall = $smallPath;
                                    $camionsimg->picturesxlarge = $xlargePath;
                                    $camionsimg->save();
                                }


                break;





            case 'caravans':



                $caravansData = $request->input('attributes.caravans');
                Log::info('Caravans Data:', $caravansData);


                $caravan = Caravan::where('url', $url)->first();

                                $caravan->user_id = $user->id;
                                $caravan->onlinestore_id = $onlinestore_id;

                                $caravan->title = $title;
                                $caravan->price = $price;
                                $caravan->currency = $currency;

                                $caravan->phone = $phone;

                                $caravan->address = $address;
                                $caravan->city = $city;
                                $caravan->country = $country;
                                $caravan->zip = $zip;
                                $caravan->description = $description;

                                $caravan->picture = $thumb;
                                $caravan->startdate  = $startdate ;
                                $caravan->enddate = $enddate;
                                // Storing additional data from caravansData
                                $caravan->gearbox = $caravansData['gearbox'] ?? null;
                                $caravan->fuel_type = $caravansData['fuelType'] ?? null;
                                $caravan->kitchen_equipment = is_array($caravansData['kitchenEquipment']) ? implode(', ', $caravansData['kitchenEquipment']) : $caravansData['kitchenEquipment'];
                                $caravan->toilet = $caravansData['toilet'] ?? null;
                                $caravan->furniture = is_array($caravansData['furniture']) ? implode(', ', $caravansData['furniture']) : $caravansData['furniture'];
                                $caravan->accessories = is_array($caravansData['accessories']) ? implode(', ', $caravansData['accessories']) : $caravansData['accessories'];


                                $caravan->more_details = is_array($caravansData['moreDetails']) ? implode(', ', $caravansData['moreDetails']) : $caravansData['moreDetails'];



                                $caravan->save();

                                Caravansimg::where('caravan_id', $caravan->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $caravansimg = new Caravansimg();
                                    $caravansimg->caravan_id = $caravan->id;
                                    $caravansimg->picture = $largePath;
                                    $caravansimg->picturesmall = $smallPath;
                                    $caravansimg->picturesxlarge = $xlargePath;
                                    $caravansimg->save();
                                }


                break;





            case 'cars':



                $carsData = $request->input('attributes.cars');
                Log::info('Cars Data:', $carsData);




                $car = Car::where('url', $url)->first();

                                $car->user_id = $user->id;
                                $car->onlinestore_id = $onlinestore_id;

                                $car->title = $title;
                                $car->price = $price;
                                $car->currency = $currency;

                                $car->phone = $phone;

                                $car->address = $address;
                                $car->city = $city;
                                $car->country = $country;
                                $car->zip = $zip;
                                $car->description = $description;

                                $car->picture = $thumb;
                                $car->startdate  = $startdate ;
                                $car->enddate = $enddate;
                                // Storing additional data from carsData
                                $car->transmission = $carsData['transmission'] ?? null;
                                $car->fuel_type = $carsData['fuelType'] ?? null;
                                $car->number_of_doors = $carsData['numberOfDoors'] ?? null;
                                $car->condition = $carsData['condition'] ?? null;
                                $car->more_details = is_array($carsData['moreDetails']) ? implode(', ', $carsData['moreDetails']) : $carsData['moreDetails'];
                                $car->seats = $carsData['seats'] ?? null;




                                $car->save();

                                Carsimg::where('car_id', $car->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $carsimg = new Carsimg();
                                    $carsimg->car_id = $car->id;
                                    $carsimg->picture = $largePath;
                                    $carsimg->picturesmall = $smallPath;
                                    $carsimg->picturesxlarge = $xlargePath;
                                    $carsimg->save();
                                }



                break;





            case 'engins':





                $enginsData = $request->input('attributes.engins');
                Log::info('Engins Data:', $enginsData);



                $engin = Engin::where('url', $url)->first();

                                $engin->user_id = $user->id;
                                $engin->onlinestore_id = $onlinestore_id;

                                $engin->title = $title;
                                $engin->price = $price;
                                $engin->currency = $currency;

                                $engin->phone = $phone;

                                $engin->address = $address;
                                $engin->city = $city;
                                $engin->country = $country;
                                $engin->zip = $zip;
                                $engin->description = $description;

                                $engin->picture = $thumb;
                                $engin->startdate  = $startdate ;
                                $engin->enddate = $enddate;
                                // Storing additional data from enginsData
                                $engin->type = $enginsData['type'] ?? null;
                                $engin->mechanical_condition = $enginsData['mechanicalCondition'] ?? null;

                                $engin->transmission = $enginsData['transmissionType'] ?? null;
                                $engin->cab = $enginsData['cabType'] ?? null;
                                $engin->cab_condition = $enginsData['cabCondition'] ?? null;
                                $engin->coupler = $enginsData['couplerType'] ?? null;
                                $engin->hydraulics = $enginsData['hydraulicsType'] ?? null;
                                $engin->more_details = is_array($enginsData['moreDetails']) ? implode(', ', $enginsData['moreDetails']) : $enginsData['moreDetails'];
                                $engin->seats = $enginsData['seats'] ?? null;

                                $engin->save();

                                Enginsimg::where('engin_id', $engin->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $enginsimg = new Enginsimg();
                                    $enginsimg->engin_id = $engin->id;
                                    $enginsimg->picture = $largePath;
                                    $enginsimg->picturesmall = $smallPath;
                                    $enginsimg->picturesxlarge = $xlargePath;
                                    $enginsimg->save();
                                }




                break;





            case 'motorcycles':




                $motosData = $request->input('attributes.motos');
                Log::info('Motos Data:', $motosData);




                $moto = Moto::where('url', $url)->first();

                                $moto->user_id = $user->id;
                                $moto->onlinestore_id = $onlinestore_id;

                                $moto->title = $title;
                                $moto->price = $price;
                                $moto->currency = $currency;

                                $moto->phone = $phone;

                                $moto->address = $address;
                                $moto->city = $city;
                                $moto->country = $country;
                                $moto->zip = $zip;
                                $moto->description = $description;

                                $moto->picture = $thumb;
                                $moto->startdate  = $startdate ;
                                $moto->enddate = $enddate;
                                // Storing additional data from motosData
                                $moto->condition = $motosData['condition'] ?? null;
                                $moto->gearbox = $motosData['gearbox'] ?? null;
                                $moto->insurance = $motosData['insurance'] ?? null;
                                $moto->power = $motosData['power'] ?? null;
                                $moto->speed = $motosData['speed'] ?? null;
                                $moto->toolkit = $motosData['toolkit'] ?? null;
                                $moto->intercom = $motosData['intercom'] ?? null;


                                $moto->more_details = is_array($motosData['moreDetails']) ? implode(', ', $motosData['moreDetails']) : $motosData['moreDetails'];



                                $moto->save();

                                Motosimg::where('moto_id', $moto->id)->delete();



                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $motosimg = new Motosimg();
                                    $motosimg->moto_id = $moto->id;
                                    $motosimg->picture = $largePath;
                                    $motosimg->picturesmall = $smallPath;
                                    $motosimg->picturesxlarge = $xlargePath;
                                    $motosimg->save();
                                }



                break;





            case 'scooters':





                $scootersData = $request->input('attributes.scooters');
                Log::info('Scooters Data:', $scootersData);



                $scooter = Scooter::where('url', $url)->first();

                                $scooter->user_id = $user->id;
                                $scooter->onlinestore_id = $onlinestore_id;

                                $scooter->title = $title;
                                $scooter->price = $price;
                                $scooter->currency = $currency;

                                $scooter->phone = $phone;

                                $scooter->address = $address;
                                $scooter->city = $city;
                                $scooter->country = $country;
                                $scooter->zip = $zip;
                                $scooter->description = $description;

                                $scooter->picture = $thumb;
                                $scooter->startdate  = $startdate ;
                                $scooter->enddate = $enddate;

                                // Storing additional data from scootersData
                                $scooter->condition = $scootersData['condition'] ?? null;


                                $scooter->more_details = is_array($scootersData['moreDetails']) ? implode(', ', $scootersData['moreDetails']) : $scootersData['moreDetails'];



                                $scooter->save();

                                Scootersimg::where('scooter_id', $scooter->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $scootersimg = new Scootersimg();
                                    $scootersimg->scooter_id = $scooter->id;
                                    $scootersimg->picture = $largePath;
                                    $scootersimg->picturesmall = $smallPath;
                                    $scootersimg->picturesxlarge = $xlargePath;
                                    $scootersimg->save();
                                }



                break;






            case 'airport-taxis':




                $taxiaeroportsData = $request->input('attributes.taxiaeroports');
                Log::info('Taxiaeroports Data:', $taxiaeroportsData);



                $taxiaeroport = Taxiaeroport::where('url', $url)->first();

                                $taxiaeroport->user_id = $user->id;
                                $taxiaeroport->onlinestore_id = $onlinestore_id;

                                $taxiaeroport->title = $title;
                                $taxiaeroport->price = $price;
                                $taxiaeroport->currency = $currency;

                                $taxiaeroport->phone = $phone;

                                $taxiaeroport->address = $address;
                                $taxiaeroport->city = $city;
                                $taxiaeroport->country = $country;
                                $taxiaeroport->zip = $zip;
                                $taxiaeroport->description = $description;

                                $taxiaeroport->picture = $thumb;
                                $taxiaeroport->startdate  = $startdate ;
                                $taxiaeroport->enddate = $enddate;
                                // Storing additional data from taxiaeroportsData
                                $taxiaeroport->passengers = $taxiaeroportsData['passengers'] ?? null;
                                $taxiaeroport->luggage = $taxiaeroportsData['luggage'] ?? null;
                                $taxiaeroport->storage = $taxiaeroportsData['storage'] ?? null;


                                $taxiaeroport->more_details = is_array($taxiaeroportsData['moreDetails']) ? implode(', ', $taxiaeroportsData['moreDetails']) : $taxiaeroportsData['moreDetails'];



                                $taxiaeroport->save();
                                Taxiaeroportsimg::where('taxiaeroport_id', $taxiaeroport->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $taxiaeroportsimg = new Taxiaeroportsimg();
                                    $taxiaeroportsimg->taxiaeroport_id = $taxiaeroport->id;
                                    $taxiaeroportsimg->picture = $largePath;
                                    $taxiaeroportsimg->picturesmall = $smallPath;
                                    $taxiaeroportsimg->picturesxlarge = $xlargePath;
                                    $taxiaeroportsimg->save();
                                }



                break;





            case 'transportation':




                $transportationsData = $request->input('attributes.transportations');
                Log::info('Transportations Data:', $transportationsData);



                $transportation = Transportation::where('url', $url)->first();

                                $transportation->user_id = $user->id;
                                $transportation->onlinestore_id = $onlinestore_id;

                                $transportation->title = $title;
                                $transportation->price = $price;
                                $transportation->currency = $currency;

                                $transportation->phone = $phone;

                                $transportation->address = $address;
                                $transportation->city = $city;
                                $transportation->country = $country;
                                $transportation->zip = $zip;
                                $transportation->description = $description;

                                $transportation->picture = $thumb;
                                $transportation->startdate  = $startdate ;
                                $transportation->enddate = $enddate;
                                $transportation->passengers = $transportationsData['passengers'] ?? null;
                                $transportation->luggage = $transportationsData['luggage'] ?? null;
                                $transportation->condition = $transportationsData['condition'] ?? null;
                                $transportation->duration = is_array($transportationsData['duration']) ? implode(', ', $transportationsData['duration']) : $transportationsData['duration'];
                                $transportation->gearbox = $transportationsData['gearbox'] ?? null;


                                $transportation->more_details = is_array($transportationsData['moreDetails']) ? implode(', ', $transportationsData['moreDetails']) : $transportationsData['moreDetails'];




                                $transportation->save();

                                Transportationsimg::where('transportation_id', $transportation->id)->delete();





                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $transportationsimg = new Transportationsimg();
                                    $transportationsimg->transportation_id = $transportation->id;
                                    $transportationsimg->picture = $largePath;
                                    $transportationsimg->picturesmall = $smallPath;
                                    $transportationsimg->picturesxlarge = $xlargePath;
                                    $transportationsimg->save();
                                }


                break;







            case 'bicycles':




                $velosData = $request->input('attributes.velos');
                Log::info('Velos Data:', $velosData);

                $velo = Velo::where('url', $url)->first();

                                $velo->user_id = $user->id;
                                $velo->onlinestore_id = $onlinestore_id;

                                $velo->title = $title;
                                $velo->price = $price;
                                $velo->currency = $currency;
                                $velo->phone = $phone;

                                $velo->address = $address;
                                $velo->city = $city;
                                $velo->country = $country;
                                $velo->zip = $zip;
                                $velo->description = $description;

                                $velo->picture = $thumb;
                                $velo->startdate  = $startdate ;
                                $velo->enddate = $enddate;
                                $velo->bike_type = $velosData['bikeType'] ?? null;
                                $velo->seatpost = $velosData['seatpost'] ?? null;
                                $velo->condition = is_array($velosData['condition']) ? implode(', ', $velosData['condition']) : $velosData['condition'];
                                $velo->storage = is_array($velosData['storage']) ? implode(', ', $velosData['storage']) : $velosData['storage'];
                                $velo->fork = is_array($velosData['fork']) ? implode(', ', $velosData['fork']) : $velosData['fork'];
                                $velo->gear = is_array($velosData['gear']) ? implode(', ', $velosData['gear']) : $velosData['gear'];


                                $velo->more_details = is_array($velosData['moreDetails']) ? implode(', ', $velosData['moreDetails']) : $velosData['moreDetails'];



                                $velo->save();

                                Velosimg::where('velo_id', $velo->id)->delete();




                                foreach ($imagePathslarge as $index => $largePath) {

                                    $smallPath = $imagePathssmall[$index];
                                    $xlargePath = $imagePathsxlarge[$index];


                                    $velosimg = new Velosimg();
                                    $velosimg->velo_id = $velo->id;
                                    $velosimg->picture = $largePath;
                                    $velosimg->picturesmall = $smallPath;
                                    $velosimg->picturesxlarge = $xlargePath;
                                    $velosimg->save();
                                }



                break;






            default:
                // Default code
                break;
        }


        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'listings',
                'id' => $listing->id,
                'attributes' => [
                    'category' => $listing->category,
                    'user_id' => $listing->user_id,
                    'created_at' => $listing->created_at,
                    'updated_at' => $listing->updated_at,
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


    public function deleteListing(Request $request, $id)
    {

        $listing = Listing::find($id);



        $category = strtolower($listing->category);
        $url = $listing->url;



        if ($listing) {

            switch ($category) {


                case 'billiard':
                    $listingcategory = Billiard::where('url', $url)->first();
                    break;
                case 'boxing':
                    $listingcategory = Boxing::where('url', $url)->first();
                    break;
                case 'diving':
                    $listingcategory = Diving::where('url', $url)->first();
                    break;
                case 'football':
                    $listingcategory = Football::where('url', $url)->first();
                    break;
                case 'golf':
                    $listingcategory = Golf::where('url', $url)->first();
                    break;
                case 'hunting':
                    $listingcategory = Hunting::where('url', $url)->first();
                    break;
                case 'gym':
                    $listingcategory = Musculation::where('url', $url)->first();
                    break;
                case 'surf':
                    $listingcategory = Surf::where('url', $url)->first();
                    break;
                case 'tennis':
                    $listingcategory = Tennis::where('url', $url)->first();
                    break;
                case 'jobs':
                    $listingcategory = Job::where('url', $url)->first();
                    break;
                case 'audio':
                    $listingcategory = Audio::where('url', $url)->first();
                    break;
                case 'cameras':
                    $listingcategory = Camera::where('url', $url)->first();
                    break;
                case 'chargers':
                    $listingcategory = Charger::where('url', $url)->first();
                    break;
                case 'drones':
                    $listingcategory = Drone::where('url', $url)->first();
                    break;
                case 'gaming':
                    $listingcategory = Gaming::where('url', $url)->first();
                    break;
                case 'laptops':
                    $listingcategory = Laptop::where('url', $url)->first();
                    break;
                case 'lighting':
                    $listingcategory = Lighting::where('url', $url)->first();
                    break;
                case 'printers':
                    $listingcategory = Printer::where('url', $url)->first();
                    break;
                case 'routers':
                    $listingcategory = Router::where('url', $url)->first();
                    break;
                case 'tablets':
                    $listingcategory = Tablette::where('url', $url)->first();
                    break;
                case 'eclairage':
                    $listingcategory = Eclairage::where('url', $url)->first();
                    break;
                case 'mobilier':
                    $listingcategory = Mobilier::where('url', $url)->first();
                    break;
                case 'photography':
                    $listingcategory = Photographie::where('url', $url)->first();
                    break;
                case 'sound-systems':
                    $listingcategory = Sonorisation::where('url', $url)->first();
                    break;
                case 'tents':
                    $listingcategory = Tente::where('url', $url)->first();
                    break;
                case 'clothes':
                    $listingcategory = Clothes::where('url', $url)->first();
                    break;
                case 'jewelry':
                    $listingcategory = Jewelry::where('url', $url)->first();
                    break;
                case 'apartments':
                    $listingcategory = Apartment::where('url', $url)->first();



                    break;
                case 'offices':
                    $listingcategory = Bureaux::where('url', $url)->first();
                    break;
                case 'shops':
                    $listingcategory = Magasin::where('url', $url)->first();
                    break;
                case 'houses':
                    $listingcategory = Maison::where('url', $url)->first();
                    break;
                case 'riads':
                    $listingcategory = Riad::where('url', $url)->first();
                    break;
                case 'lands':
                    $listingcategory = Terrain::where('url', $url)->first();
                    break;
                case 'villas':
                    $listingcategory = Villa::where('url', $url)->first();
                    break;
                case 'activities':
                    $listingcategory = Activity::where('url', $url)->first();
                    break;
                case 'books':
                    $listingcategory = Livre::where('url', $url)->first();
                    break;
                case 'musical':
                    $listingcategory = Musical::where('url', $url)->first();
                    break;
                case 'furniture':
                    $listingcategory = Furniture::where('url', $url)->first();
                    break;
                case 'home-appliances':
                    $listingcategory = Houseappliance::where('url', $url)->first();
                    break;
                case 'electrical-tools':
                    $listingcategory = Electricaltool::where('url', $url)->first();
                    break;
                case 'ladders':
                    $listingcategory = Ladder::where('url', $url)->first();
                    break;
                case 'mechanical-tools':
                    $listingcategory = Mechanicaltool::where('url', $url)->first();
                    break;
                case 'power-tools':
                    $listingcategory = Powertool::where('url', $url)->first();
                    break;
                case 'pressure-washers':
                    $listingcategory = Pressurewasher::where('url', $url)->first();
                    break;
                case 'services':
                    $listingcategory = Service::where('url', $url)->first();
                    break;
                case 'boats':
                    $listingcategory = Boat::where('url', $url)->first();
                    break;
                case 'trucks':
                    $listingcategory = Camion::where('url', $url)->first();
                    break;
                case 'caravans':
                    $listingcategory = Caravan::where('url', $url)->first();
                    break;
                case 'cars':
                    $listingcategory = Car::where('url', $url)->first();
                    break;
                case 'engins':
                    $listingcategory = Engin::where('url', $url)->first();
                    break;
                case 'motorcycles':
                    $listingcategory = Moto::where('url', $url)->first();
                    break;
                case 'scooters':
                    $listingcategory = Scooter::where('url', $url)->first();
                    break;
                case 'airport-taxis':
                    $listingcategory = Taxiaeroport::where('url', $url)->first();
                    break;
                case 'transportation':
                    $listingcategory = Transportation::where('url', $url)->first();
                    break;
                case 'bicycles':
                    $listingcategory = Velo::where('url', $url)->first();
                    break;
                default:
                    $listingcategory = null;
            }




                    $images = $listingcategory->servicesimg;
                    if ($images) {
                        foreach ($images as $image) {


                            Storage::disk('spaces')->delete('storage/listinglarge/' . $image->picture);
                            Storage::disk('spaces')->delete('storage/listingsmall/' . $image->picturesmall);
                            Storage::disk('spaces')->delete('storage/listingxlarge/' . $image->picturesxlarge);


                        }

                        // Delete the image records from the database
                        $listingcategory->servicesimg()->delete();
                    }





                $listing->delete();



                if ($listingcategory) {

                    $listingcategory->delete();
                }

                return response()->json(['message' => 'Listing deleted successfully'], 200);
        }


        return response()->json(['message' => 'Listing not found'], 404);
    }





}
