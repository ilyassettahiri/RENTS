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
class Category extends Model
{
    protected $fillable = [
        'name',
        'description',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }

    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('categories.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeDescription(Builder $query, string $value): Builder
    {
        return $query->where('categories.description', 'LIKE', "%{$value}%", 'or');
    }

    /**
     * @return bool|null
     * @throws \Exception
     */
    public function delete(): bool|null
    {
        if ($this->items->isNotEmpty()) {
            // @todo Should be ConstraintException
            throw new Exception('This Category still has associated Items.');
        }

        return parent::delete();
    }
}
