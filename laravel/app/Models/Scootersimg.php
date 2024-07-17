<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Scootersimg extends Model
{


    protected $fillable = ['scooter_id','picture', 'alttext'];

    public function scootersimg(): BelongsTo {

        return $this->belongsTo(Scootersimg::class);

    }


}
