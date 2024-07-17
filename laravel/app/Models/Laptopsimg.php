<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Laptopsimg extends Model
{



    protected $fillable = ['laptop_id','picture', 'alttext'];

    public function laptopsimg(): BelongsTo {

        return $this->belongsTo(Laptopsimg::class);

    }


}
