<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Models\Article;



class Blogtag extends Model
{

    protected $fillable = ['name'];




    public function articles()
    {
        return $this->belongsToMany(Article::class, 'article_tag');
    }


}
