<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Boxingsimg extends Model
{



    protected $fillable = ['boxing_id','picture', 'alttext','picturesmall'];

    public function boxingsimg(): BelongsTo {

        return $this->belongsTo(Boxingsimg::class);

    }


}
