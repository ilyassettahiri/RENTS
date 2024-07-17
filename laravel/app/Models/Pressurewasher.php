<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Pressurewasherimg;
use App\Models\Reservation;


class Pressurewasher extends Model
{


    protected $fillable = ['onlinestore_id','address','city','zip','country','phone','startdate','enddate','title','description','price','url','user_id','picture','brand_name'];


    public function pressurewashersimg(): HasMany {


        return $this->hasMany(Pressurewashersimg::class);
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
