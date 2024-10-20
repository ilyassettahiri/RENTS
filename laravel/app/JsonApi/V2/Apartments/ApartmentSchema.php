<?php

namespace App\JsonApi\V2\Apartments;

use App\Models\Apartment;
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

class ApartmentSchema extends Schema
{



    public static string $model = Apartment::class;

    protected $defaultSort = '-created_at';



    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('picture')->sortable(),
            Str::make('title')->sortable(),
            Str::make('description')->sortable(),
            Str::make('price')->sortable(),
            Str::make('address')->sortable(),
            Str::make('city')->sortable(),
            Str::make('country')->sortable(),
            Str::make('zip')->sortable(),



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



    public function filters(): array
    {
        return [
            WhereIdIn::make($this),

        ];
    }




    public function pagination(): ?Paginator
    {
        return PagePagination::make();
    }
}
