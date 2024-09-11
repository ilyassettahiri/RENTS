<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mobiliersimg extends Model
{


    protected $fillable = ['mobilier_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function mobiliersimg(): BelongsTo {

        return $this->belongsTo(Mobiliersimg::class);

    }


}
