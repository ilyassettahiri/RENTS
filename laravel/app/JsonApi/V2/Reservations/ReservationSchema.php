<?php

namespace App\JsonApi\V2\Reservations;

use App\Models\Reservation;
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

class ReservationSchema extends Schema
{
    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = Reservation::class;

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
            Str::make('email')->sortable(),
            Str::make('reservationstart')->sortable(),
            Str::make('reservationsend')->sortable(),
            Str::make('checkout_id')->sortable(),
            Str::make('url')->sortable(),
            Str::make('billiard_id')->sortable(),
            Str::make('status')->sortable(),
            Str::make('category')->sortable(),

            Str::make('listings_thumb')->sortable(),
            Str::make('listings_title')->sortable(),
            Str::make('listings_price')->sortable(),
            Str::make('listings_description')->sortable(),



            BelongsTo::make('user')->serializeUsing(static fn (Relation $relation) => $relation->withoutSelfLink()),

            DateTime::make('created_at')
                ->serializeUsing(static fn(?Carbon $value) => $value?->format('Y-m-d H:i:s'))
                ->sortable()
                ->readOnly(),
            DateTime::make('updated_at')
                ->serializeUsing(static fn(?Carbon $value) => $value?->format('Y-m-d H:i:s'))
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
            Scope::make('name'),
            Scope::make('description'),
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
