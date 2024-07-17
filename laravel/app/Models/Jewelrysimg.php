<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Jewelrysimg extends Model
{


    protected $fillable = ['jewelry_id','picture', 'alttext'];

    public function jewelrysimg(): BelongsTo {

        return $this->belongsTo(Jewelrysimg::class);

    }


}
