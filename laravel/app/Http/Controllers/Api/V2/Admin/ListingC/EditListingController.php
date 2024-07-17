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


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;



use App\Models\Listing;



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







class EditListingController extends Controller
{



    protected $listing;
    protected $category;
    protected $listingcategory;





    public function getListing(Request $request, $id)
    {
        $this->listing = Listing::where('id', $id)->first();
        $this->category = strtolower($this->listing->category);
        $url = $this->listing->url;




        switch ($this->category) {



            case 'billiards':


                $this->listingcategory = Billiard::where('url', $url)->first();

                return response()->json([
                    'data' => [
                        'type' => $this->category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'title' => $this->listingcategory->title,
                            'price' => $this->listingcategory->price,
                            'description' => $this->listingcategory->description,
                            'startdate' => $this->listingcategory->startdate,
                            'enddate' => $this->listingcategory->enddate,
                            'address' => $this->listingcategory->address,
                            'city' => $this->listingcategory->city,
                            'country' => $this->listingcategory->country,
                            'zip' => $this->listingcategory->zip,
                            'category' => $this->category,
                            'billiards' => [
                                'tableDetails' => $this->listingcategory->table_brand,
                                'condition' => $this->listingcategory->condition,
                                'ballsDesign' => explode(', ', $this->listingcategory->balls_design),
                                'bridgeAndStick' => explode(', ', $this->listingcategory->bridge_stick),
                                'chalk' => explode(', ', $this->listingcategory->chalk),
                                'otherInformation' => explode(', ', $this->listingcategory->scoreboards),
                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                            ],
                            'images' => Billiardsimg::where('billiard_id', $this->listingcategory->id)->get()->map(function ($image) {
                                return $image->picture;
                            }),
                        ],
                    ],
                ]);


                break;





            case 'boxings':



                $this->listingcategory = Boxing::where('url', $url)->first();

                return response()->json([
                    'data' => [
                        'type' => $this->category,
                        'id' => $this->listingcategory->id,
                        'attributes' => [
                            'title' => $this->listingcategory->title,
                            'price' => $this->listingcategory->price,
                            'description' => $this->listingcategory->description,
                            'startdate' => $this->listingcategory->startdate,
                            'enddate' => $this->listingcategory->enddate,
                            'address' => $this->listingcategory->address,
                            'city' => $this->listingcategory->city,
                            'country' => $this->listingcategory->country,
                            'zip' => $this->listingcategory->zip,
                            'category' => $this->category,
                            'boxings' => [
                                'brand' => $this->listingcategory->brand_name,
                                'ringDimensions' => $this->listingcategory->ring_dimensions,
                                'padding' => $this->listingcategory->padding_thickness,
                                'clothing' => explode(', ', $this->listingcategory->boxing_clothing),
                                'otherEquipment' => explode(', ', $this->listingcategory->other_equipment),
                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                            ],
                            'images' => Boxingsimg::where('boxing_id', $this->listingcategory->id)->get()->map(function ($image) {
                                return $image->picture;
                            }),
                        ],
                    ],
                ]);


                break;






            case 'divings':



                    $this->listingcategory = Diving::where('url', $url)->first();

                    return response()->json([
                        'data' => [
                            'type' => $this->category,
                            'id' => $this->listingcategory->id,
                            'attributes' => [
                                'title' => $this->listingcategory->title,
                                'price' => $this->listingcategory->price,
                                'description' => $this->listingcategory->description,
                                'startdate' => $this->listingcategory->startdate,
                                'enddate' => $this->listingcategory->enddate,
                                'address' => $this->listingcategory->address,
                                'city' => $this->listingcategory->city,
                                'country' => $this->listingcategory->country,
                                'zip' => $this->listingcategory->zip,
                                'category' => $this->category,
                                'images' => Divingsimg::where('diving_id', $this->listingcategory->id)->get()->map(function ($image) {
                                    return $image->picture;
                                }),
                            ],
                        ],
                    ]);





                break;







            case 'footballs':



                                $this->listingcategory = Football::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Footballsimg::where('football_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'golfs':


                                $this->listingcategory = Golf::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Golfsimg::where('golf_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'huntings':


                                $this->listingcategory = Hunting::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Huntingsimg::where('hunting_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'musculations':



                                $this->listingcategory = Musculation::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Musculationsimg::where('musculation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'surfs':



                                $this->listingcategory = Surf::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Surfsimg::where('surf_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;







            case 'tennis':



                                $this->listingcategory = Tennis::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Tennisimg::where('tennis_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'audios':



                                $this->listingcategory = Audio::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Audiosimg::where('audio_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'cameras':



                                $this->listingcategory = Camera::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Camerasimg::where('camera_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'chargers':



                                $this->listingcategory = Charger::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Chargersimg::where('charger_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;






            case 'drones':



                                $this->listingcategory = Drone::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Dronesimg::where('drone_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;









            case 'gamings':



                                $this->listingcategory = Gaming::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Gamingsimg::where('gaming_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'laptops':



                                $this->listingcategory = Laptop::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Laptopsimg::where('laptop_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'lightings':



                                $this->listingcategory = Lighting::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Lightingsimg::where('lighting_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'printers':



                                $this->listingcategory = Printer::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Printersimg::where('printer_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'routers':


                                $this->listingcategory = Router::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Routersimg::where('router_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;







            case 'tablettes':



                                $this->listingcategory = Tablette::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Tablettesimg::where('tablette_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;







            case 'eclairages':



                                $this->listingcategory = Eclairage::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Eclairagesimg::where('eclairage_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'mobiliers':



                                $this->listingcategory = Mobilier::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Mobiliersimg::where('mobilier_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'photographies':



                                $this->listingcategory = Photographie::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Photographiesimg::where('photographie_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'sonorisations':



                                $this->listingcategory = Sonorisation::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Sonorisationsimg::where('sonorisation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;







            case 'tentes':



                                $this->listingcategory = Tente::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Tentesimg::where('tente_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'clothes':



                                $this->listingcategory = Clothes::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Clothesimg::where('clothes_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'jewelrys':



                                $this->listingcategory = Jewelry::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Jewelrysimg::where('jewelry_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'apartments':



                                $this->listingcategory = Apartment::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Apartmentsimg::where('apartment_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'bureauxs':



                                $this->listingcategory = Bureaux::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Bureauxsimg::where('bureaux_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;






            case 'magasins':



                                $this->listingcategory = Magasin::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Magasinsimg::where('magasin_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'maisons':



                                $this->listingcategory = Maison::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Maisonsimg::where('maison_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'riads':



                                $this->listingcategory = Riad::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Riadsimg::where('riad_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'terrains':



                                $this->listingcategory = Terrain::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Terrainsimg::where('terrain_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'villas':



                                $this->listingcategory = Villa::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Villasimg::where('villa_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'activities':



                                $this->listingcategory = Activity::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Activitiesimg::where('activity_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'livres':



                                $this->listingcategory = Livre::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Livresimg::where('livre_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'musicals':



                                $this->listingcategory = Musical::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Musicalsimg::where('musical_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'furnitures':



                                $this->listingcategory = Furniture::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Furnituresimg::where('furniture_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'houseappliances':



                                $this->listingcategory = Houseappliance::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Houseappliancesimg::where('houseappliance_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'electricaltools':



                                $this->listingcategory = Electricaltool::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Electricaltoolsimg::where('electricaltool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;






            case 'ladders':



                                $this->listingcategory = Ladder::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Laddersimg::where('ladder_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'mechanicaltools':



                                $this->listingcategory = Mechanicaltool::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Mechanicaltoolsimg::where('mechanicaltool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'powertools':



                                $this->listingcategory = Powertool::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Powertoolsimg::where('powertool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'pressurewashers':



                                $this->listingcategory = Pressurewasher::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Pressurewashersimg::where('pressurewasher_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'services':



                                $this->listingcategory = Service::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Servicesimg::where('service_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'boats':



                                $this->listingcategory = Boat::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Boatsimg::where('boat_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'camions':



                                $this->listingcategory = Camion::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Camionsimg::where('camion_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;





            case 'caravans':



                                $this->listingcategory = Caravan::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Caravansimg::where('caravan_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;





            case 'cars':



                                $this->listingcategory = Car::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Carsimg::where('car_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'engins':




                                $this->listingcategory = Engin::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Enginsimg::where('engin_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;





            case 'motos':



                                $this->listingcategory = Moto::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Motosimg::where('moto_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'scooters':



                                $this->listingcategory = Scooter::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Scootersimg::where('scooter_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'taxiaeroports':




                                $this->listingcategory = Taxiaeroport::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Taxiaeroportsimg::where('taxiaeroport_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'transportations':




                                $this->listingcategory = Transportation::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Transportationsimg::where('transportation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'velos':



                                $this->listingcategory = Velo::where('url', $url)->first();

                                return response()->json([
                                    'data' => [
                                        'type' => $this->category,
                                        'id' => $this->listingcategory->id,
                                        'attributes' => [
                                            'title' => $this->listingcategory->title,
                                            'price' => $this->listingcategory->price,
                                            'description' => $this->listingcategory->description,
                                            'startdate' => $this->listingcategory->startdate,
                                            'enddate' => $this->listingcategory->enddate,
                                            'address' => $this->listingcategory->address,
                                            'city' => $this->listingcategory->city,
                                            'country' => $this->listingcategory->country,
                                            'zip' => $this->listingcategory->zip,
                                            'category' => $this->category,
                                            'images' => Velosimg::where('velo_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            default:
                // Default code
                break;
        }



    }






    public function updateListing(Request $request, $id)
    {


        $data = $request->input('data.attributes');

        $this->listing->update([
            'title' => $data['title'] ?? $this->listing->title,
            'price' => $data['price'] ?? $this->listing->price,
            'status' => $data['status'] ?? $this->listing->status,
            'category' => $data['category'] ?? $this->listing->category,
            'url' => $data['url'] ?? $this->listing->url,
        ]);





        switch ($this->category) {



            case 'billiards':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Billiardsimg::where('billiard_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Billiardsimg::create([
                                        'billiard_id' => $this->billiard->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;





            case 'boxings':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Boxingsimg::where('boxing_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Boxingsimg::create([
                                        'boxing_id' => $this->boxing->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'divings':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Divingsimg::where('diving_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Divingsimg::create([
                                        'diving_id' => $this->diving->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'footballs':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Footballsimg::where('football_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Footballsimg::create([
                                        'football_id' => $this->football->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'golfs':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Golfsimg::where('golf_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Golfsimg::create([
                                        'golf_id' => $this->golf->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;








            case 'huntings':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Huntingsimg::where('hunting_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Huntingsimg::create([
                                        'hunting_id' => $this->hunting->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'musculations':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Musculationsimg::where('musculation_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Musculationsimg::create([
                                        'musculation_id' => $this->musculation->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;








            case 'surfs':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Surfsimg::where('surf_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Surfsimg::create([
                                        'surf_id' => $this->surf->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'tennis':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Tennissimg::where('tennis_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Tennissimg::create([
                                        'tennis_id' => $this->tennis->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'audios':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Audiosimg::where('audio_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Audiosimg::create([
                                        'audio_id' => $this->audio->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'cameras':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Camerasimg::where('camera_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Camerasimg::create([
                                        'camera_id' => $this->camera->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'chargers':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Chargersimg::where('charger_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Chargersimg::create([
                                        'charger_id' => $this->charger->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;






            case 'drones':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Dronesimg::where('drone_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Dronesimg::create([
                                        'drone_id' => $this->drone->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;









            case 'gamings':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Gamingsimg::where('gaming_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Gamingsimg::create([
                                        'gaming_id' => $this->gaming->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'laptops':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Laptopsimg::where('laptop_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Laptopsimg::create([
                                        'laptop_id' => $this->laptop->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;








            case 'lightings':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Lightingsimg::where('lighting_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Lightingsimg::create([
                                        'lighting_id' => $this->lighting->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;








            case 'printers':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Printersimg::where('printer_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Printersimg::create([
                                        'printer_id' => $this->printer->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'routers':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Routersimg::where('router_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Routersimg::create([
                                        'router_id' => $this->router->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;







            case 'tablettes':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Tablettesimg::where('tablette_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Tablettesimg::create([
                                        'tablette_id' => $this->tablette->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;







            case 'eclairages':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Eclairagesimg::where('eclairage_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Eclairagesimg::create([
                                        'eclairage_id' => $this->eclairage->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'mobiliers':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Mobiliersimg::where('mobilier_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Mobiliersimg::create([
                                        'mobilier_id' => $this->mobilier->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'photographies':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Photographiesimg::where('photographie_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Photographiesimg::create([
                                        'photographie_id' => $this->photographie->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'sonorisations':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Sonorisationsimg::where('sonorisation_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Sonorisationsimg::create([
                                        'sonorisation_id' => $this->sonorisation->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;







            case 'tentes':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Tentesimg::where('tente_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Tentesimg::create([
                                        'tente_id' => $this->tente->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'clothes':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Clothessimg::where('clothess_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Clothessimg::create([
                                        'clothess_id' => $this->clothes->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;







            case 'jewelrys':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Jewelrysimg::where('jewelry_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Jewelrysimg::create([
                                        'jewelry_id' => $this->jewelry->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'apartments':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Apartmentsimg::where('apartment_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Apartmentsimg::create([
                                        'apartment_id' => $this->apartment->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'bureauxs':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Bureauxsimg::where('bureaux_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Bureauxsimg::create([
                                        'bureaux_id' => $this->bureaux->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;






            case 'magasins':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Magasinsimg::where('magasin_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Magasinsimg::create([
                                        'magasin_id' => $this->magasin->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'maisons':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Maisonsimg::where('maison_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Maisonsimg::create([
                                        'maison_id' => $this->maison->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'riads':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Riadsimg::where('riad_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Riadsimg::create([
                                        'riad_id' => $this->riad->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;





            case 'terrains':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Terrainsimg::where('terrain_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Terrainsimg::create([
                                        'terrain_id' => $this->terrain->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'villas':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Villasimg::where('villa_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Villasimg::create([
                                        'villa_id' => $this->villa->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'activities':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Activitiesimg::where('activity_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Activitiesimg::create([
                                        'activity_id' => $this->activitie->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'livres':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Livresimg::where('livre_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Livresimg::create([
                                        'livre_id' => $this->livre->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'musicals':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Musicalsimg::where('musical_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Musicalsimg::create([
                                        'musical_id' => $this->musical->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'furnitures':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Furnituresimg::where('furniture_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Furnituresimg::create([
                                        'furniture_id' => $this->furniture->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'houseappliances':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Houseappliancesimg::where('houseappliance_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Houseappliancesimg::create([
                                        'houseappliance_id' => $this->houseappliance->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'electricaltools':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Electricaltoolsimg::where('electricaltool_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Electricaltoolsimg::create([
                                        'electricaltool_id' => $this->electricaltool->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;






            case 'ladders':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Laddersimg::where('ladder_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Laddersimg::create([
                                        'ladder_id' => $this->ladder->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'mechanicaltools':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Mechanicaltoolsimg::where('mechanicaltool_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Mechanicaltoolsimg::create([
                                        'mechanicaltool_id' => $this->mechanicaltool->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;





            case 'powertools':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Powertoolsimg::where('powertool_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Powertoolsimg::create([
                                        'powertool_id' => $this->powertool->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'pressurewashers':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Pressurewashersimg::where('pressurewasher_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Pressurewashersimg::create([
                                        'pressurewasher_id' => $this->pressurewasher->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'services':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Servicesimg::where('service_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Servicesimg::create([
                                        'service_id' => $this->service->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'boats':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Boatsimg::where('boat_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Boatsimg::create([
                                        'boat_id' => $this->boat->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;






            case 'camions':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Camionsimg::where('camion_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Camionsimg::create([
                                        'camion_id' => $this->camion->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;





            case 'caravans':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Caravansimg::where('caravan_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Caravansimg::create([
                                        'caravan_id' => $this->caravan->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }


                break;





            case 'cars':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Carsimg::where('car_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Carsimg::create([
                                        'car_id' => $this->car->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;





            case 'engins':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Enginsimg::where('engin_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Enginsimg::create([
                                        'engin_id' => $this->engin->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }




                break;





            case 'motos':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Motosimg::where('moto_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Motosimg::create([
                                        'moto_id' => $this->moto->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;





            case 'scooters':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Scootersimg::where('scooter_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Scootersimg::create([
                                        'scooter_id' => $this->scooter->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            case 'taxiaeroports':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Taxiaeroportsimg::where('taxiaeroport_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Taxiaeroportsimg::create([
                                        'taxiaeroport_id' => $this->taxiaeroport->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;





            case 'transportations':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Transportationsimg::where('transportation_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Transportationsimg::create([
                                        'transportation_id' => $this->transportation->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;







            case 'velos':

                $this->listingcategory->update([
                                'title' => $data['title'] ?? $this->listingcategory->title,
                                'price' => $data['price'] ?? $this->listingcategory->price,
                                'description' => $data['description'] ?? $this->listingcategory->description,
                                'startdate' => $data['startdate'] ?? $this->listingcategory->startdate,
                                'enddate' => $data['enddate'] ?? $this->listingcategory->enddate,
                                'address' => $data['address'] ?? $this->listingcategory->address,
                                'city' => $data['city'] ?? $this->listingcategory->city,
                                'country' => $data['country'] ?? $this->listingcategory->country,
                                'zip' => $data['zip'] ?? $this->listingcategory->zip,
                            ]);


                            if (isset($data['images'])) {
                                Velosimg::where('velo_id', $this->listingcategory->id)->delete();
                                foreach ($data['images'] as $image) {
                                    Velosimg::create([
                                        'velo_id' => $this->velo->id,
                                        'picture' => $image,
                                    ]);
                                }
                            }



                break;






            default:
                // Default code
                break;
        }








        return response()->json([
            'data' => [
                'type' => $this->category,
                'id' => $this->listing->id,
                'attributes' => [
                    'title' => $this->listing->title,
                    'price' => $this->listing->price,
                    'status' => $this->listing->status,
                    'category' => $this->listing->category,
                    'url' => $this->listing->url,
                ],
            ],
        ]);
    }




}
