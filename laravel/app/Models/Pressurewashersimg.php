<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Pressurewashersimg extends Model
{


    protected $fillable = ['pressurewasher_id','picture', 'alttext'];

    public function pressurewashersimg(): BelongsTo {

        return $this->belongsTo(Pressurewashersimg::class);

    }


}