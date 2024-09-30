<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;

class Team extends Model
{



    protected $fillable = [
        'name',

        'user_id',
    ];




    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }




}
