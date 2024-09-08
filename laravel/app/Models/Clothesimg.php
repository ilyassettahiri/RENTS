<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Clothesimg extends Model
{


    protected $fillable = ['clothes_id','picture', 'alttext','picturesmall'];

    public function clothesimg(): BelongsTo {

        return $this->belongsTo(Clothesimg::class);

    }


}
