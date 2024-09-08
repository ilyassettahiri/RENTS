<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Caravansimg extends Model
{


    protected $fillable = ['caravan_id','picture', 'alttext','picturesmall'];

    public function caravansimg(): BelongsTo {

        return $this->belongsTo(Caravansimg::class);

    }


}
