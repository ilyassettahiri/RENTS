<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Livreimg;
use App\Models\Reservation;


class Livre extends Model
{


    protected $fillable = ['collection_id','discount_id','typea','onlinestore_id','address','city','zip','country','phone','startdate','enddate','title','description','price','url','user_id','picture','livre_title'];



    public function servicesimg(): HasMany {


        return $this->hasMany(Livresimg::class);
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
