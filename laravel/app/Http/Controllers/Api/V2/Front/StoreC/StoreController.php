<?php

namespace App\Http\Controllers\Api\V2\Front\StoreC;

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

use App\Models\Review;

use App\Models\Reviewreply;

use App\Models\Favorite;

use App\Models\Favoritestore;




use App\Models\Listingsimg;

use App\Models\Listing;
use App\Models\User;

use App\Models\Onlinestore;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;





use App\Models\Reservation;


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





class StoreController extends JsonApiController
{




    public function getStore(Request $request, $url)
    {


            $authuser = Auth::user();




            if ($authuser) {


                $favoritestore = Favoritestore::where('user_id', $authuser->id)->get();
                $favoriteIdstore = $favoritestore->pluck('onlinestore_id')->toArray();


                $favorites = Favorite::where('user_id', $authuser->id)->get();



                $categories = [
                    'billiards' => array_filter($favorites->pluck('billiard_id')->toArray()),
                    'boxing' => array_filter($favorites->pluck('boxing_id')->toArray()),
                    'diving' => array_filter($favorites->pluck('diving_id')->toArray()),
                    'football' => array_filter($favorites->pluck('football_id')->toArray()),
                    'golf' => array_filter($favorites->pluck('golf_id')->toArray()),
                    'hunting' => array_filter($favorites->pluck('hunting_id')->toArray()),
                    'musculation' => array_filter($favorites->pluck('musculation_id')->toArray()),
                    'surf' => array_filter($favorites->pluck('surf_id')->toArray()),
                    'tennis' => array_filter($favorites->pluck('tennis_id')->toArray()),
                    'audio' => array_filter($favorites->pluck('audio_id')->toArray()),
                    'camera' => array_filter($favorites->pluck('camera_id')->toArray()),
                    'charger' => array_filter($favorites->pluck('charger_id')->toArray()),
                    'drone' => array_filter($favorites->pluck('drone_id')->toArray()),
                    'gaming' => array_filter($favorites->pluck('gaming_id')->toArray()),
                    'laptop' => array_filter($favorites->pluck('laptop_id')->toArray()),
                    'lighting' => array_filter($favorites->pluck('lighting_id')->toArray()),
                    'printer' => array_filter($favorites->pluck('printer_id')->toArray()),
                    'router' => array_filter($favorites->pluck('router_id')->toArray()),
                    'tablette' => array_filter($favorites->pluck('tablette_id')->toArray()),
                    'eclairage' => array_filter($favorites->pluck('eclairage_id')->toArray()),
                    'mobilier' => array_filter($favorites->pluck('mobilier_id')->toArray()),
                    'photographie' => array_filter($favorites->pluck('photographie_id')->toArray()),
                    'sonorisation' => array_filter($favorites->pluck('sonorisation_id')->toArray()),
                    'tente' => array_filter($favorites->pluck('tente_id')->toArray()),
                    'clothes' => array_filter($favorites->pluck('clothes_id')->toArray()),
                    'jewelry' => array_filter($favorites->pluck('jewelry_id')->toArray()),
                    'apartment' => array_filter($favorites->pluck('apartment_id')->toArray()),
                    'bureaux' => array_filter($favorites->pluck('bureaux_id')->toArray()),
                    'magasin' => array_filter($favorites->pluck('magasin_id')->toArray()),
                    'maison' => array_filter($favorites->pluck('maison_id')->toArray()),
                    'riad' => array_filter($favorites->pluck('riad_id')->toArray()),
                    'terrain' => array_filter($favorites->pluck('terrain_id')->toArray()),
                    'villa' => array_filter($favorites->pluck('villa_id')->toArray()),
                    'activity' => array_filter($favorites->pluck('activity_id')->toArray()),
                    'livre' => array_filter($favorites->pluck('livre_id')->toArray()),
                    'musical' => array_filter($favorites->pluck('musical_id')->toArray()),
                    'furniture' => array_filter($favorites->pluck('furniture_id')->toArray()),
                    'houseappliance' => array_filter($favorites->pluck('houseappliance_id')->toArray()),
                    'electricaltool' => array_filter($favorites->pluck('electricaltool_id')->toArray()),
                    'ladder' => array_filter($favorites->pluck('ladder_id')->toArray()),
                    'mechanicaltool' => array_filter($favorites->pluck('mechanicaltool_id')->toArray()),
                    'powertool' => array_filter($favorites->pluck('powertool_id')->toArray()),
                    'pressurewasher' => array_filter($favorites->pluck('pressurewasher_id')->toArray()),
                    'service' => array_filter($favorites->pluck('service_id')->toArray()),
                    'boat' => array_filter($favorites->pluck('boat_id')->toArray()),
                    'camion' => array_filter($favorites->pluck('camion_id')->toArray()),
                    'caravan' => array_filter($favorites->pluck('caravan_id')->toArray()),
                    'car' => array_filter($favorites->pluck('car_id')->toArray()),
                    'engin' => array_filter($favorites->pluck('engin_id')->toArray()),
                    'moto' => array_filter($favorites->pluck('moto_id')->toArray()),
                    'scooter' => array_filter($favorites->pluck('scooter_id')->toArray()),
                    'taxiaeroport' => array_filter($favorites->pluck('taxiaeroport_id')->toArray()),
                    'transportation' => array_filter($favorites->pluck('transportation_id')->toArray()),
                    'velo' => array_filter($favorites->pluck('velo_id')->toArray()),
                ];

                // Flatten the array to return an array of category names and their corresponding listing IDs
                $favoriteCategories = [];
                foreach ($categories as $category => $ids) {
                    foreach ($ids as $id) {
                        $favoriteCategories[] = [
                            'category' => $category,
                            'id' => $id,
                        ];
                    }
                }


            }






            $store = Onlinestore::where('url', $url)->first();
            $reservations = $store->reservation()->get();
            $listings = $store->listing()->get();

            $seller = User::where('id', $store->user_id)->first();


            $storereviews = $store->review()->orderBy('created_at')->get();

            $totalReviews = $storereviews->count();
            $averageRating = $totalReviews > 0 ? $storereviews->avg('rating') : 0;



            $listingsData = [


                    'type' => $store,
                    'id' => $store->id,
                    'attributes' => [
                        'name' => $store->name,
                        'description' => $store->description,

                        'address' => $store->address,
                        'city' => $store->city,
                        'id' => $store->id,

                        'phone' => $store->phone,



                        'picture' => $store->picture,

                        'profile' => $store->profile_picture,


                        'seller' => [
                            'name' => $seller->name,
                            'id' => $seller->id,

                            'profile_image' => $seller->profile_image,
                            'created_at' => $seller->created_at->toIso8601String(),

                        ],




                        'country' => $store->country,
                        'zip' => $store->zip,
                        'url' => $url,


                        'created_at' => $store->created_at,
                        'reservations' => $reservations->map(function ($reservation) {
                            return [
                                'start' => $reservation->reservationstart,
                                'end' => $reservation->reservationsend,
                            ];
                        }),

                        'storereviews' => $storereviews->map(function ($review) {
                            return [
                                'id' => $review->id, // Ensure id is included

                                'name' => $review->name,
                                'rating' => $review->rating,
                                'message' => $review->description,
                                'helpful' => $review->like,

                                'created_at' => $review->created_at->toIso8601String(),





                            ];
                        }),



                        'listings' => $listings->map(function ($listing) {


                            $images = $listing->listingsimg->map(function ($image) {
                                return [
                                    'picturesmall' => $image->picturesmall,
                                    'alttext' => $image->alttext,
                                ];
                            });

                                $reviews = $listing->review()->orderBy('created_at')->get(); // Adjust this to use the appropriate relationship
                                $totalReviews = $reviews->count();
                                $averageRating = $totalReviews > 0 ? $reviews->avg('rating') : 5; // Set default to 5 if no reviews

                                $getIdOnly = function ($listing) {
                                    $result = ['id' => null]; // Initialize the result with default value

                                    switch ($listing->category) {
                                        case 'billiards':
                                            $billiard = Billiard::where('url', $listing->url)->first();
                                            if ($billiard) {
                                                $listing->billiard_id = $billiard->id;
                                                $result['id'] = $billiard->id;
                                            }
                                            break;

                                        case 'boxings':
                                            $boxing = Boxing::where('url', $listing->url)->first();
                                            if ($boxing) {
                                                $listing->boxing_id = $boxing->id;
                                                $result['id'] = $boxing->id;
                                            }
                                            break;

                                        case 'divings':
                                            $diving = Diving::where('url', $listing->url)->first();
                                            if ($diving) {
                                                $listing->diving_id = $diving->id;
                                                $result['id'] = $diving->id;
                                            }
                                            break;

                                        case 'footballs':
                                            $football = Football::where('url', $listing->url)->first();
                                            if ($football) {
                                                $listing->football_id = $football->id;
                                                $result['id'] = $football->id;
                                            }
                                            break;

                                        case 'golfs':
                                            $golf = Golf::where('url', $listing->url)->first();
                                            if ($golf) {
                                                $listing->golf_id = $golf->id;
                                                $result['id'] = $golf->id;
                                            }
                                            break;

                                        case 'huntings':
                                            $hunting = Hunting::where('url', $listing->url)->first();
                                            if ($hunting) {
                                                $listing->hunting_id = $hunting->id;
                                                $result['id'] = $hunting->id;
                                            }
                                            break;

                                        case 'musculations':
                                            $musculation = Musculation::where('url', $listing->url)->first();
                                            if ($musculation) {
                                                $listing->musculation_id = $musculation->id;
                                                $result['id'] = $musculation->id;
                                            }
                                            break;

                                        case 'surfs':
                                            $surf = Surf::where('url', $listing->url)->first();
                                            if ($surf) {
                                                $listing->surf_id = $surf->id;
                                                $result['id'] = $surf->id;
                                            }
                                            break;

                                        case 'tennis':
                                            $tennis = Tennis::where('url', $listing->url)->first();
                                            if ($tennis) {
                                                $listing->tennis_id = $tennis->id;
                                                $result['id'] = $tennis->id;
                                            }
                                            break;

                                        case 'audios':
                                            $audio = Audio::where('url', $listing->url)->first();
                                            if ($audio) {
                                                $listing->audio_id = $audio->id;
                                                $result['id'] = $audio->id;
                                            }
                                            break;

                                        case 'cameras':
                                            $camera = Camera::where('url', $listing->url)->first();
                                            if ($camera) {
                                                $listing->camera_id = $camera->id;
                                                $result['id'] = $camera->id;
                                            }
                                            break;

                                        case 'chargers':
                                            $charger = Charger::where('url', $listing->url)->first();
                                            if ($charger) {
                                                $listing->charger_id = $charger->id;
                                                $result['id'] = $charger->id;
                                            }
                                            break;

                                        case 'drones':
                                            $drone = Drone::where('url', $listing->url)->first();
                                            if ($drone) {
                                                $listing->drone_id = $drone->id;
                                                $result['id'] = $drone->id;
                                            }
                                            break;

                                        case 'gamings':
                                            $gaming = Gaming::where('url', $listing->url)->first();
                                            if ($gaming) {
                                                $listing->gaming_id = $gaming->id;
                                                $result['id'] = $gaming->id;
                                            }
                                            break;

                                        case 'laptops':
                                            $laptop = Laptop::where('url', $listing->url)->first();
                                            if ($laptop) {
                                                $listing->laptop_id = $laptop->id;
                                                $result['id'] = $laptop->id;
                                            }
                                            break;

                                        case 'lightings':
                                            $lighting = Lighting::where('url', $listing->url)->first();
                                            if ($lighting) {
                                                $listing->lighting_id = $lighting->id;
                                                $result['id'] = $lighting->id;
                                            }
                                            break;

                                        case 'printers':
                                            $printer = Printer::where('url', $listing->url)->first();
                                            if ($printer) {
                                                $listing->printer_id = $printer->id;
                                                $result['id'] = $printer->id;
                                            }
                                            break;

                                        case 'routers':
                                            $router = Router::where('url', $listing->url)->first();
                                            if ($router) {
                                                $listing->router_id = $router->id;
                                                $result['id'] = $router->id;
                                            }
                                            break;

                                        case 'tablettes':
                                            $tablette = Tablette::where('url', $listing->url)->first();
                                            if ($tablette) {
                                                $listing->tablette_id = $tablette->id;
                                                $result['id'] = $tablette->id;
                                            }
                                            break;

                                        case 'eclairages':
                                            $eclairage = Eclairage::where('url', $listing->url)->first();
                                            if ($eclairage) {
                                                $listing->eclairage_id = $eclairage->id;
                                                $result['id'] = $eclairage->id;
                                            }
                                            break;

                                        case 'mobiliers':
                                            $mobilier = Mobilier::where('url', $listing->url)->first();
                                            if ($mobilier) {
                                                $listing->mobilier_id = $mobilier->id;
                                                $result['id'] = $mobilier->id;
                                            }
                                            break;

                                        case 'photographies':
                                            $photographie = Photographie::where('url', $listing->url)->first();
                                            if ($photographie) {
                                                $listing->photographie_id = $photographie->id;
                                                $result['id'] = $photographie->id;
                                            }
                                            break;

                                        case 'sonorisations':
                                            $sonorisation = Sonorisation::where('url', $listing->url)->first();
                                            if ($sonorisation) {
                                                $listing->sonorisation_id = $sonorisation->id;
                                                $result['id'] = $sonorisation->id;
                                            }
                                            break;

                                        case 'tentes':
                                            $tente = Tente::where('url', $listing->url)->first();
                                            if ($tente) {
                                                $listing->tente_id = $tente->id;
                                                $result['id'] = $tente->id;
                                            }
                                            break;

                                        case 'clothes':
                                            $clothes = Clothes::where('url', $listing->url)->first();
                                            if ($clothes) {
                                                $listing->clothes_id = $clothes->id;
                                                $result['id'] = $clothes->id;
                                            }
                                            break;

                                        case 'jewelrys':
                                            $jewelry = Jewelry::where('url', $listing->url)->first();
                                            if ($jewelry) {
                                                $listing->jewelry_id = $jewelry->id;
                                                $result['id'] = $jewelry->id;
                                            }
                                            break;

                                        case 'apartments':
                                            $apartment = Apartment::where('url', $listing->url)->first();
                                            if ($apartment) {
                                                $listing->apartment_id = $apartment->id;
                                                $result['id'] = $apartment->id;
                                            }
                                            break;

                                        case 'bureauxs':
                                            $bureaux = Bureaux::where('url', $listing->url)->first();
                                            if ($bureaux) {
                                                $listing->bureaux_id = $bureaux->id;
                                                $result['id'] = $bureaux->id;
                                            }
                                            break;

                                        case 'magasins':
                                            $magasin = Magasin::where('url', $listing->url)->first();
                                            if ($magasin) {
                                                $listing->magasin_id = $magasin->id;
                                                $result['id'] = $magasin->id;
                                            }
                                            break;

                                        case 'maisons':
                                            $maison = Maison::where('url', $listing->url)->first();
                                            if ($maison) {
                                                $listing->maison_id = $maison->id;
                                                $result['id'] = $maison->id;
                                            }
                                            break;

                                        case 'riads':
                                            $riad = Riad::where('url', $listing->url)->first();
                                            if ($riad) {
                                                $listing->riad_id = $riad->id;
                                                $result['id'] = $riad->id;
                                            }
                                            break;

                                        case 'terrains':
                                            $terrain = Terrain::where('url', $listing->url)->first();
                                            if ($terrain) {
                                                $listing->terrain_id = $terrain->id;
                                                $result['id'] = $terrain->id;
                                            }
                                            break;

                                        case 'villas':
                                            $villa = Villa::where('url', $listing->url)->first();
                                            if ($villa) {
                                                $listing->villa_id = $villa->id;
                                                $result['id'] = $villa->id;
                                            }
                                            break;

                                        case 'activities':
                                            $activity = Activity::where('url', $listing->url)->first();
                                            if ($activity) {
                                                $listing->activity_id = $activity->id;
                                                $result['id'] = $activity->id;
                                            }
                                            break;

                                        case 'livres':
                                            $livre = Livre::where('url', $listing->url)->first();
                                            if ($livre) {
                                                $listing->livre_id = $livre->id;
                                                $result['id'] = $livre->id;
                                            }
                                            break;

                                        case 'musicals':
                                            $musical = Musical::where('url', $listing->url)->first();
                                            if ($musical) {
                                                $listing->musical_id = $musical->id;
                                                $result['id'] = $musical->id;
                                            }
                                            break;

                                        case 'furnitures':
                                            $furniture = Furniture::where('url', $listing->url)->first();
                                            if ($furniture) {
                                                $listing->furniture_id = $furniture->id;
                                                $result['id'] = $furniture->id;
                                            }
                                            break;

                                        case 'houseappliances':
                                            $houseappliance = Houseappliance::where('url', $listing->url)->first();
                                            if ($houseappliance) {
                                                $listing->houseappliance_id = $houseappliance->id;
                                                $result['id'] = $houseappliance->id;
                                            }
                                            break;

                                        case 'electricaltools':
                                            $electricaltool = Electricaltool::where('url', $listing->url)->first();
                                            if ($electricaltool) {
                                                $listing->electricaltool_id = $electricaltool->id;
                                                $result['id'] = $electricaltool->id;
                                            }
                                            break;

                                        case 'ladders':
                                            $ladder = Ladder::where('url', $listing->url)->first();
                                            if ($ladder) {
                                                $listing->ladder_id = $ladder->id;
                                                $result['id'] = $ladder->id;
                                            }
                                            break;

                                        case 'mechanicaltools':
                                            $mechanicaltool = Mechanicaltool::where('url', $listing->url)->first();
                                            if ($mechanicaltool) {
                                                $listing->mechanicaltool_id = $mechanicaltool->id;
                                                $result['id'] = $mechanicaltool->id;
                                            }
                                            break;

                                        case 'powertools':
                                            $powertool = Powertool::where('url', $listing->url)->first();
                                            if ($powertool) {
                                                $listing->powertool_id = $powertool->id;
                                                $result['id'] = $powertool->id;
                                            }
                                            break;

                                        case 'pressurewashers':
                                            $pressurewasher = Pressurewasher::where('url', $listing->url)->first();
                                            if ($pressurewasher) {
                                                $listing->pressurewasher_id = $pressurewasher->id;
                                                $result['id'] = $pressurewasher->id;
                                            }
                                            break;

                                        case 'services':
                                            $service = Service::where('url', $listing->url)->first();
                                            if ($service) {
                                                $listing->service_id = $service->id;
                                                $result['id'] = $service->id;
                                            }
                                            break;

                                        case 'boats':
                                            $boat = Boat::where('url', $listing->url)->first();
                                            if ($boat) {
                                                $listing->boat_id = $boat->id;
                                                $result['id'] = $boat->id;
                                            }
                                            break;

                                        case 'camions':
                                            $camion = Camion::where('url', $listing->url)->first();
                                            if ($camion) {
                                                $listing->camion_id = $camion->id;
                                                $result['id'] = $camion->id;
                                            }
                                            break;

                                        case 'caravans':
                                            $caravan = Caravan::where('url', $listing->url)->first();
                                            if ($caravan) {
                                                $listing->caravan_id = $caravan->id;
                                                $result['id'] = $caravan->id;
                                            }
                                            break;

                                        case 'cars':
                                            $car = Car::where('url', $listing->url)->first();
                                            if ($car) {
                                                $listing->car_id = $car->id;
                                                $result['id'] = $car->id;
                                            }
                                            break;

                                        case 'engins':
                                            $engin = Engin::where('url', $listing->url)->first();
                                            if ($engin) {
                                                $listing->engin_id = $engin->id;
                                                $result['id'] = $engin->id;
                                            }
                                            break;

                                        case 'motos':
                                            $moto = Moto::where('url', $listing->url)->first();
                                            if ($moto) {
                                                $listing->moto_id = $moto->id;
                                                $result['id'] = $moto->id;
                                            }
                                            break;

                                        case 'scooters':
                                            $scooter = Scooter::where('url', $listing->url)->first();
                                            if ($scooter) {
                                                $listing->scooter_id = $scooter->id;
                                                $result['id'] = $scooter->id;
                                            }
                                            break;

                                        case 'taxiaeroports':
                                            $taxiaeroport = Taxiaeroport::where('url', $listing->url)->first();
                                            if ($taxiaeroport) {
                                                $listing->taxiaeroport_id = $taxiaeroport->id;
                                                $result['id'] = $taxiaeroport->id;
                                            }
                                            break;

                                        case 'transportations':
                                            $transportation = Transportation::where('url', $listing->url)->first();
                                            if ($transportation) {
                                                $listing->transportation_id = $transportation->id;
                                                $result['id'] = $transportation->id;
                                            }
                                            break;

                                        case 'velos':
                                            $velo = Velo::where('url', $listing->url)->first();
                                            if ($velo) {
                                                $listing->velo_id = $velo->id;
                                                $result['id'] = $velo->id;
                                            }
                                            break;

                                        default:
                                            $result['id'] = null; // Return null if no match
                                    }

                                    return $result; // Return the result containing id only
                                };

                                $idResult = $getIdOnly($listing);

                            return [

                                'type' => 'listings',

                                'id' => $listing->id, // Ensure id is included

                                'attributes' => [
                                    'category' => $listing->category,
                                    'title' => $listing->title,
                                    'price' => $listing->price,
                                    'url' => $listing->url,

                                    'created_at' => $listing->created_at,
                                    //'listing_city' => $listing->city,

                                    'id' => $idResult['id'],

                                    'images' => $images,

                                    'status' => $listing->status,
                                    'picture' => $listing->picture,
                                    'user_id' => $listing->user_id,

                                    'averageRating' => $averageRating,
                                    'totalReviews' => $totalReviews,
                                ],


                            ];
                        }),





                        'total_reviews' => $totalReviews,
                        'average_rating' => round($averageRating, 1), // Rounded to one decimal place



                    ],

            ];



            // Build the response data
            $responseData = [
                'data' => $listingsData,
            ];

            // Conditionally add 'favorites' if the user is authenticated
            if (isset($favoriteCategories)) {
                $responseData['favorites'] = $favoriteCategories;
            }

            if (isset($favoriteIdstore)) {
                $responseData['favoritestore'] = $favoriteIdstore;
            }

            // Return the JSON response
            return response()->json($responseData);


    }
}
