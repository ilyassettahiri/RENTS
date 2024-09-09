<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Bureauximg;

use App\Models\Reservation;

class Bureaux extends Model
{


    protected $fillable = ['typea','address','city','zip','onlinestore_id','country','phone','startdate','enddate','title','description','price','url','user_id','picture','property_type'];



    public function servicesimg(): HasMany {


        return $this->hasMany(Bureauxsimg::class);
    }



    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }

    public function reservation(): HasMany {


        return $this->hasMany(Reservation::class);
    }


    public function review(): HasMany {


        return $this->hasMany(Review::class);
    }
}
