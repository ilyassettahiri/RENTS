<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class About extends Model
{


    protected $fillable = [
        'large_picture',
        'profile_picture',
        'title',
        'content',
        'job',
        'successful_hiring',
        'partner',
        'employee',
    ];



}
