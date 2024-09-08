<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Houseappliancesimg extends Model
{


    protected $fillable = ['houseappliance_id','picture', 'alttext','picturesmall'];

    public function houseappliancesimg(): BelongsTo {

        return $this->belongsTo(Houseappliancesimg::class);

    }


}
