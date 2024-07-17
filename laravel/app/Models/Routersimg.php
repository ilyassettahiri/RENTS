<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Routersimg extends Model
{


    protected $fillable = ['router_id','picture', 'alttext'];

    public function routersimg(): BelongsTo {

        return $this->belongsTo(Routersimg::class);

    }


}
