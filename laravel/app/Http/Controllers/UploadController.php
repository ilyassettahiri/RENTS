<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use LaravelJsonApi\Core\Document\Error;
use Illuminate\Support\Facades\Auth;
use App\Models\Collection;
use Illuminate\Support\Facades\Log;


use Illuminate\Support\Str;

use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\Encoders\WebpEncoder;
use Intervention\Image\Encoders\GifEncoder;

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




use App\Models\User;


class UploadController extends Controller
{


    function generateUniqueFileName($extension = 'jpg')
    {

        $randomString = bin2hex(random_bytes(16)); // Generate a random 32-character hexadecimal string
        $shuffledString = str_shuffle($randomString); // Shuffle the string for added randomness
        return $shuffledString . '.' . $extension;

    }


    public function upload(Request $request)
    {
        // Validate the request
        $request->validate([
            'attachment' => 'required|image|max:2048',
        ]);

        // Get the authenticated user
        $user = Auth::user();
        if (!$user) {
            return response()->json([
                'errors' => [
                    'title' => 'Unauthorized',
                    'detail' => 'User not authenticated',
                    'status' => '401',
                ]
            ], 401);
        }

        $manager = new ImageManager(new Driver());

        $file = $request->file('attachment');
        $imagelarge = $manager->read($file->getRealPath());




        $imagelarge->scaleDown(width: 100);




        $fileNamelarge = $this->generateUniqueFileName('jpg');



        $encodedImagelarge = $imagelarge->encode(new AutoEncoder(quality: 85));




        $encodedImagelarge->save($fileNamelarge);






        $filePathlarge = Storage::disk('spaces')->put('storage/userimages/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');




        $relativePathlarge = '/userimages/' . $fileNamelarge;
        $relativePath = $relativePathlarge;






        $user->profile_image = $relativePath;
        $user->save();

        return response()->json(compact('relativePath'), 201);
    }


    public function uploadcollection(Request $request)
    {




            $request->validate([
                'attachment' => 'required|image|max:2048',
            ]);



            $file = $request->file('attachment');






                $filePath = Storage::disk('spaces')->put('storage/userimages', $file, 'public');

                $relativePath = str_replace('storage/', '', $filePath);
                $relativePath = '/' . $relativePath;




            return response()->json(compact('relativePath'), 201);
    }


    public function uploadlisting(Request $request)
    {



        // Validate the files. Ensure 'data.attributes.images' contains an array of files.
        $request->validate([
            'data.attributes.images.*' => 'required|image|max:2048', // Validate each file in the array
        ]);



        $imagePaths = [];
        $thumb = null;


        $hasFile = $request->hasFile('attachment');


        if ($hasFile) {
            $files = $request->file('attachment');


            foreach ($files as $index => $file) {

                $filePath = Storage::disk('spaces')->put('storage/images', $file, 'public');
                $relativePath = str_replace('storage/', '', $filePath);
                $relativePath = '/' . $relativePath; // Ensure the path is relative

                $imagePaths[] = $relativePath;

                // Set the first uploaded image as the thumbnail
                if ($index === 0) {
                    $thumb = $relativePath;
                }

            }
        }


        return response()->json([
            'imagePaths' => $imagePaths,
            'thumb' => $thumb
        ], 201);


    }



}
