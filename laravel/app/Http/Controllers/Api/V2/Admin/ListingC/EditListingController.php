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


use App\Models\Job  ;
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



            case 'billiard':


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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,




                            'status' => $this->listingcategory->status,

                            'country' => $this->listingcategory->country,
                            'id' => $this->listingcategory->id,
                            'url' => $this->listingcategory->url,
                            'created_at' => $this->listingcategory->created_at,


                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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





            case 'boxing':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                            'country' => $this->listingcategory->country,
                            'id' => $this->listingcategory->id,
                            'url' => $this->listingcategory->url,
                            'created_at' => $this->listingcategory->created_at,

                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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






            case 'diving':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                'country' => $this->listingcategory->country,
                                'id' => $this->listingcategory->id,
                                'url' => $this->listingcategory->url,
                                'created_at' => $this->listingcategory->created_at,

                                'divings' => [
                                    'brandName' => $this->listingcategory->brand_name,
                                    'material' => $this->listingcategory->material,
                                    'otherEquipment' => explode(', ', $this->listingcategory->other_equipment),
                                    'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                ],


                                    'zip' => $this->listingcategory->zip,'listingid' => $id,
                                    'category' => $this->category,


                                    'divings' => [
                                        'brandName' => $this->listingcategory->brand_name,
                                        'material' => $this->listingcategory->material,
                                        'otherEquipment' => explode(', ', $this->listingcategory->other_equipment),
                                        'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                    ],


                                    'images' => Divingsimg::where('diving_id', $this->listingcategory->id)->get()->map(function ($image) {
                                        return $image->picture;
                                    }),
                                ],
                        ],
                    ]);





                break;







            case 'football':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'footballs' => [
                                                'type' => $this->listingcategory->type,
                                                'equipment' => explode(', ', $this->listingcategory->equipment),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Footballsimg::where('football_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'golf':


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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'golfs' => [
                                                'clothing' => explode(', ', $this->listingcategory->clothing),
                                                'golf_cars' => $this->listingcategory->cars,
                                                'otherEquipment' => explode(', ', $this->listingcategory->other_equipment),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Golfsimg::where('golf_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'hunting':


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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'huntings' => [
                                                'bowArrow' => $this->listingcategory->bow_arrow,
                                                'crossbow' => $this->listingcategory->crossbow,
                                                'decoy' => explode(', ', $this->listingcategory->decoy),
                                                'gameCall' => explode(', ', $this->listingcategory->game_call),
                                                'binoculars' => explode(', ', $this->listingcategory->binoculars),
                                                'clothing' => explode(', ', $this->listingcategory->clothing),
                                                'equipment' => explode(', ', $this->listingcategory->equipment),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],

                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Huntingsimg::where('hunting_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'gym':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'musculations' => [
                                                'brand' => explode(', ', $this->listingcategory->brand_name),
                                                'arms' => explode(', ', $this->listingcategory->arms),
                                                'back' => explode(', ', $this->listingcategory->back),
                                                'shoulders' => explode(', ', $this->listingcategory->shoulders),
                                                'glutes' => explode(', ', $this->listingcategory->glutes),
                                                'legs' => explode(', ', $this->listingcategory->legs),
                                                'chest' => explode(', ', $this->listingcategory->chest),
                                                'abs' => explode(', ', $this->listingcategory->abs),
                                                'cardio' => explode(', ', $this->listingcategory->cardio_machines),
                                                'other' => explode(', ', $this->listingcategory->dumbbells),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Musculationsimg::where('musculation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'surf':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'surfs' => [
                                                'surfCategory' => $this->listingcategory->surf_category,
                                                'surfTypes' => $this->listingcategory->board_types,
                                                'surfingSize' => $this->listingcategory->board_size,
                                                'surfWetsuits' => explode(', ', $this->listingcategory->wetsuits),
                                                'surfOther' => explode(', ', $this->listingcategory->surf_other),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'tennis' => [
                                                'tennisTerrain' => $this->listingcategory->terrain_dimensions,
                                                'brandName' => $this->listingcategory->brand,
                                                'clothing' => explode(', ', $this->listingcategory->clothing),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Tennisimg::where('tennis_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'audio':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,

                                            'audios' => [
                                                'audioType' => $this->listingcategory->audio_type,
                                                'soundQuality' => $this->listingcategory->sound_quality,
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'maxWirelessRange' => $this->listingcategory->max_wireless_range,
                                                'batteryLife' => $this->listingcategory->battery_life,
                                                'chargingTime' => $this->listingcategory->charging_time,
                                                'condition' => $this->listingcategory->condition,
                                                'compatibility' => explode(', ', $this->listingcategory->compatibility),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,

                                            'cameras' => [
                                                'photoSize' => $this->listingcategory->photo_size,
                                                'sensorSize' => $this->listingcategory->sensor_size,
                                                'imageStabilization' => $this->listingcategory->image_stabilization,
                                                'shutterSpeed' => $this->listingcategory->shutter_speed,
                                                'exposureControl' => $this->listingcategory->exposure_control,
                                                'imageResolution' => $this->listingcategory->image_resolution,
                                                'condition' => $this->listingcategory->condition,
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'memory' => $this->listingcategory->memory,
                                                'lens' => $this->listingcategory->lens,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'chargers' => [
                                                'compatibility' => explode(', ', $this->listingcategory->compatibility),
                                                'numberOfPorts' => $this->listingcategory->number_of_ports,
                                                'length' => $this->listingcategory->length,
                                                'inputVoltage' => $this->listingcategory->input_voltage,
                                                'wattage' => $this->listingcategory->wattage,
                                                'condition' => $this->listingcategory->condition,
                                                'connectorType' => $this->listingcategory->connector_type,
                                                'amperage' => $this->listingcategory->amperage,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'drones' => [
                                                'flightTime' => $this->listingcategory->flight_time,
                                                'batteryLife' => $this->listingcategory->battery_life,
                                                'condition' => $this->listingcategory->condition,
                                                'videoResolution' => $this->listingcategory->video_resolution,
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'batteryCapacity' => $this->listingcategory->battery_capacity,
                                                'memory' => $this->listingcategory->memory,
                                                'imageResolution' => $this->listingcategory->image_resolution,
                                                'includedComponents' => explode(', ', $this->listingcategory->included_components),
                                                'remoteControl' => $this->listingcategory->remote_control,
                                                'maxDistance' => $this->listingcategory->max_distance,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Dronesimg::where('drone_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;









            case 'gaming':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'gamings' => [
                                                'storage' => $this->listingcategory->storage,
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'ports' => explode(', ', $this->listingcategory->ports),
                                                'onlineServices' => $this->listingcategory->online_services,
                                                'condition' => $this->listingcategory->condition,
                                                'games' => explode(', ', $this->listingcategory->games),
                                                'controller' => explode(', ', $this->listingcategory->controllers),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'laptops' => [
                                                'ram' => $this->listingcategory->ram,
                                                'graphicsCard' => $this->listingcategory->graphics_card,
                                                'operatingSystem' => $this->listingcategory->operating_system,
                                                'numberPorts' => explode(', ', $this->listingcategory->number_ports),
                                                'batteryLife' => $this->listingcategory->battery_life,
                                                'storage' => $this->listingcategory->drive_storage,
                                                'resolution' => $this->listingcategory->resolution,
                                                'weight' => $this->listingcategory->weight,
                                                'screenSize' => $this->listingcategory->screen_size,
                                                'cpu' => $this->listingcategory->cpu,
                                                'condition' => $this->listingcategory->condition,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Laptopsimg::where('laptop_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;








            case 'lighting':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'lightings' => [
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'includedAccessories' => explode(', ', $this->listingcategory->included_accessories),
                                                'condition' => $this->listingcategory->condition,
                                                'colorTemperature' => explode(', ', $this->listingcategory->color_temperature),
                                                'compatibility' => explode(', ', $this->listingcategory->compatibility),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'printers' => [
                                                'printSpeed' => $this->listingcategory->print_speed,
                                                'printResolution' => explode(', ', $this->listingcategory->print_resolution),
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'paperSize' => explode(', ', $this->listingcategory->paper_size),
                                                'compatibleInk' => explode(', ', $this->listingcategory->compatible),
                                                'condition' => $this->listingcategory->condition,
                                                'inputSheets' => $this->listingcategory->input_sheets,
                                                'printMedia' => explode(', ', $this->listingcategory->print_media),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,

                                            'routers' => [
                                                'gbpsSpeed' => $this->listingcategory->gbps_speed,
                                                'wireless' => $this->listingcategory->wireless,
                                                'frequency' => $this->listingcategory->frequency,
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'antennas' => $this->listingcategory->antennas,
                                                'condition' => $this->listingcategory->condition,
                                                'compatible' => explode(', ', $this->listingcategory->compatible),
                                                'signalCoverage' => $this->listingcategory->signal_coverage,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Routersimg::where('router_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;







            case 'tablets':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'tablettes' => [
                                                'operatingSystem' => $this->listingcategory->operating_system,
                                                'ram' => $this->listingcategory->ram,
                                                'storage' => $this->listingcategory->storage,
                                                'displaySize' => $this->listingcategory->display_size,
                                                'displayResolution' => $this->listingcategory->display_resolution,
                                                'connectivity' => explode(', ', $this->listingcategory->connectivity),
                                                'condition' => $this->listingcategory->condition,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Tablettesimg::where('tablette_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;







            case 'eclairage':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'eclairages' => [
                                                'brandName' => $this->listingcategory->brand_name,
                                                'size' => $this->listingcategory->size,
                                                'voltage' => $this->listingcategory->voltage,
                                                'chandeliers' => explode(', ', $this->listingcategory->chandeliers),
                                                'lamps' => explode(', ', $this->listingcategory->lamps),
                                                'light' => explode(', ', $this->listingcategory->light_fixtures),
                                                'projectors' => explode(', ', $this->listingcategory->projectors),
                                                'led' => explode(', ', $this->listingcategory->leds),
                                                'power' => $this->listingcategory->power_source,
                                                'lightSourceType' => $this->listingcategory->light_source,
                                                'lightColor' => explode(', ', $this->listingcategory->light_color),
                                                'lightingMethod' => explode(', ', $this->listingcategory->lighting_method),
                                                'controller' => $this->listingcategory->controller,
                                                'other' => explode(', ', $this->listingcategory->other),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Eclairagesimg::where('eclairage_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'mobilier':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'mobiliers' => [
                                                'material' => explode(', ', $this->listingcategory->material),
                                                'theme' => $this->listingcategory->theme,
                                                'plantDecorations' => explode(', ', $this->listingcategory->plant_decorations),
                                                'lightDecorations' => explode(', ', $this->listingcategory->light_decorations),
                                                'festiveDecorations' => $this->listingcategory->festive_decorations,
                                                'otherEquipment' => explode(', ', $this->listingcategory->others),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Mobiliersimg::where('mobilier_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'photography':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'photographies' => [
                                                'size' => $this->listingcategory->size,
                                                'battery' => $this->listingcategory->battery,
                                                'brand' => $this->listingcategory->brand_name,
                                                'camera' => explode(', ', $this->listingcategory->camera),
                                                'sensor' => explode(', ', $this->listingcategory->sensor),
                                                'wideAngle' => explode(', ', $this->listingcategory->angle),
                                                'lcd' => explode(', ', $this->listingcategory->lcd),
                                                'otherEquipment' => explode(', ', $this->listingcategory->other_equipment),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Photographiesimg::where('photographie_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'sound-systems':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'sonorisations' => [
                                                'brand' => $this->listingcategory->brand_name,
                                                'size' => $this->listingcategory->size,
                                                'connectivityTechnology' => $this->listingcategory->connectivity,
                                                'fastenerType' => $this->listingcategory->fastener_type,
                                                'powerSource' => $this->listingcategory->power_source,
                                                'outputPower' => $this->listingcategory->output_power,
                                                'numberOfChannels' => $this->listingcategory->number_of_channels,
                                                'deviceCompatibility' => $this->listingcategory->compatibility,
                                                'powerInWatts' => $this->listingcategory->power_watts,
                                                'powerType' => explode(', ', $this->listingcategory->power_type),
                                                'battery' => explode(', ', $this->listingcategory->battery),
                                                'weight' => $this->listingcategory->weight,
                                                'microphone' => explode(', ', $this->listingcategory->microphone),
                                                'mixageTable' => $this->listingcategory->mixage_table,
                                                'amplifier' => $this->listingcategory->amplifier,
                                                'cablesAndConnectors' => explode(', ', $this->listingcategory->cables_connectors),
                                                'speaker' => explode(', ', $this->listingcategory->speaker),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Sonorisationsimg::where('sonorisation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;







            case 'tents':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'tentes' => [
                                                'material' => $this->listingcategory->material,
                                                'style' => $this->listingcategory->style,
                                                'fabric' => $this->listingcategory->fabric_type,
                                                'otherEquipment' => explode(', ', $this->listingcategory->otherEquipment),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'clothes' => [
                                                'numberOfPieces' => $this->listingcategory->number_of_pieces,
                                                'closureType' => $this->listingcategory->closure_type,
                                                'strapType' => explode(', ', $this->listingcategory->strap_type),
                                                'numberOfPockets' => $this->listingcategory->number_of_pockets,
                                                'heelHeight' => $this->listingcategory->heel_height,
                                                'condition' => $this->listingcategory->condition,
                                                'color' => $this->listingcategory->color,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Clothesimg::where('clothes_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'jewelry':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,

                                            'jewelrys' => [
                                                'type' => $this->listingcategory->type,
                                                'material' => $this->listingcategory->materials,
                                                'occasion' => $this->listingcategory->occasion,
                                                'chainType' => $this->listingcategory->chain_type,
                                                'gemType' => $this->listingcategory->gem_type,
                                                'color' => $this->listingcategory->color,
                                                'closureType' => explode(', ', $this->listingcategory->closure_type),
                                                'condition' => $this->listingcategory->condition,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,

                                            'apartments' => [
                                                'rooms' => $this->listingcategory->rooms,
                                                'livingRooms' => $this->listingcategory->living_rooms,
                                                'bathrooms' => $this->listingcategory->bathrooms,
                                                'bedrooms' => $this->listingcategory->bedrooms,
                                                'securitySystem' => explode(', ', $this->listingcategory->security_system),
                                                'kitchen' => explode(', ', $this->listingcategory->equipped_kitchen),
                                                'service' => explode(', ', $this->listingcategory->service),
                                                'facilities' => explode(', ', $this->listingcategory->facilities),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Apartmentsimg::where('apartment_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'offices':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'bureauxs' => [
                                                'propertyType' => $this->listingcategory->property_type,
                                                'security' => explode(', ', $this->listingcategory->security),
                                                'soilType' => explode(', ', $this->listingcategory->soil_type),
                                                'parking' => $this->listingcategory->parking,
                                                'bathrooms' => $this->listingcategory->bathrooms,
                                                'conferenceRoom' => $this->listingcategory->conference_room,
                                                'buildingSize' => $this->listingcategory->building_size,

                                                'capacity' => $this->listingcategory->capacity,
                                                'bailType' => $this->listingcategory->bail_type,
                                                'securityDeposit' => $this->listingcategory->security_deposit,
                                                'officeTaxes' => $this->listingcategory->office_taxes,
                                                'facilities' => explode(', ', $this->listingcategory->facilities),
                                                'amenities' => explode(', ', $this->listingcategory->amenities),
                                                'services' => explode(', ', $this->listingcategory->services),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Bureauxsimg::where('bureaux_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;






            case 'shops':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'magasins' => [
                                                'propertyType' => $this->listingcategory->property_type,
                                                'surfaceArea' => $this->listingcategory->surface_area,
                                                'capacity' => $this->listingcategory->capacity,
                                                'officeNumber' => $this->listingcategory->offices_number,
                                                'individualOffices' => $this->listingcategory->individual_offices,
                                                'numberOfFloors' => $this->listingcategory->floors,
                                                'garage' => $this->listingcategory->garage,
                                                'approvedUses' => explode(', ', $this->listingcategory->approved_uses),
                                                'totalFacilitySize' => explode(', ', $this->listingcategory->facility_size),
                                                'operatingDays' => explode(', ', $this->listingcategory->operating_days),

                                                'facilities' => explode(', ', $this->listingcategory->facilities),
                                                'amenities' => explode(', ', $this->listingcategory->amenities),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Magasinsimg::where('magasin_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'houses':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'maisons' => [
                                                'securitySystem' => explode(', ', $this->listingcategory->security_system),
                                                'rooms' => $this->listingcategory->rooms,
                                                'livingRooms' => $this->listingcategory->living_rooms,
                                                'bedrooms' => $this->listingcategory->bedrooms,
                                                'bathrooms' => $this->listingcategory->bathrooms,
                                                'floors' => $this->listingcategory->floors,
                                                'amenities' => explode(', ', $this->listingcategory->amenities),
                                                'facilities' => explode(', ', $this->listingcategory->facilities),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'riads' => [
                                                'entire_home' => $this->listingcategory->entire_home,
                                                'doorkeeper' => $this->listingcategory->doorkeeper,
                                                'securitySystem' => explode(', ', $this->listingcategory->security_system),
                                                'equipped_kitchen' => $this->listingcategory->equipped_kitchen,
                                                'wifi' => $this->listingcategory->wifi,
                                                'tv' => $this->listingcategory->tv,
                                                'heating' => $this->listingcategory->heating,
                                                'furniture' => $this->listingcategory->furniture,
                                                'air_conditioner' => $this->listingcategory->air_conditioner,
                                                'washing_machine' => $this->listingcategory->washing_machine,
                                                'pool' => $this->listingcategory->pool,
                                                'rooms' => $this->listingcategory->rooms,
                                                'livingRooms' => $this->listingcategory->living_rooms,
                                                'surface' => $this->listingcategory->surface,
                                                'bedrooms' => $this->listingcategory->bedrooms,
                                                'bathrooms' => $this->listingcategory->bathrooms,
                                                'garden' => $this->listingcategory->garden,
                                                'terrace' => $this->listingcategory->terrace,
                                                'housekeeping' => $this->listingcategory->housekeeping,
                                                'dishwasher' => $this->listingcategory->dishwasher,
                                                'barbecue' => $this->listingcategory->barbecue,
                                                'refrigerator' => $this->listingcategory->refrigerator,
                                                'microwave' => $this->listingcategory->microwave,
                                                'private_entrance' => $this->listingcategory->private_entrance,
                                                'hammam' => $this->listingcategory->hammam,
                                                'jacuzzi' => $this->listingcategory->jacuzzi,
                                                'gym' => $this->listingcategory->gym,
                                                'restaurant' => $this->listingcategory->restaurant,
                                                'spa' => $this->listingcategory->spa,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Riadsimg::where('riad_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'lands':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,



                                            'terrains' => [
                                                'propertyType' => $this->listingcategory->property_type,
                                                'propertySubtype' => $this->listingcategory->property_subtype,
                                                'totalLotSize' => $this->listingcategory->total_lot_size,
                                                'landValuation' => $this->listingcategory->land_valuation,
                                                'totalRating' => $this->listingcategory->total_rating,
                                                'roadAccess' => $this->listingcategory->road_access,
                                                'slopeDescription' => $this->listingcategory->slope_description,
                                                'propertyUsage' => $this->listingcategory->property_usage,
                                                'annualTaxes' => $this->listingcategory->annual_taxes,
                                                'deededAcres' => $this->listingcategory->deeded_acres,
                                                'leasedAcres' => $this->listingcategory->leased_acres,
                                                'elevation' => $this->listingcategory->elevation,
                                                'vegetation' => $this->listingcategory->vegetation,
                                                'nearbyUsage' => explode(', ', $this->listingcategory->nearby_usage),
                                                'topography' => explode(', ', $this->listingcategory->topography),
                                                'zoning' => $this->listingcategory->zoning,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,

                                            'villas' => [
                                                'rooms' => $this->listingcategory->rooms,
                                                'livingRooms' => $this->listingcategory->living_rooms,
                                                'bedrooms' => $this->listingcategory->bedrooms,
                                                'bathrooms' => $this->listingcategory->bathrooms,
                                                'view' => $this->listingcategory->view,
                                                'securitySystem' => explode(', ', $this->listingcategory->security_system),
                                                'facilities' => explode(', ', $this->listingcategory->facilities),
                                                'amenities' => explode(', ', $this->listingcategory->amenities),
                                                'services' => explode(', ', $this->listingcategory->services),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'activities' => [
                                                'type' => $this->listingcategory->type,
                                                'equipment' => explode(', ', $this->listingcategory->equipment),
                                                'ageRequirement' => $this->listingcategory->age_requirement,
                                                'duration' => $this->listingcategory->duration,
                                                'language' => $this->listingcategory->language,
                                                'cancellation' => $this->listingcategory->cancellation,
                                                'safetyEquipment' => explode(', ', $this->listingcategory->safety_equipment),
                                                'monitor' => $this->listingcategory->monitor,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Activitiesimg::where('activity_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'books':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'livres' => [
                                                'genre' => $this->listingcategory->genre,
                                                'type' => $this->listingcategory->type,
                                                'language' => explode(', ', $this->listingcategory->language),
                                                'format' => $this->listingcategory->format,
                                                'duration' => explode(', ', $this->listingcategory->duration),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Livresimg::where('livre_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'musical':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,


                                            'musicals' => [
                                                'musicType' => $this->listingcategory->music_type,
                                                'material' => $this->listingcategory->material,
                                                'style' => $this->listingcategory->style,
                                                'finishType' => $this->listingcategory->finish_type,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Musicalsimg::where('musical_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'furniture':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,



                                            'furnitures' => [
                                                'type' => $this->listingcategory->furniture_type,
                                                'material' => $this->listingcategory->material,
                                                'shape' => $this->listingcategory->shape,
                                                'cushionThickness' => $this->listingcategory->cushion_thickness,
                                                'capacity' => $this->listingcategory->capacity,
                                                'fillMaterial' => $this->listingcategory->fill_material,
                                                'condition' => $this->listingcategory->condition,
                                                'color' => explode(', ', $this->listingcategory->color),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],




                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Furnituresimg::where('furniture_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'home-appliances':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'houseappliances' => [
                                                'accessLocation' => $this->listingcategory->access_location,
                                                'finishType' => $this->listingcategory->finish_type,
                                                'cycleOptions' => $this->listingcategory->cycle_options,
                                                'inletWater' => explode(', ', $this->listingcategory->inlet_water),
                                                'installationMethod' => $this->listingcategory->installation_method,
                                                'components' => explode(', ', $this->listingcategory->components),
                                                'controlType' => $this->listingcategory->control_type,
                                                'certification' => $this->listingcategory->certification,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Houseappliancesimg::where('houseappliance_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'electrical-tools':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'electricaltools' => [
                                                'toolType' => $this->listingcategory->tool_type,
                                                'condition' => $this->listingcategory->condition,
                                                'voltage' => $this->listingcategory->voltage,
                                                'amperage' => explode(', ', $this->listingcategory->amperage),
                                                'cordLength' => explode(', ', $this->listingcategory->cord_length),
                                                'batteryLife' => explode(', ', $this->listingcategory->battery_life),
                                                'display' => $this->listingcategory->display,
                                                'frequency' => $this->listingcategory->frequency,
                                                'temperature' => explode(', ', $this->listingcategory->temperature),
                                                'voltageSensingRanges' => $this->listingcategory->voltage_sensing_ranges,
                                                'detector' => $this->listingcategory->detector,
                                                'operatingAltitude' => $this->listingcategory->operating_altitude,
                                                'compatible' => $this->listingcategory->compatible,
                                                'bindingAngle' => explode(', ', $this->listingcategory->bending_angle),
                                                'accessories' => $this->listingcategory->accessories,
                                                'style' => $this->listingcategory->style,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'ladders' => [
                                                'toolType' => $this->listingcategory->tool_type,
                                                'condition' => $this->listingcategory->condition,
                                                'powerSource' => $this->listingcategory->power_source,
                                                'material' => $this->listingcategory->material,
                                                'height' => $this->listingcategory->height,
                                                'weight' => $this->listingcategory->weight,
                                                'numberOfSteps' => $this->listingcategory->number_of_steps,
                                                'loadCapacity' => $this->listingcategory->load_capacity,
                                                'batteryLife' => $this->listingcategory->battery_life,
                                                'style' => explode(', ', $this->listingcategory->style),
                                                'wheelSize' => $this->listingcategory->wheel_size,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Laddersimg::where('ladder_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'mechanical-tools':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'mechanicaltools' => [
                                                'toolType' => $this->listingcategory->tool_type,
                                                'condition' => $this->listingcategory->condition,
                                                'powerSource' => $this->listingcategory->power_source,
                                                'voltage' => $this->listingcategory->voltage,
                                                'batteryLife' => $this->listingcategory->battery_life,
                                                'bladeDiameter' => $this->listingcategory->blade_diameter,
                                                'material' => $this->listingcategory->material,
                                                'style' => $this->listingcategory->style,
                                                'cuttingWidth' => $this->listingcategory->cutting_width,
                                                'carburetorType' => $this->listingcategory->carburetor_type,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Mechanicaltoolsimg::where('mechanicaltool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'power-tools':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,



                                            'powertools' => [
                                                'toolType' => $this->listingcategory->tool_type,
                                                'condition' => $this->listingcategory->condition,
                                                'powerSource' => $this->listingcategory->power_source,
                                                'voltage' => $this->listingcategory->voltage,
                                                'batteryLife' => $this->listingcategory->battery_life,
                                                'material' => $this->listingcategory->material,
                                                'noiseLevel' => $this->listingcategory->noise_level,
                                                'gritNumber' => $this->listingcategory->grit_number,
                                                'rotationalSpeed' => $this->listingcategory->rotational_speed,
                                                'bladeMaterial' => $this->listingcategory->blade_material,
                                                'surface' => $this->listingcategory->surface,
                                                'style' => $this->listingcategory->style,
                                                'amperage' => $this->listingcategory->amperage,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Powertoolsimg::where('powertool_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'pressure-washers':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,


                                            'pressurewashers' => [
                                                'toolType' => $this->listingcategory->tool_type,
                                                'condition' => $this->listingcategory->condition,
                                                'powerSource' => $this->listingcategory->power_source,
                                                'powerOutput' => $this->listingcategory->power_output,
                                                'enginePower' => $this->listingcategory->engine_power,
                                                'hoseLength' => $this->listingcategory->hose_length,
                                                'cordLength' => $this->listingcategory->cord_length,
                                                'weight' => $this->listingcategory->weight,
                                                'maximumFlowRate' => explode(', ', $this->listingcategory->maximum_flow_rate),
                                                'specificationMet' => explode(', ', $this->listingcategory->specification_met),
                                                'inletConnectionType' => explode(', ', $this->listingcategory->inlet_connection_type),
                                                'outletConnectionSize' => $this->listingcategory->outlet_connection_size,
                                                'maxWorkingTemperature' => $this->listingcategory->max_working_temperature,
                                                'connectionType' => $this->listingcategory->connection_type,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,
                                            'jobtype' => $this->listingcategory->type_service,


                                            'services' => [
                                                'languages' => explode(', ', $this->listingcategory->languages),
                                                'experience' => $this->listingcategory->experience,
                                                'type' => $this->listingcategory->type_service,

                                                'education' => $this->listingcategory->education,
                                                'deliveryTime' => $this->listingcategory->delivery_time,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Servicesimg::where('service_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'jobs':



                                    $this->listingcategory = Job::where('url', $url)->first();

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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                                'status' => $this->listingcategory->status,
                                                'country' => $this->listingcategory->country,
                                                'id' => $this->listingcategory->id,
                                                'url' => $this->listingcategory->url,
                                                'created_at' => $this->listingcategory->created_at,
                                                'jobtype' => $this->listingcategory->responsibilities,


                                                'jobs' => [
                                                    'languages' => explode(', ', $this->listingcategory->language),
                                                    'experience' => $this->listingcategory->experience_level,
                                                    'employmentType' => $this->listingcategory->employment_type,
                                                    'salary' => $this->listingcategory->salary,
                                                    'skills' => explode(', ', $this->listingcategory->skills),

                                                    'responsibilities' => $this->listingcategory->responsibilities,

                                                    'benefits' => explode(', ', $this->listingcategory->benefits),
                                                    'requirements' => explode(', ', $this->listingcategory->requirements),

                                                    'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                                ],


                                                'zip' => $this->listingcategory->zip,'listingid' => $id,
                                                'category' => $this->category,
                                                'images' => Jobsimg::where('job_id', $this->listingcategory->id)->get()->map(function ($image) {
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'boats' => [
                                                'boatType' => $this->listingcategory->boat_type,
                                                'cruiseCapacity' => $this->listingcategory->capacity,
                                                'numberOfCabins' => $this->listingcategory->cabins,
                                                'berthsInCabin' => $this->listingcategory->berths_in_cabin,
                                                'dailyCruisingTime' => $this->listingcategory->cruising_time,
                                                'length' => $this->listingcategory->length,
                                                'security' => explode(', ', $this->listingcategory->security),
                                                'navigation' => explode(', ', $this->listingcategory->navigation),
                                                'kitchenEquipment' => explode(', ', $this->listingcategory->kitchen_equipment),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Boatsimg::where('boat_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);




                break;






            case 'trucks':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'camions' => [
                                                    'type' => $this->listingcategory->type,
                                                    'fuelType' => $this->listingcategory->fuel_type,
                                                    'condition' => $this->listingcategory->condition,
                                                    'transmission' => $this->listingcategory->transmission,
                                                    'insurance' => $this->listingcategory->insurance,
                                                    'navigation' => $this->listingcategory->navigation_system,
                                                    'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                                ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'caravans' => [
                                                'gearbox' => $this->listingcategory->gearbox,
                                                'fuelType' => $this->listingcategory->fuel_type,
                                                'kitchenEquipment' => explode(', ', $this->listingcategory->kitchen_equipment),
                                                'toilet' => $this->listingcategory->toilet,
                                                'furniture' => explode(', ', $this->listingcategory->furniture),
                                                'accessories' => explode(', ', $this->listingcategory->accessories),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'cars' => [
                                                'transmission' => $this->listingcategory->transmission,
                                                'fuelType' => $this->listingcategory->fuel_type,
                                                'numberOfDoors' => $this->listingcategory->number_of_doors,
                                                'condition' => $this->listingcategory->condition,
                                                'seats' => $this->listingcategory->seats,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,




                                            'engins' => [
                                                'type' => $this->listingcategory->type,
                                                'mechanicalCondition' => $this->listingcategory->mechanical_condition,
                                                'transmissionType' => $this->listingcategory->transmission,
                                                'cabType' => $this->listingcategory->cab,
                                                'cabCondition' => $this->listingcategory->cab_condition,
                                                'couplerType' => $this->listingcategory->coupler,
                                                'hydraulicsType' => $this->listingcategory->hydraulics,
                                                'seats' => $this->listingcategory->seats,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],




                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Enginsimg::where('engin_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);






                break;





            case 'motorcycles':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'motos' => [
                                                    'condition' => $this->listingcategory->condition,
                                                    'gearbox' => $this->listingcategory->gearbox,
                                                    'insurance' => $this->listingcategory->insurance,
                                                    'power' => $this->listingcategory->power,
                                                    'speed' => $this->listingcategory->speed,
                                                    'toolkit' => $this->listingcategory->toolkit,
                                                    'intercom' => $this->listingcategory->intercom,
                                                    'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                                ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,

                                            'scooters' => [
                                                'condition' => $this->listingcategory->condition,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Scootersimg::where('scooter_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;






            case 'airport-taxis':




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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'taxiaeroports' => [
                                                'passengers' => $this->listingcategory->passengers,
                                                'luggage' => $this->listingcategory->luggage,
                                                'storage' => $this->listingcategory->storage,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Taxiaeroportsimg::where('taxiaeroport_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;





            case 'transportation':




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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'transportations' => [
                                                'passengers' => $this->listingcategory->passengers,
                                                'luggage' => $this->listingcategory->luggage,
                                                'condition' => $this->listingcategory->condition,
                                                'duration' => explode(', ', $this->listingcategory->duration),
                                                'gearbox' => $this->listingcategory->gearbox,
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],


                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
                                            'category' => $this->category,
                                            'images' => Transportationsimg::where('transportation_id', $this->listingcategory->id)->get()->map(function ($image) {
                                                return $image->picture;
                                            }),
                                        ],
                                    ],
                                ]);





                break;







            case 'bicycles':



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
                            'phone' => $this->listingcategory->phone,
                            'currency' => $this->listingcategory->currency,
                            'status' => $this->listingcategory->status,
                                            'country' => $this->listingcategory->country,
                                            'id' => $this->listingcategory->id,
                                            'url' => $this->listingcategory->url,
                                            'created_at' => $this->listingcategory->created_at,


                                            'velos' => [
                                                'bikeType' => $this->listingcategory->bike_type,
                                                'seatpost' => $this->listingcategory->seatpost,
                                                'condition' => explode(', ', $this->listingcategory->condition),
                                                'storage' => explode(', ', $this->listingcategory->storage),
                                                'fork' => explode(', ', $this->listingcategory->fork),
                                                'gear' => explode(', ', $this->listingcategory->gear),
                                                'moreDetails' => explode(', ', $this->listingcategory->more_details),
                                            ],



                                            'zip' => $this->listingcategory->zip,'listingid' => $id,
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








}
