<?php

namespace App\JsonApi\V2\Items;

use App\JsonApi\Sorting\CategoryName;
use App\JsonApi\Sorting\TagsName;
use App\Models\Item;
use Carbon\Carbon;
use LaravelJsonApi\Core\Resources\Relation;
use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\Boolean;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsTo;
use LaravelJsonApi\Eloquent\Fields\Relations\BelongsToMany;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Filters\Scope;
use LaravelJsonApi\Eloquent\Filters\Where;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;

class ItemSchema extends Schema
{
    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = Item::class;

    protected $defaultSort = '-created_at';

    /**
     * Get the resource fields.
     *
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('name')->sortable(),
            Str::make('excerpt'),
            Str::make('description'),
            Str::make('status'),
            Str::make('image'),
            Boolean::make('is_on_homepage'),
            BelongsTo::make('user')->serializeUsing(static fn (Relation $relation) => $relation->withoutSelfLink()),
            BelongsTo::make('category'),
            BelongsToMany::make('tags'),
            DateTime::make('date_at')
                ->serializeUsing(static fn (?Carbon $value) => $value?->format('Y-m-d')),
            DateTime::make('created_at')
                ->serializeUsing(static fn (?Carbon $value) => $value?->format('Y-m-d H:i:s'))
                ->sortable()
                ->readOnly(),
            DateTime::make('updated_at')
                ->serializeUsing(static fn (?Carbon $value) => $value?->format('Y-m-d H:i:s'))
                ->readOnly(),
        ];
    }

    /**
     * Get the resource filters.
     *
     * @return array
     */
    public function filters(): array
    {
        return [
            WhereIdIn::make($this),
            Where::make('status'),
            Where::make('is_on_homepage'),
            Scope::make('name'),
            Scope::make('category'),
            Scope::make('tags'),
            Scope::make('date_at', 'dateAtBetween'),
            Scope::make('created_at', 'createdAtBetween'),
        ];
    }

    public function sortables(): iterable
    {
        return [
            CategoryName::make('category.name'),
            TagsName::make('tags.name'),
        ];
    }

    /**
     * Get the resource paginator.
     *
     * @return Paginator|null
     */
    public function pagination(): ?Paginator
    {
        return PagePagination::make();
    }
}
