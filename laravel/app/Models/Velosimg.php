<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Velosimg extends Model
{


    protected $fillable = ['velo_id','picture', 'alttext'];

    public function velosimg(): BelongsTo {

        return $this->belongsTo(Velosimg::class);

    }


}
