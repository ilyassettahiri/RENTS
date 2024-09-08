<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Divingsimg extends Model
{



    protected $fillable = ['diving_id','picture', 'alttext','picturesmall'];

    public function divingsimg(): BelongsTo {

        return $this->belongsTo(Divingsimg::class);

    }


}
