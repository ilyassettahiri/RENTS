<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Lightingsimg extends Model
{


    protected $fillable = ['lighting_id','picture', 'alttext','picturesmall'];

    public function lightingsimg(): BelongsTo {

        return $this->belongsTo(Lightingsimg::class);

    }


}
