<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Laddersimg extends Model
{


    protected $fillable = ['ladder_id','picture', 'alttext'];

    public function laddersimg(): BelongsTo {

        return $this->belongsTo(Laddersimg::class);

    }


}
