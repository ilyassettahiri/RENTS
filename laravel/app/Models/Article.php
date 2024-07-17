<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Blog;

use App\Models\Author;


use App\Models\Blogtag;

use App\Models\Articleimg;




use App\Models\Blogcategory;



class Article extends Model
{



    protected $fillable = ['blog_id', 'title','actor','url', 'content', 'category', 'tag', 'thumb', 'blogcategory_id'
                            , 'author_id'

                            ];



    public function articleimgs(): HasMany {


        return $this->hasMany(Articleimg::class);

    }


    public function blog(): BelongsTo {


        return $this->belongsTo(Blog::class);

    }



    public function blogtags()
    {
        return $this->belongsToMany(Blogtag::class, 'article_tag');
    }



    public function author(): BelongsTo {


        return $this->belongsTo(Author::class);

    }



    public function blogcategory(): BelongsTo {


        return $this->belongsTo(Blogcategory::class);


    }






}
