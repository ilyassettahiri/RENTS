<?php

namespace App\Http\Controllers\Api\V2\Front\BusinessC;

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



use App\Models\Listing;

use App\Models\Favorite;




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
use App\Models\Onlinestore;






class SearchBusinessController extends JsonApiController
{



    public function getSearchBusinessListings(Request $request)
    {





        if ($request->has('searchCategories')) {

            $category = strtolower($request->input('searchCategories'));



            $query = Onlinestore::query();




            // Apply location search if present
            if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {
                Log::info('Applying searchLocation:', ['location' => $request->input('searchLocation')]);

                $query->where('city', 'like', '%' . $request->input('searchLocation') . '%');
            }

            $businesslist = $query->get();

            Log::info('Query results:', ['listings' => $listings]);



            $businessData = $businesslist->map(function ($business) {
                return [
                    'type' => 'business',
                    'id' => $business->id,
                    'attributes' => [
                        'name' => $business->name,
                        'description' => $business->description,
                        'city' => $business->city,
                        'id' => $business->id,



                        'url' => $business->url,
                        'created_at' => $business->created_at,
                        'picture' => $business->picture,

                        'profile' => $business->profile_picture,



                    ],
                ];
            });




            // Ensure JSON:API compliance
            return response()->json([
                'data' => $businessData,

            ]);






        } else {


            $query = Onlinestore::query();

            if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {
                $query->where(function($q) use ($request) {
                    $q->where('name', 'like', '%' . $request->input('searchKeyword') . '%')
                      ->where('city', 'like', '%' . $request->input('searchLocation') . '%');
                });
            } else {
                $query->where('name', 'like', '%' . $request->input('searchKeyword') . '%');
            }

            $businesslist = $query->get();


            $businessData = $businesslist->map(function ($business) {
                return [
                    'type' => 'business',
                    'id' => $business->id,
                    'attributes' => [
                        'name' => $business->name,
                        'description' => $business->description,
                        'city' => $business->city,
                        'id' => $business->id,

                        'picture' => $business->picture,

                        'profile' => $business->profile_picture,

                        'url' => $business->url,
                        'created_at' => $business->created_at,



                    ],
                ];
            });




            // Ensure JSON:API compliance
            return response()->json([
                'data' => $businessData,

            ]);



        }






    }





}
