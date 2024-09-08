<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Article;


class Articleimg extends Model
{



    protected $fillable = ['article_id','picture', 'alttext','picturesmall'];

    public function article(): BelongsTo {


        return $this->belongsTo(Article::class);

    }




}
