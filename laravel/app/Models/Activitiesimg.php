<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Activitiesimg extends Model
{


    protected $fillable = ['activity_id','picture', 'alttext','picturesmall'];

    public function activitiesimg(): BelongsTo {

        return $this->belongsTo(Activitiesimg::class);

    }
}
