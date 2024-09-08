<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Furnituresimg extends Model
{


    protected $fillable = ['furniture_id','picture', 'alttext','picturesmall'];

    public function furnituresimg(): BelongsTo {

        return $this->belongsTo(Furnituresimg::class);

    }


}
