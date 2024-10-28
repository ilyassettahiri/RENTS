<?php

namespace App\Http\Controllers\Api\V2\Front\ListingFrontC;

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







use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;


use App\Models\Review;

use App\Models\Reviewreply;

use App\Models\Favorite;

use App\Models\Listing;
use App\Models\User;

use App\Models\Reservation;

use App\Models\Onlinestore;



use App\Models\Billiard;
use App\Models\Boxing;
use App\Models\Diving  ;
use App\Models\Football  ;
use App\Models\Golf  ;
use App\Models\Hunting  ;
use App\Models\Musculation  ;
use App\Models\Surf  ;
use App\Models\Tennis  ;



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

use App\Models\Generaleinfo;





class DetailListingFrontController extends JsonApiController
{



    public function getListingpic(Request $request, $category, $url)
    {


        switch ($category) {
            case 'apartments':
                $listingCategory = Apartment::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {


                    return $image->picturesxlarge;
                });
                break;

            case 'billiard':
                $listingCategory = Billiard::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'activities':
                $listingCategory = Activity::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'audio':
                $listingCategory = Audio::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'boats':
                $listingCategory = Boat::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'boxing':
                $listingCategory = Boxing::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'offices':
                $listingCategory = Bureaux::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'cameras':
                $listingCategory = Camera::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'trucks':
                $listingCategory = Camion::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'caravans':
                $listingCategory = Caravan::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'cars':
                $listingCategory = Car::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'chargers':
                $listingCategory = Charger::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'clothes':
                $listingCategory = Clothes::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'diving':
                $listingCategory = Diving::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'drones':
                $listingCategory = Drone::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'eclairage':
                $listingCategory = Eclairage::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'electrical-tools':
                $listingCategory = Electricaltool::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'engins':
                $listingCategory = Engin::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'football':
                $listingCategory = Football::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'furniture':
                $listingCategory = Furniture::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'gaming':
                $listingCategory = Gaming::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'golf':
                $listingCategory = Golf::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'home-appliances':
                $listingCategory = Houseappliance::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'hunting':
                $listingCategory = Hunting::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'jewelry':
                $listingCategory = Jewelry::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'ladders':
                $listingCategory = Ladder::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'laptops':
                $listingCategory = Laptop::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'lighting':
                $listingCategory = Lighting::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'books':
                $listingCategory = Livre::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'shops':
                $listingCategory = Magasin::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'houses':
                $listingCategory = Maison::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'mechanical-tools':
                $listingCategory = Mechanicaltool::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'mobilier':
                $listingCategory = Mobilier::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'motorcycles':
                $listingCategory = Moto::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'gym':
                $listingCategory = Musculation::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'musical':
                $listingCategory = Musical::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'photography':
                $listingCategory = Photographie::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'power-tools':
                $listingCategory = Powertool::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'pressure-washers':
                $listingCategory = Pressurewasher::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'printers':
                $listingCategory = Printer::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'riads':
                $listingCategory = Riad::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'routers':
                $listingCategory = Router::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'scooters':
                $listingCategory = Scooter::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'services':
                $listingCategory = Service::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'sound-systems':
                $listingCategory = Sonorisation::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'surf':
                $listingCategory = Surf::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'tablets':
                $listingCategory = Tablette::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'airport-taxis':
                $listingCategory = Taxiaeroport::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'tennis':
                $listingCategory = Tennis::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'tents':
                $listingCategory = Tente::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'lands':
                $listingCategory = Terrain::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'transportation':
                $listingCategory = Transportation::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'bicycles':
                $listingCategory = Velo::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            case 'villas':
                $listingCategory = Villa::where('url', $url)->first();
                $images = $listingCategory->servicesimg->map(function ($image) {

                    return $image->picturesxlarge;
                });
                break;

            default:
                $listingCategory = null; // Or handle the default case as needed
                $images = [];
                break;
        }


