<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Generaleinfo extends Model
{


    protected $fillable = [
        'name',
        'address',
        'city',
        'state',
        'country',
        'zip',
        'phone',
        'email',
        'website',
        'facebook',
        'twitter',
        'instagram',
        'linkedin',
        'pinterest',
        'telegram',
        'tiktok',
        'youtube',
        'picture1',
        'picture2',
        'picture3',
        'picture4',
        'description',
    ];




}
