<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Mechanicaltoolsimg extends Model
{


    protected $fillable = ['mechanicaltool_id','picture', 'alttext','picturesmall'];

    public function mechanicaltoolsimg(): BelongsTo {

        return $this->belongsTo(Mechanicaltoolsimg::class);

    }


}
