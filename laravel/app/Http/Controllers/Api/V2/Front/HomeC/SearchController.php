<?php

namespace App\Http\Controllers\Api\V2\Front\HomeC;

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






class SearchController extends JsonApiController
{



    public function getSearchListings(Request $request)
    {


        //$authuser = Auth::user();




        $favorites = Favorite::where('user_id', 1)->get();







        $billiard_ids = array_filter($favorites->pluck('billiard_id')->toArray());
        $boxing_ids = array_filter($favorites->pluck('boxing_id')->toArray());
        $diving_ids = array_filter($favorites->pluck('diving_id')->toArray());
        $football_ids = array_filter($favorites->pluck('football_id')->toArray());
        $golf_ids = array_filter($favorites->pluck('golf_id')->toArray());
        $hunting_ids = array_filter($favorites->pluck('hunting_id')->toArray());
        $musculation_ids = array_filter($favorites->pluck('musculation_id')->toArray());
        $surf_ids = array_filter($favorites->pluck('surf_id')->toArray());
        $tennis_ids = array_filter($favorites->pluck('tennis_id')->toArray());
        $audio_ids = array_filter($favorites->pluck('audio_id')->toArray());
        $camera_ids = array_filter($favorites->pluck('camera_id')->toArray());
        $charger_ids = array_filter($favorites->pluck('charger_id')->toArray());
        $drone_ids = array_filter($favorites->pluck('drone_id')->toArray());
        $gaming_ids = array_filter($favorites->pluck('gaming_id')->toArray());
        $laptop_ids = array_filter($favorites->pluck('laptop_id')->toArray());
        $lighting_ids = array_filter($favorites->pluck('lighting_id')->toArray());
        $printer_ids = array_filter($favorites->pluck('printer_id')->toArray());
        $router_ids = array_filter($favorites->pluck('router_id')->toArray());
        $tablette_ids = array_filter($favorites->pluck('tablette_id')->toArray());
        $eclairage_ids = array_filter($favorites->pluck('eclairage_id')->toArray());
        $mobilier_ids = array_filter($favorites->pluck('mobilier_id')->toArray());
        $photographie_ids = array_filter($favorites->pluck('photographie_id')->toArray());
        $sonorisation_ids = array_filter($favorites->pluck('sonorisation_id')->toArray());
        $tente_ids = array_filter($favorites->pluck('tente_id')->toArray());
        $clothes_ids = array_filter($favorites->pluck('clothes_id')->toArray());
        $jewelry_ids = array_filter($favorites->pluck('jewelry_id')->toArray());
        $apartment_ids = array_filter($favorites->pluck('apartment_id')->toArray());
        $bureaux_ids = array_filter($favorites->pluck('bureaux_id')->toArray());
        $magasin_ids = array_filter($favorites->pluck('magasin_id')->toArray());
        $maison_ids = array_filter($favorites->pluck('maison_id')->toArray());
        $riad_ids = array_filter($favorites->pluck('riad_id')->toArray());
        $terrain_ids = array_filter($favorites->pluck('terrain_id')->toArray());
        $villa_ids = array_filter($favorites->pluck('villa_id')->toArray());
        $activity_ids = array_filter($favorites->pluck('activity_id')->toArray());
        $livre_ids = array_filter($favorites->pluck('livre_id')->toArray());
        $musical_ids = array_filter($favorites->pluck('musical_id')->toArray());
        $furniture_ids = array_filter($favorites->pluck('furniture_id')->toArray());
        $houseappliance_ids = array_filter($favorites->pluck('houseappliance_id')->toArray());
        $electricaltool_ids = array_filter($favorites->pluck('electricaltool_id')->toArray());
        $ladder_ids = array_filter($favorites->pluck('ladder_id')->toArray());
        $mechanicaltool_ids = array_filter($favorites->pluck('mechanicaltool_id')->toArray());
        $powertool_ids = array_filter($favorites->pluck('powertool_id')->toArray());
        $pressurewasher_ids = array_filter($favorites->pluck('pressurewasher_id')->toArray());
        $service_ids = array_filter($favorites->pluck('service_id')->toArray());
        $boat_ids = array_filter($favorites->pluck('boat_id')->toArray());
        $camion_ids = array_filter($favorites->pluck('camion_id')->toArray());
        $caravan_ids = array_filter($favorites->pluck('caravan_id')->toArray());
        $car_ids = array_filter($favorites->pluck('car_id')->toArray());
        $engin_ids = array_filter($favorites->pluck('engin_id')->toArray());
        $moto_ids = array_filter($favorites->pluck('moto_id')->toArray());
        $scooter_ids = array_filter($favorites->pluck('scooter_id')->toArray());
        $taxiaeroport_ids = array_filter($favorites->pluck('taxiaeroport_id')->toArray());
        $transportation_ids = array_filter($favorites->pluck('transportation_id')->toArray());
        $velo_ids = array_filter($favorites->pluck('velo_id')->toArray());




        $favoriteIds = array_merge(
            $billiard_ids,
            $boxing_ids,
            $diving_ids,
            $football_ids,
            $golf_ids,
            $hunting_ids,
            $musculation_ids,
            $surf_ids,
            $tennis_ids,
            $audio_ids,
            $camera_ids,
            $charger_ids,
            $drone_ids,
            $gaming_ids,
            $laptop_ids,
            $lighting_ids,
            $printer_ids,
            $router_ids,
            $tablette_ids,
            $eclairage_ids,
            $mobilier_ids,
            $photographie_ids,
            $sonorisation_ids,
            $tente_ids,
            $clothes_ids,
            $jewelry_ids,
            $apartment_ids,
            $bureaux_ids,
            $magasin_ids,
            $maison_ids,
            $riad_ids,
            $terrain_ids,
            $villa_ids,
            $activity_ids,
            $livre_ids,
            $musical_ids,
            $furniture_ids,
            $houseappliance_ids,
            $electricaltool_ids,
            $ladder_ids,
            $mechanicaltool_ids,
            $powertool_ids,
            $pressurewasher_ids,
            $service_ids,
            $boat_ids,
            $camion_ids,
            $caravan_ids,
            $car_ids,
            $engin_ids,
            $moto_ids,
            $scooter_ids,
            $taxiaeroport_ids,
            $transportation_ids,
            $velo_ids
        );







        if ($request->has('searchCategories')) {

            $category = strtolower($request->input('searchCategories'));



            switch ($category) {


                case 'billiards':



                    $query = Billiard::query();
                    break;


                case 'boxings':

                    $query = Boxing::query();
                    break;

                case 'activities':
                    $query = Activity::query();
                    break;

                case 'apartments':
                    $query = Apartment::query();
                    break;

                case 'audios':
                    $query = Audio::query();
                    break;

                case 'boats':
                    $query = Boat::query();
                    break;

                case 'boxings':
                    $query = Boxing::query();
                    break;

                case 'bureauxs':
                    $query = Bureaux::query();
                    break;

                case 'cameras':
                    $query = Camera::query();
                    break;

                case 'camions':
                    $query = Camion::query();
                    break;

                case 'caravans':
                    $query = Caravan::query();
                    break;

                case 'cars':
                    $query = Car::query();
                    break;

                case 'chargers':
                    $query = Charger::query();
                    break;

                case 'clothes':
                    $query = Clothes::query();
                    break;

                case 'divings':
                    $query = Diving::query();
                    break;

                case 'drones':
                    $query = Drone::query();
                    break;

                case 'eclairages':
                    $query = Eclairage::query();
                    break;

                case 'electricaltools':
                    $query = Electricaltool::query();
                    break;

                case 'engins':
                    $query = Engin::query();
                    break;

                case 'footballs':
                    $query = Football::query();
                    break;

                case 'furnitures':
                    $query = Furniture::query();
                    break;

                case 'gamings':
                    $query = Gaming::query();
                    break;

                case 'golfs':
                    $query = Golf::query();
                    break;

                case 'houseappliances':
                    $query = Houseappliance::query();
                    break;

                case 'huntings':
                    $query = Hunting::query();
                    break;

                case 'jewelrys':
                    $query = Jewelry::query();
                    break;

                case 'ladders':
                    $query = Ladder::query();
                    break;

                case 'laptops':
                    $query = Laptop::query();
                    break;

                case 'lightings':
                    $query = Lighting::query();
                    break;

                case 'livres':
                    $query = Livre::query();
                    break;

                case 'magasins':
                    $query = Magasin::query();
                    break;

                case 'maisons':
                    $query = Maison::query();
                    break;

                case 'mechanicaltools':
                    $query = Mechanicaltool::query();
                    break;

                case 'mobiliers':
                    $query = Mobilier::query();
                    break;

                case 'motos':
                    $query = Moto::query();
                    break;

                case 'musculations':
                    $query = Musculation::query();
                    break;

                case 'musicals':
                    $query = Musical::query();
                    break;

                case 'photographies':
                    $query = Photographie::query();
                    break;

                case 'powertools':
                    $query = Powertool::query();
                    break;

                case 'pressurewashers':
                    $query = Pressurewasher::query();
                    break;

                case 'printers':
                    $query = Printer::query();
                    break;

                case 'riads':
                    $query = Riad::query();
                    break;

                case 'routers':
                    $query = Router::query();
                    break;

                case 'scooters':
                    $query = Scooter::query();
                    break;

                case 'services':
                    $query = Service::query();
                    break;

                case 'sonorisations':
                    $query = Sonorisation::query();
                    break;

                case 'surfs':
                    $query = Surf::query();
                    break;

                case 'tablettes':
                    $query = Tablette::query();
                    break;

                case 'taxiaeroports':
                    $query = Taxiaeroport::query();
                    break;

                case 'tennis':
                    $query = Tennis::query();
                    break;

                case 'tentes':
                    $query = Tente::query();
                    break;

                case 'terrains':
                    $query = Terrain::query();
                    break;

                case 'transportations':
                    $query = Transportation::query();
                    break;

                case 'velos':
                    $query = Velo::query();
                    break;

                case 'villas':
                    $query = Villa::query();
                    break;

                default:
                    return response()->json(['error' => 'Invalid category'], 400);
            }




            // Apply location search if present
            if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {
                Log::info('Applying searchLocation:', ['location' => $request->input('searchLocation')]);

                $query->where('city', 'like', '%' . $request->input('searchLocation') . '%');
            }

            $listings = $query->get();

            Log::info('Query results:', ['listings' => $listings]);


            $listingsData = $listings->map(function ($listing) use ($category) {
                return [
                    'type' => 'listings',
                    'id' => $listing->id,
                    'attributes' => [
                        'title' => $listing->title,
                        'price' => $listing->price,
                        'city' => $listing->city,
                        'id' => $listing->id,



                        'category' => $category,
                        'url' => $listing->url,
                        'created_at' => $listing->created_at,
                        'picture' => $listing->picture,
                    ],
                ];
            });


                            // Ensure JSON:API compliance
                return response()->json([
                    'data' => $listingsData,
                    'favorites' => $favoriteIds,

                ]);






        } else {


            $query = Listing::query();

            if ($request->has('searchLocation') && $request->input('searchLocation') !== '' && $request->input('searchLocation') !== 'null') {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', '%' . $request->input('searchKeyword') . '%')
                      ->where('city', 'like', '%' . $request->input('searchLocation') . '%');
                });
            } else {
                $query->where('title', 'like', '%' . $request->input('searchKeyword') . '%');
            }

            $listings = $query->get();

            $listingsData = $listings->map(function ($listing) {
                return [
                    'type' => 'listings',
                    'id' => $listing->id,
                    'attributes' => [
                        'title' => $listing->title,
                        'price' => $listing->price,
                        'city' => $listing->city,
                        'id' => $listing->id,



                        'category' => $listing->category,
                        'url' => $listing->url,
                        'created_at' => $listing->created_at,
                        'picture' => $listing->picture,
                    ],
                ];
            });


                            // Ensure JSON:API compliance
                return response()->json([
                    'data' => $listingsData,
                    'favorites' => $favoriteIds,

                ]);


        }






    }





}
