<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Servicesimg extends Model
{


    protected $fillable = ['service_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function servicesimg(): BelongsTo {

        return $this->belongsTo(Servicesimg::class);

    }


}
