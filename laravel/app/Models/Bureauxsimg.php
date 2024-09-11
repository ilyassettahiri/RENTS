<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Bureauxsimg extends Model
{



    protected $fillable = ['bureaux_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function bureauxsimg(): BelongsTo {

        return $this->belongsTo(Bureauxsimg::class);

    }


}
