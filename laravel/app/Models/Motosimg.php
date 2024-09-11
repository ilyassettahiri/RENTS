<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Motosimg extends Model
{



    protected $fillable = ['moto_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function motosimg(): BelongsTo {

        return $this->belongsTo(Motosimg::class);

    }


}
