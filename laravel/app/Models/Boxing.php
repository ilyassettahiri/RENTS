<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Reservation;
use App\Models\Favorite;
use App\Models\Boxingimg;




class Boxing extends Model
{


    protected $fillable = ['title','address','city','zip','onlinestore_id','country','phone','description','price','url','user_id','picture','brand_name','startdate','enddate'];


    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }


    public function boxingsimg(): HasMany {


        return $this->hasMany(Boxingsimg::class);
    }


    public function review(): HasMany {


        return $this->hasMany(Review::class);
    }

    public function reservation(): HasMany {


        return $this->hasMany(Reservation::class);
    }

}