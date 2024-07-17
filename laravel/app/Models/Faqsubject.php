<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


use App\Models\Faq;



class Faqsubject extends Model
{


    protected $fillable = [
        'name',
        'picture',

    ];



    public function faqs(): HasMany {


        return $this->hasMany(Faq::class);

    }




}
