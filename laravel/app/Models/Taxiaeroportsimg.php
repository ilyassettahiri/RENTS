<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Taxiaeroportsimg extends Model
{


    protected $fillable = ['taxiaeroport_id','picture', 'alttext','picturesmall'];

    public function taxiaeroportsimg(): BelongsTo {

        return $this->belongsTo(Taxiaeroportsimg::class);

    }


}
