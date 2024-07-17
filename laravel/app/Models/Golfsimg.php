<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Golfsimg extends Model
{


    protected $fillable = ['golf_id','picture', 'alttext'];

    public function golfsimg(): BelongsTo {

        return $this->belongsTo(Golfsimg::class);

    }


}
