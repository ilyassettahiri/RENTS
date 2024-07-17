<?php

namespace App\Models;

use App\Enums\ItemStatus;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int                        $id
 * @property string|null                $name
 * @property \App\Enums\ItemStatus      $status
 * @property string|null                $excerpt
 * @property string|null                $description
 * @property string|null                $image
 * @property bool                       $is_on_homepage
 * @property \Illuminate\Support\Carbon $date_at
 *
 * @property \App\Models\User           $user
 * @property \App\Models\Category|null  $category
 * @property \App\Models\Collection|null  $collection
 * @property \App\Models\Tag[]          $tags
 */
class Item extends Model
{
    protected $fillable = [
        'name',
        'status',
        'excerpt',
        'description',
        'image',
        'is_on_homepage',
        'date_at',
    ];

    protected $casts = [
        'status'         => ItemStatus::class,
        'is_on_homepage' => 'boolean',
        'date_at' => 'date',
    ];

    protected static function booted()
    {
        parent::booted();

        static::creating(function (Item $item) {
            $item->user()->associate(auth()->user());
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function collection(): BelongsTo
    {
        return $this->belongsTo(Collection::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('items.name', 'LIKE', "%{$value}%", 'or');
    }

    public function scopeCollection(Builder $query, string $value): Builder
    {
        return $query->orWhereHas('collection', function ($query) use ($value) {
            $query->where('collections.name', 'LIKE', "%{$value}%");
        });
    }

    public function scopeCategory(Builder $query, string $value): Builder
    {
        return $query->orWhereHas('category', function ($query) use ($value) {
            $query->where('categories.name', 'LIKE', "%{$value}%");
        });
    }



    public function scopeTags(Builder $query, string $value): Builder
    {
        return $query->orWhereHas('tags', function ($query) use ($value) {
            $query->where('tags.name', 'LIKE', "%{$value}%");
        });
    }

    public function scopeDateAtBetween(Builder $query, array $values): Builder
    {
        return $query->whereBetween('items.date_at', $values);
    }

    public function scopeCreatedAtBetween(Builder $query, array $values): Builder
    {
        return $query->whereBetween('items.created_at', $values);
    }
}
