<?php

namespace App\Http\Controllers\Api\V2\Admin\DiscountC;

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



use App\Models\Listing;
use App\Models\Collection;

use App\Models\Discount;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;


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








class DiscountController extends JsonApiController
{




    public function index(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $discounts = Discount::where('user_id', $user->id)->get();


        return response()->json([
            'data' => $discounts->map(function ($discount) use ($user) {
                return [
                    'type' => 'discounts',
                    'id' => $discount->id,
                    'attributes' => [
                        'id' => $discount->id,

                        'code' => $discount->code,
                        'percentage' => $discount->discountvalue,
                        'applies' => $discount->applies_to,
                        'type' => $discount->requirements,

                        'status' => $discount->status,



                        'created_at' => $discount->created_at,
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
        $validatedData = $request->validate([
            'data.attributes.code' => 'required|string',
            'data.attributes.discountvalue' => 'required|string',
            'data.attributes.applies_to' => 'nullable|string',
            'data.attributes.requirements' => 'nullable|string',
            'data.attributes.collections_id' => 'nullable|array',
            'data.attributes.collections_id.*' => 'integer|exists:collections,id',
            'data.attributes.listings_id' => 'nullable|array',
            'data.attributes.listings_id.*' => 'integer|exists:listings,id',
            'data.attributes.purchaseamount' => 'nullable|string',
        ]);

        // Create a new discount
        $discount = new Discount();
        $discount->code = $validatedData['data']['attributes']['code'];
        $discount->discountvalue = $validatedData['data']['attributes']['discountvalue'];
        $discount->applies_to = $validatedData['data']['attributes']['applies_to'];
        $discount->requirements = $validatedData['data']['attributes']['requirements'];
        $discount->purchaseamount = $validatedData['data']['attributes']['purchaseamount'];
        $discount->user_id = $user->id;
        $discount->status = 'active';
        $discount->save();


        $discountID = $discount->id;

        // Update the discount_id for each collection if provided
        if (!empty($validatedData['data']['attributes']['collections_id'])) {
            foreach ($validatedData['data']['attributes']['collections_id'] as $collectionId) {
                $collection = Collection::find($collectionId);

                    $collection->discount_id = $discountID;
                    $collection->save();

                    $listings = $collection->listing;



                    foreach ($listings as $listing) {

                        $listing = Listing::find($listingId);

                        $listing->discount_id = $discountID;
                        $listing->save();


                        $url = $listing->url;


                        switch ($listing->category) {
                            case 'billiards':
                                $billiard = Billiard::where('url', $url)->first();
                                $billiard->discount_id = $discountID;
                                $billiard->save();
                                break;

                            case 'apartments':
                                $apartment = Apartment::where('url', $url)->first();
                                $apartment->discount_id = $discountID;
                                $apartment->save();
                                break;

                            case 'activities':
                                $activity = Activity::where('url', $url)->first();
                                $activity->discount_id = $discountID;
                                $activity->save();
                                break;

                            case 'audios':
                                $audio = Audio::where('url', $url)->first();
                                $audio->discount_id = $discountID;
                                $audio->save();
                                break;

                            case 'boats':
                                $boat = Boat::where('url', $url)->first();
                                $boat->discount_id = $discountID;
                                $boat->save();
                                break;

                            case 'boxings':
                                $boxing = Boxing::where('url', $url)->first();
                                $boxing->discount_id = $discountID;
                                $boxing->save();
                                break;

                            case 'bureauxs':
                                $bureaux = Bureaux::where('url', $url)->first();
                                $bureaux->discount_id = $discountID;
                                $bureaux->save();
                                break;

                            case 'cameras':
                                $camera = Camera::where('url', $url)->first();
                                $camera->discount_id = $discountID;
                                $camera->save();
                                break;

                            case 'camions':
                                $camion = Camion::where('url', $url)->first();
                                $camion->discount_id = $discountID;
                                $camion->save();
                                break;

                            case 'caravans':
                                $caravan = Caravan::where('url', $url)->first();
                                $caravan->discount_id = $discountID;
                                $caravan->save();
                                break;

                            case 'cars':
                                $car = Car::where('url', $url)->first();
                                $car->discount_id = $discountID;
                                $car->save();
                                break;

                            case 'chargers':
                                $charger = Charger::where('url', $url)->first();
                                $charger->discount_id = $discountID;
                                $charger->save();
                                break;

                            case 'clothes':
                                $clothes = Clothes::where('url', $url)->first();
                                $clothes->discount_id = $discountID;
                                $clothes->save();
                                break;

                            case 'divings':
                                $diving = Diving::where('url', $url)->first();
                                $diving->discount_id = $discountID;
                                $diving->save();
                                break;

                            case 'drones':
                                $drone = Drone::where('url', $url)->first();
                                $drone->discount_id = $discountID;
                                $drone->save();
                                break;

                            case 'eclairages':
                                $eclairage = Eclairage::where('url', $url)->first();
                                $eclairage->discount_id = $discountID;
                                $eclairage->save();
                                break;

                            case 'electricaltools':
                                $electricalTool = ElectricalTool::where('url', $url)->first();
                                $electricalTool->discount_id = $discountID;
                                $electricalTool->save();
                                break;

                            case 'engins':
                                $engin = Engin::where('url', $url)->first();
                                $engin->discount_id = $discountID;
                                $engin->save();
                                break;

                            case 'footballs':
                                $football = Football::where('url', $url)->first();
                                $football->discount_id = $discountID;
                                $football->save();
                                break;

                            case 'furnitures':
                                $furniture = Furniture::where('url', $url)->first();
                                $furniture->discount_id = $discountID;
                                $furniture->save();
                                break;

                            case 'gamings':
                                $gaming = Gaming::where('url', $url)->first();
                                $gaming->discount_id = $discountID;
                                $gaming->save();
                                break;

                            case 'golfs':
                                $golf = Golf::where('url', $url)->first();
                                $golf->discount_id = $discountID;
                                $golf->save();
                                break;

                            case 'houseappliances':
                                $houseAppliance = HouseAppliance::where('url', $url)->first();
                                $houseAppliance->discount_id = $discountID;
                                $houseAppliance->save();
                                break;

                            case 'huntings':
                                $hunting = Hunting::where('url', $url)->first();
                                $hunting->discount_id = $discountID;
                                $hunting->save();
                                break;

                            case 'jewelrys':
                                $jewelry = Jewelry::where('url', $url)->first();
                                $jewelry->discount_id = $discountID;
                                $jewelry->save();
                                break;

                            case 'ladders':
                                $ladder = Ladder::where('url', $url)->first();
                                $ladder->discount_id = $discountID;
                                $ladder->save();
                                break;

                            case 'laptops':
                                $laptop = Laptop::where('url', $url)->first();
                                $laptop->discount_id = $discountID;
                                $laptop->save();
                                break;

                            case 'lightings':
                                $lighting = Lighting::where('url', $url)->first();
                                $lighting->discount_id = $discountID;
                                $lighting->save();
                                break;

                            case 'livres':
                                $livre = Livre::where('url', $url)->first();
                                $livre->discount_id = $discountID;
                                $livre->save();
                                break;

                            case 'magasins':
                                $magasin = Magasin::where('url', $url)->first();
                                $magasin->discount_id = $discountID;
                                $magasin->save();
                                break;

                            case 'maisons':
                                $maison = Maison::where('url', $url)->first();
                                $maison->discount_id = $discountID;
                                $maison->save();
                                break;

                            case 'mechanicaltools':
                                $mechanicalTool = MechanicalTool::where('url', $url)->first();
                                $mechanicalTool->discount_id = $discountID;
                                $mechanicalTool->save();
                                break;

                            case 'mobiliers':
                                $mobilier = Mobilier::where('url', $url)->first();
                                $mobilier->discount_id = $discountID;
                                $mobilier->save();
                                break;

                            case 'motos':
                                $moto = Moto::where('url', $url)->first();
                                $moto->discount_id = $discountID;
                                $moto->save();
                                break;

                            case 'musculations':
                                $musculation = Musculation::where('url', $url)->first();
                                $musculation->discount_id = $discountID;
                                $musculation->save();
                                break;

                            case 'musicals':
                                $musical = Musical::where('url', $url)->first();
                                $musical->discount_id = $discountID;
                                $musical->save();
                                break;

                            case 'photographies':
                                $photographie = Photographie::where('url', $url)->first();
                                $photographie->discount_id = $discountID;
                                $photographie->save();
                                break;

                            case 'powertools':
                                $powertool = Powertool::where('url', $url)->first();
                                $powertool->discount_id = $discountID;
                                $powertool->save();
                                break;

                            case 'pressurewashers':
                                $pressureWasher = PressureWasher::where('url', $url)->first();
                                $pressureWasher->discount_id = $discountID;
                                $pressureWasher->save();
                                break;

                            case 'printers':
                                $printer = Printer::where('url', $url)->first();
                                $printer->discount_id = $discountID;
                                $printer->save();
                                break;

                            case 'riads':
                                $riad = Riad::where('url', $url)->first();
                                $riad->discount_id = $discountID;
                                $riad->save();
                                break;

                            case 'routers':
                                $router = Router::where('url', $url)->first();
                                $router->discount_id = $discountID;
                                $router->save();
                                break;

                            case 'scooters':
                                $scooter = Scooter::where('url', $url)->first();
                                $scooter->discount_id = $discountID;
                                $scooter->save();
                                break;

                            case 'services':
                                $service = Service::where('url', $url)->first();
                                $service->discount_id = $discountID;
                                $service->save();
                                break;

                            case 'sonorisations':
                                $sonorisation = Sonorisation::where('url', $url)->first();
                                $sonorisation->discount_id = $discountID;
                                $sonorisation->save();
                                break;

                            case 'surfs':
                                $surf = Surf::where('url', $url)->first();
                                $surf->discount_id = $discountID;
                                $surf->save();
                                break;

                            case 'tablettes':
                                $tablette = Tablette::where('url', $url)->first();
                                $tablette->discount_id = $discountID;
                                $tablette->save();
                                break;

                            case 'taxiaeroports':
                                $taxiAeroport = TaxiAeroport::where('url', $url)->first();
                                $taxiAeroport->discount_id = $discountID;
                                $taxiAeroport->save();
                                break;

                            case 'tennis':
                                $tennis = Tennis::where('url', $url)->first();
                                $tennis->discount_id = $discountID;
                                $tennis->save();
                                break;

                            case 'tentes':
                                $tente = Tente::where('url', $url)->first();
                                $tente->discount_id = $discountID;
                                $tente->save();
                                break;

                            case 'terrains':
                                $terrain = Terrain::where('url', $url)->first();
                                $terrain->discount_id = $discountID;
                                $terrain->save();
                                break;

                            case 'transportations':
                                $transportation = Transportation::where('url', $url)->first();
                                $transportation->discount_id = $discountID;
                                $transportation->save();
                                break;

                            case 'velos':
                                $velo = Velo::where('url', $url)->first();
                                $velo->discount_id = $discountID;
                                $velo->save();
                                break;

                            case 'villas':
                                $villa = Villa::where('url', $url)->first();
                                $villa->discount_id = $discountID;
                                $villa->save();
                                break;

                            default:
                                // Do nothing if category doesn't match any predefined case
                                break;
                        }





                }


            }
        }

        // Update the discount_id for each listing if provided
        if (!empty($validatedData['data']['attributes']['listings_id'])) {
            foreach ($validatedData['data']['attributes']['listings_id'] as $listingId) {

                    $listing = Listing::find($listingId);

                    $listing->discount_id = $discountID;
                    $listing->save();


                    $url = $listing->url;


                    switch ($listing->category) {
                        case 'billiards':
                            $billiard = Billiard::where('url', $url)->first();
                            $billiard->discount_id = $discountID;
                            $billiard->save();
                            break;

                        case 'apartments':
                            $apartment = Apartment::where('url', $url)->first();
                            $apartment->discount_id = $discountID;
                            $apartment->save();
                            break;

                        case 'activities':
                            $activity = Activity::where('url', $url)->first();
                            $activity->discount_id = $discountID;
                            $activity->save();
                            break;

                        case 'audios':
                            $audio = Audio::where('url', $url)->first();
                            $audio->discount_id = $discountID;
                            $audio->save();
                            break;

                        case 'boats':
                            $boat = Boat::where('url', $url)->first();
                            $boat->discount_id = $discountID;
                            $boat->save();
                            break;

                        case 'boxings':
                            $boxing = Boxing::where('url', $url)->first();
                            $boxing->discount_id = $discountID;
                            $boxing->save();
                            break;

                        case 'bureauxs':
                            $bureaux = Bureaux::where('url', $url)->first();
                            $bureaux->discount_id = $discountID;
                            $bureaux->save();
                            break;

                        case 'cameras':
                            $camera = Camera::where('url', $url)->first();
                            $camera->discount_id = $discountID;
                            $camera->save();
                            break;

                        case 'camions':
                            $camion = Camion::where('url', $url)->first();
                            $camion->discount_id = $discountID;
                            $camion->save();
                            break;

                        case 'caravans':
                            $caravan = Caravan::where('url', $url)->first();
                            $caravan->discount_id = $discountID;
                            $caravan->save();
                            break;

                        case 'cars':
                            $car = Car::where('url', $url)->first();
                            $car->discount_id = $discountID;
                            $car->save();
                            break;

                        case 'chargers':
                            $charger = Charger::where('url', $url)->first();
                            $charger->discount_id = $discountID;
                            $charger->save();
                            break;

                        case 'clothes':
                            $clothes = Clothes::where('url', $url)->first();
                            $clothes->discount_id = $discountID;
                            $clothes->save();
                            break;

                        case 'divings':
                            $diving = Diving::where('url', $url)->first();
                            $diving->discount_id = $discountID;
                            $diving->save();
                            break;

                        case 'drones':
                            $drone = Drone::where('url', $url)->first();
                            $drone->discount_id = $discountID;
                            $drone->save();
                            break;

                        case 'eclairages':
                            $eclairage = Eclairage::where('url', $url)->first();
                            $eclairage->discount_id = $discountID;
                            $eclairage->save();
                            break;

                        case 'electricaltools':
                            $electricalTool = ElectricalTool::where('url', $url)->first();
                            $electricalTool->discount_id = $discountID;
                            $electricalTool->save();
                            break;

                        case 'engins':
                            $engin = Engin::where('url', $url)->first();
                            $engin->discount_id = $discountID;
                            $engin->save();
                            break;

                        case 'footballs':
                            $football = Football::where('url', $url)->first();
                            $football->discount_id = $discountID;
                            $football->save();
                            break;

                        case 'furnitures':
                            $furniture = Furniture::where('url', $url)->first();
                            $furniture->discount_id = $discountID;
                            $furniture->save();
                            break;

                        case 'gamings':
                            $gaming = Gaming::where('url', $url)->first();
                            $gaming->discount_id = $discountID;
                            $gaming->save();
                            break;

                        case 'golfs':
                            $golf = Golf::where('url', $url)->first();
                            $golf->discount_id = $discountID;
                            $golf->save();
                            break;

                        case 'houseappliances':
                            $houseAppliance = HouseAppliance::where('url', $url)->first();
                            $houseAppliance->discount_id = $discountID;
                            $houseAppliance->save();
                            break;

                        case 'huntings':
                            $hunting = Hunting::where('url', $url)->first();
                            $hunting->discount_id = $discountID;
                            $hunting->save();
                            break;

                        case 'jewelrys':
                            $jewelry = Jewelry::where('url', $url)->first();
                            $jewelry->discount_id = $discountID;
                            $jewelry->save();
                            break;

                        case 'ladders':
                            $ladder = Ladder::where('url', $url)->first();
                            $ladder->discount_id = $discountID;
                            $ladder->save();
                            break;

                        case 'laptops':
                            $laptop = Laptop::where('url', $url)->first();
                            $laptop->discount_id = $discountID;
                            $laptop->save();
                            break;

                        case 'lightings':
                            $lighting = Lighting::where('url', $url)->first();
                            $lighting->discount_id = $discountID;
                            $lighting->save();
                            break;

                        case 'livres':
                            $livre = Livre::where('url', $url)->first();
                            $livre->discount_id = $discountID;
                            $livre->save();
                            break;

                        case 'magasins':
                            $magasin = Magasin::where('url', $url)->first();
                            $magasin->discount_id = $discountID;
                            $magasin->save();
                            break;

                        case 'maisons':
                            $maison = Maison::where('url', $url)->first();
                            $maison->discount_id = $discountID;
                            $maison->save();
                            break;

                        case 'mechanicaltools':
                            $mechanicalTool = MechanicalTool::where('url', $url)->first();
                            $mechanicalTool->discount_id = $discountID;
                            $mechanicalTool->save();
                            break;

                        case 'mobiliers':
                            $mobilier = Mobilier::where('url', $url)->first();
                            $mobilier->discount_id = $discountID;
                            $mobilier->save();
                            break;

                        case 'motos':
                            $moto = Moto::where('url', $url)->first();
                            $moto->discount_id = $discountID;
                            $moto->save();
                            break;

                        case 'musculations':
                            $musculation = Musculation::where('url', $url)->first();
                            $musculation->discount_id = $discountID;
                            $musculation->save();
                            break;

                        case 'musicals':
                            $musical = Musical::where('url', $url)->first();
                            $musical->discount_id = $discountID;
                            $musical->save();
                            break;

                        case 'photographies':
                            $photographie = Photographie::where('url', $url)->first();
                            $photographie->discount_id = $discountID;
                            $photographie->save();
                            break;

                        case 'powertools':
                            $powertool = Powertool::where('url', $url)->first();
                            $powertool->discount_id = $discountID;
                            $powertool->save();
                            break;

                        case 'pressurewashers':
                            $pressureWasher = PressureWasher::where('url', $url)->first();
                            $pressureWasher->discount_id = $discountID;
                            $pressureWasher->save();
                            break;

                        case 'printers':
                            $printer = Printer::where('url', $url)->first();
                            $printer->discount_id = $discountID;
                            $printer->save();
                            break;

                        case 'riads':
                            $riad = Riad::where('url', $url)->first();
                            $riad->discount_id = $discountID;
                            $riad->save();
                            break;

                        case 'routers':
                            $router = Router::where('url', $url)->first();
                            $router->discount_id = $discountID;
                            $router->save();
                            break;

                        case 'scooters':
                            $scooter = Scooter::where('url', $url)->first();
                            $scooter->discount_id = $discountID;
                            $scooter->save();
                            break;

                        case 'services':
                            $service = Service::where('url', $url)->first();
                            $service->discount_id = $discountID;
                            $service->save();
                            break;

                        case 'sonorisations':
                            $sonorisation = Sonorisation::where('url', $url)->first();
                            $sonorisation->discount_id = $discountID;
                            $sonorisation->save();
                            break;

                        case 'surfs':
                            $surf = Surf::where('url', $url)->first();
                            $surf->discount_id = $discountID;
                            $surf->save();
                            break;

                        case 'tablettes':
                            $tablette = Tablette::where('url', $url)->first();
                            $tablette->discount_id = $discountID;
                            $tablette->save();
                            break;

                        case 'taxiaeroports':
                            $taxiAeroport = TaxiAeroport::where('url', $url)->first();
                            $taxiAeroport->discount_id = $discountID;
                            $taxiAeroport->save();
                            break;

                        case 'tennis':
                            $tennis = Tennis::where('url', $url)->first();
                            $tennis->discount_id = $discountID;
                            $tennis->save();
                            break;

                        case 'tentes':
                            $tente = Tente::where('url', $url)->first();
                            $tente->discount_id = $discountID;
                            $tente->save();
                            break;

                        case 'terrains':
                            $terrain = Terrain::where('url', $url)->first();
                            $terrain->discount_id = $discountID;
                            $terrain->save();
                            break;

                        case 'transportations':
                            $transportation = Transportation::where('url', $url)->first();
                            $transportation->discount_id = $discountID;
                            $transportation->save();
                            break;

                        case 'velos':
                            $velo = Velo::where('url', $url)->first();
                            $velo->discount_id = $discountID;
                            $velo->save();
                            break;

                        case 'villas':
                            $villa = Villa::where('url', $url)->first();
                            $villa->discount_id = $discountID;
                            $villa->save();
                            break;

                        default:
                            // Do nothing if category doesn't match any predefined case
                            break;
                    }





            }
        }


        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'discounts',
                'id' => $discount->id,
                'attributes' => [
                    'code' => $discount->code,
                    'discountvalue' => $discount->discountvalue,
                    'applies_to' => $discount->applies_to,
                    'requirements' => $discount->requirements,
                    'collections_id' => $discount->collection()->pluck('id'),
                    'listings_id' => $discount->listing()->pluck('id'),
                    'purchaseamount' => $discount->purchaseamount,
                    'created_at' => $discount->created_at,
                    'updated_at' => $discount->updated_at,
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
        $user = Auth::user();
        $request = app('request'); // Retrieve the current request

        // Validate the request
        $request->validate([
            'data.attributes.name' => 'required|string',
            'data.attributes.description' => 'required|string',
            'data.attributes.picture' => 'sometimes|image|max:2048', // Validate images if present
        ]);

        $discount = Discount::findOrFail($route->resourceId());



        $discount->name = $request->input('data.attributes.name');
        $discount->description = $request->input('data.attributes.description');
        $discount->save();

        // Return a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'discounts',
                'id' => $discount->id,
                'attributes' => [
                    'name' => $discount->name,
                    'picture' => $discount->picture,
                    'created_at' => $discount->created_at,
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
        ], 200); // 200 OK status code
    }



    public function show(JsonApiRoute $route, Store $store)
    {
        $user = Auth::user();
        $discount = Discount::where('user_id', $user->id)->findOrFail($route->resourceId());

        $listings = $discount->listing()->get();
        $collections = $discount->collection()->get();


        return response()->json([
            'data' => [
                'type' => 'discount',
                'id' => $discount->id,
                'attributes' => [
                    'id' => $discount->id,

                    'code' => $discount->code,
                    'percentage' => $discount->discountvalue,
                    'applies' => $discount->applies_to,
                    'type' => $discount->requirements,

                    'status' => $discount->status,


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

                    'collections' => $collections->map(function ($listing) {

                        return [

                            'id' => $collection->id,

                            'name' => $collection->name,
                            'picture' => $collection->picture,
                            'description' => $collection->description,
                            'created_at' => $collection->created_at,



                        ];

                    }),

                    'created_at' => $discount->created_at,
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






    public function getDiscountData(JsonApiRoute $route, Store $store)
    {

        $user = Auth::user();

        $collections = Collection::where('user_id', $user->id)->get()->map(function ($collection) {
            return [
                'type' => 'collections',
                'id' => $collection->id,
                'attributes' => [
                    'name' => $collection->name,
                    'picture' => $collection->picture,
                    'description' => $collection->description,
                    'created_at' => $collection->created_at,
                    'updated_at' => $collection->updated_at,
                    'user_id' => $collection->user_id,
                ],
            ];
        });

        $listings = Listing::where('user_id', $user->id)->get()->map(function ($listing) {
            return [
                'type' => 'listings',
                'id' => $listing->id,
                'attributes' => [
                    'category' => $listing->category,
                    'picture' => $listing->picture,
                    'title' => $listing->title,
                    'price' => $listing->price,
                    'city' => $listing->city,
                    'zip' => $listing->zip,
                    'url' => $listing->url,
                    'status' => $listing->status,
                    'onlinestore_id' => $listing->onlinestore_id,
                    'created_at' => $listing->created_at,
                    'updated_at' => $listing->updated_at,
                    'user_id' => $listing->user_id,
                ],
            ];
        });

        return response()->json([
            'data' => [
                'collections' => $collections,
                'listings' => $listings,
            ]
        ]);

    }




    public function delete(JsonApiRoute $route, Store $store )
    {



        $request = app('request');


        $id = $route->resourceId();


            $listing = Discount::find($id);

            // Check if listing exists
            if ($listing) {
                $listing->delete(); // Delete the listing
                return response()->json(['message' => 'Listing deleted successfully'], 200);
            }

            // Return error if listing not found
            return response()->json(['message' => 'Listing not found'], 404);

    }


}
