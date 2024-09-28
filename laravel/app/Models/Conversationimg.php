<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Conversationimg extends Model
{


    protected $fillable = ['conversation_id','picture', 'alttext','picturesmall','picturesxlarge'];

    public function conversationimg(): BelongsTo {

        return $this->belongsTo(Conversationimg::class);

    }

}
