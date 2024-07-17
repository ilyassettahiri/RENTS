<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Livresimg extends Model
{


    protected $fillable = ['livre_id','picture', 'alttext'];

    public function livresimg(): BelongsTo {

        return $this->belongsTo(Livresimg::class);

    }


}
