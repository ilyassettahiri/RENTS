<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Listingsimg extends Model
{


    protected $fillable = ['listing_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function listingsimg(): BelongsTo {

        return $this->belongsTo(Listingsimg::class);

    }


}
