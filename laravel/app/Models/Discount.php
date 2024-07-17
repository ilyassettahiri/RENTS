<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Auth;


class Discount extends Model
{



    protected $fillable = [
        'code',
        'discountvalue',
        'applies_to',
        'requirements',
        'purchaseamount',
        'user_id',
    ];



    public function user(): BelongsTo {

        return $this->belongsTo(User::class);

    }

    public function collections()
    {
        return $this->belongsToMany(Collection::class, 'collection_discount');
    }


    public function listings()
    {
        return $this->belongsToMany(Listing::class, 'discount_listing');
    }


    public function scopeCode(Builder $query, string $value): Builder
    {
        return $query->where('discounts.code', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeDiscountvalue(Builder $query, string $value): Builder
    {
        return $query->where('discounts.discountvalue', 'LIKE', "%{$value}%", 'or');
    }



}
