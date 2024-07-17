<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int                                                         $id
 * @property string                                                      $name
 * @property string|null                                                 $description
 *
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\Item[] $items
 */
class Collection extends Model
{
    protected $fillable = [
        'name',
        'picture',
        'description',
        'user_id'
    ];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function discounts()
    {
        return $this->belongsToMany(Discount::class, 'collection_discount');
    }
   /*
    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('collections.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeDescription(Builder $query, string $value): Builder
    {
        return $query->where('collections.description', 'LIKE', "%{$value}%", 'or');
    }




    public function delete(): bool|null
    {
        if ($this->items->isNotEmpty()) {
            // @todo Should be ConstraintException
            throw new Exception('This Collection still has associated Items.');
        }

        return parent::delete();
    }*/
}
