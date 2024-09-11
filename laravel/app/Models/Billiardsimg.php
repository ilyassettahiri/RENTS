<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Billiardsimg extends Model
{



    protected $fillable = ['billiard_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function billiardsimg(): BelongsTo {

        return $this->belongsTo(Billiardsimg::class);

    }


}
