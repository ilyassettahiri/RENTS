<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transportationsimg extends Model
{


    protected $fillable = ['transportation_id','picture', 'alttext'];

    public function transportationsimg(): BelongsTo {

        return $this->belongsTo(Transportationsimg::class);

    }


}
