<?php

namespace App\Models;



use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Author extends Model
{


    protected $fillable = ['name', 'picture', 'bio'];



    public function articles(): HasMany {

        return $this->hasMany(Article::class);
    }





}