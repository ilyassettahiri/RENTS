<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Camerasimg extends Model
{


    protected $fillable = ['camera_id','picture', 'alttext','picturesmall'];

    public function camerasimg(): BelongsTo {

        return $this->belongsTo(Camerasimg::class);

    }


}
