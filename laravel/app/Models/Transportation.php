<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Transportationimg;
use App\Models\Reservation;


class Transportation extends Model
{


    protected $fillable = ['onlinestore_id','address','city','zip','country','phone','startdate','enddate','title','description','price','url','user_id','picture','brand_name'];


    public function transportationsimg(): HasMany {


        return $this->hasMany(Transportationsimg::class);
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