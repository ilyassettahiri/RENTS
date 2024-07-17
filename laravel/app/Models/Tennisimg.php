<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tennisimg extends Model
{


    protected $fillable = ['tennis_id','picture', 'alttext'];

    public function tennisimg(): BelongsTo {

        return $this->belongsTo(Tennisimg::class);

    }


}
