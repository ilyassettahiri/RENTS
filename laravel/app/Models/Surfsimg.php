<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Surfsimg extends Model
{


    protected $fillable = ['surf_id','picture', 'alttext'];

    public function surfsimg(): BelongsTo {

        return $this->belongsTo(Surfsimg::class);

    }


}
