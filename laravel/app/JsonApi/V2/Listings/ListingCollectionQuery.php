<?php

namespace App\JsonApi\V2\Listings;

use LaravelJsonApi\Laravel\Http\Requests\ResourceQuery;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class ListingCollectionQuery extends ResourceQuery
{
    /**
     * Get the validation rules that apply to the request query parameters.
     *
     * @return array
     */
    public function rules(): array
    {
        $defaults = [
            'fields'    => [
                'nullable',
                'array',
                JsonApiRule::fieldSets(),
            ],
            'filter'    => [
                'nullable',
                'array',
                JsonApiRule::filter(),
            ],
            'include'   => [
                'nullable',
                'string',
                JsonApiRule::includePaths(),
            ],
            'page'      => [
                'nullable',
                'array',
                JsonApiRule::page(),
            ],
            'sort'      => [
                'nullable',
                'string',
                JsonApiRule::sort(),
            ],
            'withCount' => [
                'nullable',
                'string',
                JsonApiRule::countable(),
            ],
        ];

        return array_merge($defaults, [
            'filter.category'        => ['filled', 'string'],
            'filter.title'        => ['filled', 'string'],
            'filter.picture'        => ['filled', 'string'],
            'filter.price'        => ['filled', 'string'],
            'filter.url'        => ['filled', 'string'],
            'filter.status'        => ['filled', 'string'],

        ]);
    }
}
