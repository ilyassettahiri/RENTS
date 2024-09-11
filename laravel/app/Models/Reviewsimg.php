<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reviewsimg extends Model
{


    protected $fillable = ['reviews_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function reviewsimg(): BelongsTo {

        return $this->belongsTo(Reviewsimg::class);

    }


}
