<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Terrainsimg extends Model
{


    protected $fillable = ['terrain_id','picture', 'alttext'];

    public function terrainsimg(): BelongsTo {

        return $this->belongsTo(Terrainsimg::class);

    }


}
