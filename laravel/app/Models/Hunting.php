<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Huntingimg;
use App\Models\Reservation;


class Hunting extends Model
{


    protected $fillable = ['onlinestore_id','address','city','zip','country','phone','startdate','enddate','title','description','price','url','user_id','picture','bow_arrow'];



    public function huntingsimg(): HasMany {


        return $this->hasMany(Huntingsimg::class);
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
