<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Electricaltoolimg;
use App\Models\Reservation;


class Electricaltool extends Model
{


    protected $fillable = ['collection_id','discount_id','typea','onlinestore_id','address','city','zip','country','phone','startdate','enddate','title','description','price','url','user_id','picture','brand_name'];



    public function servicesimg(): HasMany {


        return $this->hasMany(Electricaltoolsimg::class);
    }



    public function collection(): BelongsTo {

        return $this->belongsTo(Collection::class);

    }


    public function discount(): BelongsTo {

        return $this->belongsTo(Discount::class);

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
