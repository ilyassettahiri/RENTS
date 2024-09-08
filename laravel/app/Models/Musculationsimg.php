<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Musculationsimg extends Model
{


    protected $fillable = ['musculation_id','picture', 'alttext','picturesmall'];

    public function musculationsimg(): BelongsTo {

        return $this->belongsTo(Musculationsimg::class);

    }


}
