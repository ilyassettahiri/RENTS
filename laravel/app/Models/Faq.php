<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



use App\Models\Faqsubject;



class Faq extends Model
{


    protected $fillable = [
        'question',
        'answer',
        'faqsubject_id',

    ];





    public function faqsubject(): BelongsTo {


        return $this->belongsTo(Faqsubject::class);

    }



}
