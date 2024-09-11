<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Sonorisationsimg extends Model
{


    protected $fillable = ['sonorisation_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function sonorisationsimg(): BelongsTo {

        return $this->belongsTo(Sonorisationsimg::class);

    }


}
