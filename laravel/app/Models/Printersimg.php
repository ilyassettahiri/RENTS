<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Printersimg extends Model
{


    protected $fillable = ['printer_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function printersimg(): BelongsTo {

        return $this->belongsTo(Printersimg::class);

    }


}
