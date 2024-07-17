<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Blog extends Model
{


    protected $fillable = ['title', 'content'];



    public function articles(): HasMany {

        return $this->hasMany(Article::class);
    }




}
