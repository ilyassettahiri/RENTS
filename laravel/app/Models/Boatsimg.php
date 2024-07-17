<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Boatsimg extends Model
{



    protected $fillable = ['boat_id','picture', 'alttext'];

    public function boatsimg(): BelongsTo {

        return $this->belongsTo(Boatsimg::class);

    }


}
