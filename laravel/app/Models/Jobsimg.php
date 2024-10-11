<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Jobsimg extends Model
{
    protected $fillable = ['job_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function laddersimg(): BelongsTo {

        return $this->belongsTo(Laddersimg::class);

    }
}
