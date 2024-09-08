<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Apartmentsimg extends Model
{



    protected $fillable = ['apartment_id','picture', 'alttext','picturesmall'];

    public function apartmentsimg(): BelongsTo {

        return $this->belongsTo(Apartmentsimg::class);

    }

}
