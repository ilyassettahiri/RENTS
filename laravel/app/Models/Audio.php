<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Audioimg;
use App\Models\Reservation;


class Audio extends Model
{


    protected $fillable = ['address','city','zip','country','phone','onlinestore_id','startdate','enddate','title','description','price','url','user_id','picture','brand_name'];


    public function audiosimg(): HasMany {


        return $this->hasMany(Audiosimg::class);
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