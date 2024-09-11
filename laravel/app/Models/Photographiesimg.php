<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Photographiesimg extends Model
{


    protected $fillable = ['photographie_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function photographiesimg(): BelongsTo {

        return $this->belongsTo(Photographiesimg::class);

    }


}
