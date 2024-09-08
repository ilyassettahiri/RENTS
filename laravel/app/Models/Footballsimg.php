<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Footballsimg extends Model
{


    protected $fillable = ['football_id','picture', 'alttext','picturesmall'];

    public function footballsimg(): BelongsTo {

        return $this->belongsTo(Footballsimg::class);

    }


}