        if ($listingCategory) {
            return response()->json([


                'images' => $images,
            ]);
        } else {
            return response()->json(['message' => 'Invalid category or no listing found'], 404);
        }

    }



    public function createReview(Request $request, $category, $url)
    {



                // Validate the request data
                $validatedData = $request->validate([
                    'name' => 'required|string|max:255',
                    'email' => 'required|email|max:255',
                    'description' => 'required|string|max:255',
                    'rating' => 'required|numeric|min:1|max:5',

                ]);











            switch ($category) {



                        case 'billiard':



                            $listingcategory = Billiard::where('url', $url)->first();



                                $review = Review::create([
                                    'name' => $validatedData['name'],
                                    'rating' => $validatedData['rating'],
                                    'email' => $validatedData['email'],
                                    'url' =>$url ,
                                    'category' =>$category ,
                                    'listings_thumb' =>$listingcategory->picture ,
                                    'listings_title' =>$listingcategory->title ,
                                    'listings_price' =>$listingcategory->price ,

                                    'description' =>$validatedData['description'],



                                    'billiard_id' =>$listingcategory->id,
                                    'user_id'=> $listingcategory->user_id,

                                    'onlinestore_id'=> $listingcategory->user_id,


                                ]);




                                return response()->json([
                                    'data' => [
                                        'type' => $category,
                                        'id' => $review->id,
                                        'attributes' => [
                                            'name' => $review->name,
                                            'rating' => $review->rating,
                                            'description' => $review->description,
                                            'created_at' => $review->created_at->toIso8601String(),





                                        ],
                                    ],
                                ]);





                        break;





                        case 'boxing':



                            $listingcategory = Boxing::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'boxing_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'diving':



                            $listingcategory = Diving::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'diving_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'football':



                            $listingcategory = Football::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'football_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'golf':



                            $listingcategory = Golf::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'golf_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;








                        case 'hunting':



                            $listingcategory = Hunting::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'hunting_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'gym':



                            $listingcategory = Musculation::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'musculation_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;








                        case 'surf':



                            $listingcategory = Surf::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'surf_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'tennis':



                            $listingcategory = Tennis::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'tennis_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'audio':



                            $listingcategory = Audio::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'audio_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'cameras':



                            $listingcategory = Camera::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'camera_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'chargers':



                            $listingcategory = Charger::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'charger_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);






                            break;






                        case 'drones':



                            $listingcategory = Drone::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'drone_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;









                        case 'gaming':



                            $listingcategory = Gaming::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'gaming_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'laptops':



                            $listingcategory = Laptop::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'laptop_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;








                        case 'lighting':



                            $listingcategory = Lighting::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'lighting_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;








                        case 'printers':



                            $listingcategory = Printer::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'printer_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'routers':



                            $listingcategory = Router::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'router_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);






                            break;







                        case 'tablets':



                            $listingcategory = Tablette::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'tablette_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);






                            break;







                        case 'eclairage':



                            $listingcategory = Eclairage::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'eclairage_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'mobilier':



                            $listingcategory = Mobilier::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'mobilier_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'photography':



                            $listingcategory = Photographie::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'photographie_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'sound-systems':



                            $listingcategory = Sonorisation::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'sonorisation_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);






                            break;







                        case 'tents':



                            $listingcategory = Tente::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'tente_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'clothes':



                            $listingcategory = Clothes::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'clothes_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'jewelry':



                            $listingcategory = Jewelry::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'jewelry_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'apartments':



                            $listingcategory = Apartment::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'apartment_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'offices':



                            $listingcategory = Bureaux::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'bureaux_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);






                            break;






                        case 'shops':



                            $listingcategory = Magasin::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'magasin_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'houses':



                            $listingcategory = Maison::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'maison_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'riads':



                            $listingcategory = Riad::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'riad_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;





                        case 'lands':



                            $listingcategory = Terrain::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'terrain_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;







                        case 'villas':



                            $listingcategory = Villa::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'villa_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'activities':



                            $listingcategory = Activity::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'activity_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'books':



                            $listingcategory = Livre::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'livre_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'musical':



                            $listingcategory = Musical::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'musical_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'furniture':



                            $listingcategory = Furniture::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'furniture_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'home-appliances':



                            $listingcategory = Houseappliance::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'houseappliance_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'electrical-tools':



                            $listingcategory = Electricaltool::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'electricaltool_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);






                            break;






                        case 'ladders':



                            $listingcategory = Ladder::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'ladder_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'mechanical-tools':



                            $listingcategory = Mechanicaltool::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'mechanicaltool_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;





                        case 'power-tools':



                            $listingcategory = Powertool::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'powertool_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'pressure-washers':



                            $listingcategory = Pressurewasher::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'pressurewasher_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'services':



                            $listingcategory = Service::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'service_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);





                            break;






                        case 'boats':



                            $listingcategory = Boat::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'boat_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;






                        case 'trucks':



                            $listingcategory = Camion::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'camion_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;





                        case 'caravans':



                            $listingcategory = Caravan::where('url', $url)->first();



                            $review = Review::create([
                                'name' => $validatedData['name'],
                                'rating' => $validatedData['rating'],
                                'email' => $validatedData['email'],
                                'url' =>$url ,
                                'category' =>$category ,
                                'listings_thumb' =>$listingcategory->picture ,
                                'listings_title' =>$listingcategory->title ,
                                'listings_price' =>$listingcategory->price ,

                                'description' =>$validatedData['description'],



                                'caravan_id' =>$listingcategory->id,
                                'user_id'=> $listingcategory->user_id,

                                'onlinestore_id'=> $listingcategory->user_id,


                            ]);




                            return response()->json([
                                'data' => [
                                    'type' => $category,
                                    'id' => $review->id,
                                    'attributes' => [
                                        'name' => $review->name,
                                        'rating' => $review->rating,
                                        'description' => $review->description,
                                        'created_at' => $review->created_at->toIso8601String(),





                                    ],
                                ],
                            ]);




                            break;





                        case 'cars':



                        $listingcategory = Car::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'car_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);





                        break;





                    case 'engins':



                        $listingcategory = Engin::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'engin_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);






                        break;





                    case 'motorcycles':



                        $listingcategory = Moto::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'moto_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);





                        break;





                    case 'scooters':



                        $listingcategory = Scooter::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'scooter_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);





                        break;






                    case 'airport-taxis':



                        $listingcategory = Taxiaeroport::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'taxiaeroport_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);





                        break;





                    case 'transportation':



                        $listingcategory = Transportation::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'transportation_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);





                        break;







                    case 'bicycles':



                        $listingcategory = Velo::where('url', $url)->first();



                        $review = Review::create([
                            'name' => $validatedData['name'],
                            'rating' => $validatedData['rating'],
                            'email' => $validatedData['email'],
                            'url' =>$url ,
                            'category' =>$category ,
                            'listings_thumb' =>$listingcategory->picture ,
                            'listings_title' =>$listingcategory->title ,
                            'listings_price' =>$listingcategory->price ,

                            'description' =>$validatedData['description'],



                            'velo_id' =>$listingcategory->id,
                            'user_id'=> $listingcategory->user_id,

                            'onlinestore_id'=> $listingcategory->user_id,


                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $review->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'rating' => $review->rating,
                                    'description' => $review->description,
                                    'created_at' => $review->created_at->toIso8601String(),





                                ],
                            ],
                        ]);





                        break;






                    default:
                        // Default code
                        break;
            }






    }




    public function addToHelpful(Request $request, $category, $url, $reviewId)
    {
        $review = Review::find($reviewId);

        if ($review) {
            $review->like += 1;
            $review->save();

            return response()->json([
                'success' => true,
                'likes' => $review->like
            ]);
        }

        return response()->json(['success' => false], 404);
    }



    public function createReviewReply(Request $request, $category, $url, $reviewId)
    {
                        $review = Review::find($reviewId);

                        $user = Auth::user();

                        // Validate the request data
                        $validatedData = $request->validate([
                            'message' => 'required|string|max:255',


                        ]);




                        $Reviewreply = Reviewreply::create([
                            'message' => $validatedData['message'],


                            'picture' => $user->profile_image ,
                            'name' => $user->name ,
                            'email' => $user->email ,




                            'review_id' =>$reviewId,
                            'user_id'=> $user->id,

                        ]);




                        return response()->json([
                            'data' => [
                                'type' => $category,
                                'id' => $Reviewreply->id,
                                'attributes' => [
                                    'name' => $review->name,
                                    'message' => $Reviewreply->message,
                                    'picture' => $Reviewreply->picture,
                                    'created_at' => $Reviewreply->created_at->toIso8601String(),





                                ],
                            ],
                        ]);



    }






}
