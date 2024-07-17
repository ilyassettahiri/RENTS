<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Activityimg;
use App\Models\Reservation;


class Activity extends Model
{


    protected $fillable = ['address','city','zip','country','phone','startdate','enddate','onlinestore_id','title','description','price','url','user_id','picture','type'];



    public function activitiesimg(): HasMany {


        return $this->hasMany(Activitiesimg::class);
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
