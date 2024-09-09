<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Boatimg;
use App\Models\Reservation;


class Boat extends Model
{



    protected $fillable = ['typea','address','city','onlinestore_id','zip','country','phone','startdate','enddate','title','description','price','url','user_id','picture','brand_name'];


    public function servicesimg(): HasMany {


        return $this->hasMany(Boatsimg::class);
    }




    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }



    public function onlinestore(): BelongsTo {

        return $this->belongsTo(Onlinestore::class);

    }



    public function reservation(): HasMany {


        return $this->hasMany(Reservation::class);
    }


    public function review(): HasMany {


        return $this->hasMany(Review::class);
    }



}
