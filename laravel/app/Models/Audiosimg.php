<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Audiosimg extends Model
{



    protected $fillable = ['audio_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function audiosimg(): BelongsTo {

        return $this->belongsTo(Audiosimg::class);

    }


}
