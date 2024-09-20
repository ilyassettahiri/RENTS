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






        $manager = new ImageManager(new Driver());

        $file = $request->file('attachment');
        $imagelarge = $manager->read($file->getRealPath());




        $imagelarge->scaleDown(width: 400);




        $fileNamelarge = $this->generateUniqueFileName('jpg');



        $encodedImagelarge = $imagelarge->encode(new AutoEncoder(quality: 95));




        $encodedImagelarge->save($fileNamelarge);






        $filePathlarge = Storage::disk('spaces')->put('storage/collectionimages/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');




        $relativePath = $fileNamelarge;





            return response()->json(compact('relativePath'), 201);
    }




    public function uploadstore(Request $request)
    {




            $request->validate([
                'attachmentpicture' => 'required|image|max:6048',
                'attachmentprofile' => 'required|image|max:6048',

            ]);




        // Initialize variables for image paths
        $picturerelativePath = null;
        $profil_picturerelativePath = null;



        if ($request->hasFile('attachmentpicture')) {
            $files = $request->file('attachmentpicture');


                $filePath = Storage::disk('public')->put('images', $files);
                $picturerelativePath = '/' . $filePath; // Prepend '/' to make it a relative path




        }



        if ($request->hasFile('attachmentprofile')) {
            $files = $request->file('attachmentprofile');


                $filePathaa = Storage::disk('public')->put('images', $files);
                $profil_picturerelativePath = '/' . $filePathaa; // Prepend '/' to make it a relative path


        }




        /*$manager = new ImageManager(new Driver());

        if ($request->hasFile('attachmentpicture')) {
            $file = $request->file('attachmentprofile');


                try {


                    $imagelarge = $manager->read($file->getRealPath());



                    $imagelarge->scaleDown(width: 1500);




                    $fileNamelarge = $this->generateUniqueFileName('jpg');



                    $encodedImagelarge = $imagelarge->encode(new AutoEncoder(quality: 85));




                    $encodedImagelarge->save($fileNamelarge);






                    $filePathlarge = Storage::disk('spaces')->put('storage/storelarge/' . $fileNamelarge, file_get_contents($fileNamelarge), 'public');




                    $relativePathlarge = '/storelarge/' . $fileNamelarge;
                    $picturerelativePath = $relativePathlarge;





                } catch (\Exception $e) {
                    Log::error('Image upload and processing failed.', ['error' => $e->getMessage()]);
                }

        }


        if ($request->hasFile('attachmentprofile')) {
            $file = $request->file('attachmentprofile');


                try {


                    $imagesmall = $manager->read($file->getRealPath());



                    $imagesmall->scaleDown(width: 100);




                    $fileNamesmall = $this->generateUniqueFileName('jpg');



                    $encodedImagesmall = $imagesmall->encode(new AutoEncoder(quality: 85));




                    $encodedImagesmall->save($fileNamesmall);






                    $filePathsmall = Storage::disk('spaces')->put('storage/storesmall/' . $fileNamesmall, file_get_contents($fileNamesmall), 'public');




                    $relativePathsmall = '/storesmall/' . $fileNamesmall;
                    $profil_picturerelativePath = $relativePathsmall;





                } catch (\Exception $e) {
                    Log::error('Image upload and processing failed.', ['error' => $e->getMessage()]);
                }

        }*/






        return response()->json([
            'picturerelativePath' => $picturerelativePath,
            'profil_picturerelativePath' => $profil_picturerelativePath,
        ], 201);

    }


    public function uploadlisting(Request $request)
    {



        // Validate the files. Ensure 'data.attributes.images' contains an array of files.
        $request->validate([
            'data.attributes.images.*' => 'required|image|max:2048', // Validate each file in the array
        ]);







                // Initialize an array to hold the image paths
                $imagePathslarge = [];
                $imagePathssmall = [];

                $imagePathsxlarge = [];

                $thumb = null;


                $category = $request->input('selectedCategory');


                $manager = new ImageManager(new Driver());

                if ($request->hasFile('attachment')) {
                    $files = $request->file('attachment');

                    foreach ($files as $index => $file) {
                        try {


                            $imagelarge = $manager->read($file->getRealPath());

                            $imagexlarge = $manager->read($file->getRealPath());


                            $imagesmall = $manager->read($file->getRealPath());




                            $imagelarge->scaleDown(height: 500);

                            $imagexlarge->scaleDown(width: 1000);


                            $imagesmall->scaleDown(width: 400);





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




                /*if ($request->hasFile('attachment')) {
                    $files = $request->file('attachment');

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






        return response()->json([
            'imagePathslarge' => $imagePathslarge,
            'imagePathssmall' => $imagePathssmall,
            'imagePathsxlarge' => $imagePathsxlarge,
            'thumb' => $thumb
        ], 201);


    }



}
