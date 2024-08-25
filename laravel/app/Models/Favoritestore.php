<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Favoritestore extends Model
{


    protected $fillable = [ 'seller_id','user_id','title','status','listing_old','category','url',

    'name' ,'picture','address','city','zip','country','profile_picture','onlinestore_id'

    ];


    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }




    public function onlinestore(): BelongsTo {


        return $this->belongsTo(Onlinestore::class);
       }


}
