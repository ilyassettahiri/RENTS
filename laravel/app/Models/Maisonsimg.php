<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Maisonsimg extends Model
{


    protected $fillable = ['maison_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function maisonsimg(): BelongsTo {

        return $this->belongsTo(Maisonsimg::class);

    }


}
