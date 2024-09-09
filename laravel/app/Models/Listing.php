<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Listingsimg;
use App\Models\Reservation;


class Listing extends Model
{


    protected $fillable = [ 'typea','onlinestore_id','user_id','title','status','picture','phone','price','category','url'];





    public function listingsimg(): HasMany {


        return $this->hasMany(Listingsimg::class);
    }

    public function review(): HasMany {


        return $this->hasMany(Review::class);
    }


    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'discount_listing');
    }


}
