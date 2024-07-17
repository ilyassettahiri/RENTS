<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Riadsimg extends Model
{


    protected $fillable = ['riad_id','picture', 'alttext'];

    public function riadsimg(): BelongsTo {

        return $this->belongsTo(Riadsimg::class);

    }


}
