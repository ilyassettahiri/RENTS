<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Tablettesimg extends Model
{


    protected $fillable = ['tablette_id','picture', 'alttext','picturesmall'];

    public function tablettesimg(): BelongsTo {

        return $this->belongsTo(Tablettesimg::class);

    }


}
