<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Blogcategory extends Model
{


    protected $fillable = ['name', 'thumb'];



    public function articles(): HasMany {

        return $this->hasMany(Article::class);
    }






}
