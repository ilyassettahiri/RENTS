<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;




class Listing extends Model
{


    protected $fillable = [ 'onlinestore_id','user_id','title','status','picture','price','category','url'];








    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'discount_listing');
    }


}
