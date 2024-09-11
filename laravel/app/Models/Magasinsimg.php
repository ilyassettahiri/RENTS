<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Magasinsimg extends Model
{


    protected $fillable = ['magasin_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function magasinsimg(): BelongsTo {

        return $this->belongsTo(Magasinsimg::class);

    }


}
