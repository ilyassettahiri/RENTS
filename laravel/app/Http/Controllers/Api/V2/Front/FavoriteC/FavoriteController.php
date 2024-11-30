<?php

namespace App\Http\Controllers\Api\V2\Front\FavoriteC;

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

use App\Models\Reservation;


use App\Models\Onlinestore;
use App\Models\Favoritestore;



use App\Models\Review;

use App\Models\Reviewreply;

use App\Models\Favorite;

use App\Models\Listing;

use App\Models\Listingsimg;

use App\Models\User;


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
use App\Models\Job  ;


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
use App\Models\Jobsimg;

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






class FavoriteController extends JsonApiController
{


    public function getFavorites(JsonApiRoute $route, Store $store )
    {
        $authuser = Auth::user();


        if ($authuser) {
            $favorites = Favorite::where('user_id', $authuser->id)->get();

            // Create an array of objects containing category and id
            $favoriteCategoriesAndIds = $favorites->map(function ($favorite) {
                return [
                    'category' => $favorite->category, // Assuming you have a 'category' field in your Favorite model
                    'id' => $favorite->id,             // The ID of the listing or favorite item
                ];
            })->toArray();


        }

        $favoritelistingsData = $favorites->map(function ($favorite) {

            $user = User::where('id', $favorite->user_id)->first();


                    // Define a helper function to get the images based on the category
                    $getImages = function ($favorite) {


                        switch ($favorite->category) {
                            case 'billiard':
                                return Billiardsimg::where('billiard_id', $favorite->billiard_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'boxing':
                                return Boxingsimg::where('boxing_id', $favorite->boxing_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'diving':
                                return Divingsimg::where('diving_id', $favorite->diving_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'football':
                                return Footballsimg::where('football_id', $favorite->football_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'golf':
                                return Golfsimg::where('golf_id', $favorite->golf_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'hunting':
                                return Huntingsimg::where('hunting_id', $favorite->hunting_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'gym':
                                return Musculationsimg::where('musculation_id', $favorite->musculation_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'surf':
                                return Surfsimg::where('surf_id', $favorite->surf_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'tennis':
                                return Tennisimg::where('tennis_id', $favorite->tennis_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'audio':
                                return Audiosimg::where('audio_id', $favorite->audio_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'cameras':
                                return Camerasimg::where('camera_id', $favorite->camera_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'chargers':
                                return Chargersimg::where('charger_id', $favorite->charger_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'drones':
                                return Dronesimg::where('drone_id', $favorite->drone_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'gaming':
                                return Gamingsimg::where('gaming_id', $favorite->gaming_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'laptops':
                                return Laptopsimg::where('laptop_id', $favorite->laptop_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'lighting':
                                return Lightingsimg::where('lighting_id', $favorite->lighting_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'printers':
                                return Printersimg::where('printer_id', $favorite->printer_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'routers':
                                return Routersimg::where('router_id', $favorite->router_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'tablets':
                                return Tablettesimg::where('tablette_id', $favorite->tablette_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'eclairage':
                                return Eclairagesimg::where('eclairage_id', $favorite->eclairage_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'mobilier':
                                return Mobiliersimg::where('mobilier_id', $favorite->mobilier_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'photography':
                                return Photographiesimg::where('photographie_id', $favorite->photographie_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'sound-systems':
                                return Sonorisationsimg::where('sonorisation_id', $favorite->sonorisation_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'tents':
                                return Tentesimg::where('tente_id', $favorite->tente_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'clothes':
                                return Clothesimg::where('clothes_id', $favorite->clothes_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'jewelry':
                                return Jewelrysimg::where('jewelry_id', $favorite->jewelry_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'apartments':
                                return Apartmentsimg::where('apartment_id', $favorite->apartment_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'offices':
                                return Bureauxsimg::where('bureaux_id', $favorite->bureaux_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'shops':
                                return Magasinsimg::where('magasin_id', $favorite->magasin_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'houses':
                                return Maisonsimg::where('maison_id', $favorite->maison_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'riads':
                                return Riadsimg::where('riad_id', $favorite->riad_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'lands':
                                return Terrainsimg::where('terrain_id', $favorite->terrain_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'villas':
                                return Villasimg::where('villa_id', $favorite->villa_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'activities':
                                return Activitiesimg::where('activity_id', $favorite->activity_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'books':
                                return Livresimg::where('livre_id', $favorite->livre_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'musical':
                                return Musicalsimg::where('musical_id', $favorite->musical_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'furniture':
                                return Furnituresimg::where('furniture_id', $favorite->furniture_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'home-appliances':
                                return Houseappliancesimg::where('houseappliance_id', $favorite->houseappliance_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'electrical-tools':
                                return Electricaltoolsimg::where('electricaltool_id', $favorite->electricaltool_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'ladders':
                                return Laddersimg::where('ladder_id', $favorite->ladder_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'mechanical-tools':
                                return Mechanicaltoolsimg::where('mechanicaltool_id', $favorite->mechanicaltool_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'power-tools':
                                return Powertoolsimg::where('powertool_id', $favorite->powertool_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'pressure-washers':
                                return Pressurewashersimg::where('pressurewasher_id', $favorite->pressurewasher_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'services':
                                return Servicesimg::where('service_id', $favorite->service_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });


                            case 'jobs':
                                return Jobsimg::where('job_id', $favorite->job_id)->get()->map(function ($image) {
                                        return [
                                            'picturesmall' => $image->picturesmall,
                                            'alttext' => $image->alttext,
                                        ];
                                });


                            case 'boats':
                                return Boatsimg::where('boat_id', $favorite->boat_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'trucks':
                                return Camionsimg::where('camion_id', $favorite->camion_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'caravans':
                                return Caravansimg::where('caravan_id', $favorite->caravan_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'cars':
                                return Carsimg::where('car_id', $favorite->car_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'engins':
                                return Enginsimg::where('engin_id', $favorite->engin_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'motorcycles':
                                return Motosimg::where('moto_id', $favorite->moto_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'scooters':
                                return Scootersimg::where('scooter_id', $favorite->scooter_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'airport-taxis':
                                return Taxiaeroportsimg::where('taxiaeroport_id', $favorite->taxiaeroport_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'transportation':
                                return Transportationsimg::where('transportation_id', $favorite->transportation_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            case 'bicycles':
                                return Velosimg::where('velo_id', $favorite->velo_id)->get()->map(function ($image) {
                                    return [
                                        'picturesmall' => $image->picturesmall,
                                        'alttext' => $image->alttext,
                                    ];
                                });
                            default:
                                return collect(); // Return an empty collection if no match
                        }
                    };



            return [
                'type' => 'favorites',
                'id' => $favorite->id,
                'attributes' => [
                    'title' => $favorite->title,
                    'price' => $favorite->price,
                    'city' => $favorite->city,
                    'id' => $favorite->id,

                    'images' => $getImages($favorite),

                    'category' => $favorite->category,
                    'url' => $favorite->url,
                    'created_at' => $favorite->listing_old,
                    'picture' => $favorite->picture,

                    'seller' => [
                        'name' => $user->name,
                        'profile_image' => $user->profile_image,
                        'created_at' => $user->created_at->toIso8601String(),

                    ],

                ],
            ];
        });


               // Ensure JSON:API compliance
            return response()->json([
                'data' => $favoritelistingsData,
                'favorites' => $favoriteCategoriesAndIds,

            ]);


    }




    public function createFavorite($category, $url, $id )
    {


            $authuser = Auth::user();




            $existingFavorite = Favorite::where('user_id', $authuser->id)
                ->where('url', $url)
                ->first();



            if ($existingFavorite) {



                $existingFavorite->delete();

                return response()->json(['favorite' => false]);






            } else {







            switch ($category) {



                    case 'billiard':





                        $listingcategory = Billiard::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'billiard_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);



                        break;





                    case 'boxing':






                        $listingcategory = Boxing::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'boxing_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);






                        break;






                    case 'diving':





                        $listingcategory = Diving::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'diving_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'football':






                        $listingcategory = Football::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'football_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'golf':






                        $listingcategory = Golf::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'golf_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;








                    case 'hunting':





                        $listingcategory = Hunting::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'hunting_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'gym':






                        $listingcategory = Musculation::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'musculation_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;








                    case 'surf':






                        $listingcategory = Surf::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'surf_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'tennis':






                        $listingcategory = Tennis::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'tennis_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'audio':






                        $listingcategory = Audio::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'audio_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'cameras':





                        $listingcategory = Camera::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'camera_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'chargers':






                        $listingcategory = Charger::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'charger_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'drones':





                        $listingcategory = Drone::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'drone_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;









                    case 'gaming':





                        $listingcategory = Gaming::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'gaming_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'laptops':





                        $listingcategory = Laptop::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'laptop_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;








                    case 'lighting':





                        $listingcategory = Lighting::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'lighting_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;








                    case 'printers':





                        $listingcategory = Printer::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'printer_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'routers':







                        $listingcategory = Router::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'router_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'tablets':







                        $listingcategory = Tablette::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'tablette_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'eclairage':






                        $listingcategory = Eclairage::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'eclairage_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'mobilier':






                        $listingcategory = Mobilier::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'mobilier_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'photography':





                        $listingcategory = Photographie::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'photographie_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'sound-systems':







                        $listingcategory = Sonorisation::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'sonorisation_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'tents':






                        $listingcategory = Tente::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'tente_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'clothes':






                        $listingcategory = Clothes::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'clothes_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;







                    case 'jewelry':






                        $listingcategory = Jewelry::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'jewelry_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'apartments':





                        $listingcategory = Apartment::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'apartment_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'offices':





                        $listingcategory = Bureaux::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'bureaux_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);









                        break;






                    case 'shops':






                        $listingcategory = Magasin::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'magasin_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'houses':





                        $listingcategory = Maison::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'maison_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'riads':






                        $listingcategory = Riad::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'riad_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'lands':





                        $listingcategory = Terrain::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'terrain_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'villas':





                        $listingcategory = Villa::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'villa_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'activities':






                        $listingcategory = Activity::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'activity_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'books':





                        $listingcategory = Livre::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'livre_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'musical':





                        $listingcategory = Musical::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'musical_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'furniture':





                        $listingcategory = Furniture::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'furniture_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'home-appliances':





                        $listingcategory = Houseappliance::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'houseappliance_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'electrical-tools':






                        $listingcategory = Electricaltool::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'electricaltool_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'ladders':





                        $listingcategory = Ladder::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'ladder_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'mechanical-tools':





                        $listingcategory = Mechanicaltool::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'mechanicaltool_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'power-tools':






                        $listingcategory = Powertool::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'powertool_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);






                        break;






                    case 'pressure-washers':





                        $listingcategory = Pressurewasher::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'pressurewasher_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;






                    case 'services':






                        $listingcategory = Service::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'service_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'jobs':







                        $listingcategory = Job::find($id);



                        $favorite = Favorite::create([
                            'user_id' => $authuser->id,
                            'seller_id' => $listingcategory->user_id,
                            'price' => $listingcategory->price,
                            'title' => $listingcategory->title,

                            'city' => $listingcategory->city,
                            'listing_old' => $listingcategory->created_at,


                            'url' => $url,
                            'job_id' => $id,
                            'picture' => $listingcategory->picture,
                            'category' => $category,
                            'status' => 'active',

                        ]);







                        break;




                    case 'boats':




                        $listingcategory = Boat::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'boat_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'trucks':




                        $listingcategory = Camion::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'camion_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'caravans':





                        $listingcategory = Caravan::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'caravan_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'cars':





                        $listingcategory = Car::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'car_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'engins':





                        $listingcategory = Engin::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'engin_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);









                        break;





                    case 'motorcycles':





                        $listingcategory = Moto::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'moto_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;





                    case 'scooters':





                        $listingcategory = Scooter::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'scooter_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    case 'airport-taxis':






                        $listingcategory = Taxiaeroport::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'taxiaeroport_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);







                        break;





                    case 'transportation':





                        $listingcategory = Transportation::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'transportation_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;







                    case 'bicycles':





                        $listingcategory = Velo::find($id);



                    $favorite = Favorite::create([
                        'user_id' => $authuser->id,
                        'seller_id' => $listingcategory->user_id,
                        'price' => $listingcategory->price,
                        'title' => $listingcategory->title,

                        'city' => $listingcategory->city,
                        'listing_old' => $listingcategory->created_at,


                        'url' => $url,
                        'velo_id' => $id,
                        'picture' => $listingcategory->picture,
                        'category' => $category,
                        'status' => 'active',

                    ]);








                        break;






                    default:
                        // Default code
                        break;
                    }





                return response()->json(['favorite' => true]);


            }

    }



    public function getFavoritestore(JsonApiRoute $route, Store $store )
    {
        $authuser = Auth::user();

        $favorites = Favoritestore::where('user_id', $authuser->id)->get();

        $favoriteIds = array_filter($favorites->pluck('id')->toArray());



        $favoritelistingsData = $favorites->map(function ($favorite) {

            $user = User::where('id', $favorite->user_id)->first();




            return [
                'type' => 'favorites',
                'id' => $favorite->id,
                'attributes' => [

                    'name' => $favorite->name,



                    'city' => $favorite->city,
                    'id' => $favorite->id,

                    'profile' => $favorite->profile_picture,


                    'url' => $favorite->url,
                    'created_at' => $favorite->listing_old,
                    'picture' => $favorite->picture,



                ],
            ];
        });


               // Ensure JSON:API compliance
            return response()->json([
                'data' => $favoritelistingsData,
                'favorites' => $favoriteIds,

            ]);


    }


    public function createFavoriteStore( $url, $id )
    {


        $authuser = Auth::user();




        $existingFavorite = Favoritestore::where('user_id', $authuser->id)
            ->where('url', $url)
            ->first();



        if ($existingFavorite) {



            $existingFavorite->delete();

            return response()->json(['favorite' => false]);






        } else {



            $listingcategory = Onlinestore::find($id);



            $favorite = Favoritestore::create([
                'user_id' => $authuser->id,
                'seller_id' => $listingcategory->user_id,



                'name' => $listingcategory->name,
                'profile_picture' => $listingcategory->profile_picture,


                'city' => $listingcategory->city,
                'listing_old' => $listingcategory->created_at,


                'url' => $url,
                'onlinestore_id' => $id,
                'picture' => $listingcategory->picture,

                'status' => 'active',

            ]);

            return response()->json(['favorite' => true]);


        }


    }


}
