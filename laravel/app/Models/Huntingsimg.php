<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Huntingsimg extends Model
{


    protected $fillable = ['hunting_id','picture', 'alttext'];

    public function huntingsimg(): BelongsTo {

        return $this->belongsTo(Huntingsimg::class);

    }


}