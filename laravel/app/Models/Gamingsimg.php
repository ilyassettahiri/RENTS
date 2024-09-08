<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Gamingsimg extends Model
{


    protected $fillable = ['gaming_id','picture', 'alttext','picturesmall'];

    public function gamingsimg(): BelongsTo {

        return $this->belongsTo(Gamingsimg::class);

    }


}
