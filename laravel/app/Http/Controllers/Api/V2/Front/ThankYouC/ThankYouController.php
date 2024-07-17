<?php

namespace App\Http\Controllers\Api\V2\Front\ThankYouC;

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
use Illuminate\Support\Carbon;

use App\Enums\ItemStatus;
use App\Models\Billiardsimg;
use Illuminate\Support\Str;




use App\Models\Listing;
use App\Models\Reservation;
use App\Models\Customer;



use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;




use App\Models\Billiard;
use App\Models\Boxing;




class ThankYouController extends JsonApiController
{





    public function getThankYou(Request $request, $checkout_id)
    {


        $reservation = Reservation::where('checkout_id', $checkout_id)->first();


        return response()->json([
            'data' => [
                'type' => $reservation->category,
                'id' => $reservation->id,
                'attributes' => [

                    'name' => $reservation->name,
                    'title' => $reservation->listings_title,
                    'price' => $reservation->listings_price,

                    'startdate' => $reservation->reservationstart,
                    'enddate' => $reservation->reservationsend,

                    'picture' => $reservation->listings_thumb,






                ],
            ],
        ]);





    }


}
