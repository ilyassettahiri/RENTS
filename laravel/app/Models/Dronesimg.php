<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Dronesimg extends Model
{



    protected $fillable = ['drone_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function dronesimg(): BelongsTo {

        return $this->belongsTo(Dronesimg::class);

    }


}
