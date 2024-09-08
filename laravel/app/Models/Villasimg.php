<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Villasimg extends Model
{


    protected $fillable = ['villa_id','picture', 'alttext','picturesmall'];

    public function villasimg(): BelongsTo {

        return $this->belongsTo(Villasimg::class);

    }


}
