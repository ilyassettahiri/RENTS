<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Eclairagesimg extends Model
{


    protected $fillable = ['eclairage_id','picture', 'alttext'];

    public function eclairagesimg(): BelongsTo {

        return $this->belongsTo(Eclairagesimg::class);

    }


}
