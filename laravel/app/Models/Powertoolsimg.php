<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Powertoolsimg extends Model
{


    protected $fillable = ['powertool_id','picture', 'alttext'];

    public function powertoolsimg(): BelongsTo {

        return $this->belongsTo(Powertoolsimg::class);

    }


}
