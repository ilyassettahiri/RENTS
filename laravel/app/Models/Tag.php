<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int                                                         $id
 * @property string|null                                                 $name
 * @property string|null                                                 $color
 *
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\Item[] $items
 */
class Tag extends Model
{
    protected $fillable = [
        'name',
        'color',
    ];

    public function items(): BelongsToMany
    {
        return $this->belongsToMany(Item::class);
    }

    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('tags.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeColor(Builder $query, string $value): Builder
    {
        return $query->where('tags.color', 'LIKE', "%{$value}%", 'or');
    }

    /**
     * @return bool|null
     * @throws \Exception
     */
    public function delete(): bool|null
    {
        if ($this->items->isNotEmpty()) {
            // @todo Should be ConstraintException
            throw new Exception('This Tag still has associated Items.');
        }

        return parent::delete();
    }
}
