<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Camionsimg extends Model
{



    protected $fillable = ['camion_id','picture', 'alttext','picturesmall'];

    public function camionsimg(): BelongsTo {

        return $this->belongsTo(Camionsimg::class);

    }
}
