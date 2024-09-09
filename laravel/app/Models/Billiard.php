<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Review;
use App\Models\Favorite;
use App\Models\Reservation;
use App\Models\Billiardsimg;



class Billiard extends Model
{

    protected $fillable = ['typea','startdate','enddate','address','city','zip','country','phone','title','description','price','url','user_id','onlinestore_id','picture','table_brand','year_model','table_dimensions','table_weight','table_type','condition'];


    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }


    public function onlinestore(): BelongsTo {

        return $this->belongsTo(Onlinestore::class);

    }




    public function review(): HasMany {


        return $this->hasMany(Review::class);
    }


    public function servicesimg(): HasMany {


        return $this->hasMany(Billiardsimg::class);
    }

    public function reservation(): HasMany {


        return $this->hasMany(Reservation::class);
    }


}
