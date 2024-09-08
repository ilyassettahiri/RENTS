<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Electricaltoolsimg extends Model
{


    protected $fillable = ['electricaltool_id','picture', 'alttext','picturesmall'];

    public function electricaltoolsimg(): BelongsTo {

        return $this->belongsTo(Electricaltoolsimg::class);

    }


}
