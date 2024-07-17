<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Carsimg extends Model
{



    protected $fillable = ['car_id','picture', 'alttext'];

    public function carsimg(): BelongsTo {

        return $this->belongsTo(Carsimg::class);

    }

}
