<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Enums\Status;

class Reviewreply extends Model
{



    protected $fillable = [


        'review_id',
        'user_id',
        'message',
        'name',
        'email',



    ];


    public function user(): belongsTo {

        return $this->belongsTo(User::class);

    }



    public function review(): belongsTo {

        return $this->belongsTo(Review::class);

    }



}
