<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Musicalsimg extends Model
{


    protected $fillable = ['musical_id','picture', 'alttext','picturesmall'];

    public function musicalsimg(): BelongsTo {

        return $this->belongsTo(Musicalsimg::class);

    }


}
