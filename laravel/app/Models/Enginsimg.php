<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Enginsimg extends Model
{


    protected $fillable = ['engin_id','picture', 'alttext','picturesmall'];

    public function enginsimg(): BelongsTo {

        return $this->belongsTo(Enginsimg::class);

    }


}
