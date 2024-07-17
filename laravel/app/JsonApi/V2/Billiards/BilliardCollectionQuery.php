<?php

namespace App\JsonApi\V2\Billiards;

use LaravelJsonApi\Laravel\Http\Requests\ResourceQuery;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class BilliardCollectionQuery extends ResourceQuery
{

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
            'filter.id'        => ['filled', 'string'],
            'filter.picture' => ['filled', 'string'],
            'filter.title' => ['filled', 'string'],
            'filter.description' => ['filled', 'string'],
            'filter.price' => ['filled', 'string'],
            'filter.url' => ['filled', 'string'],
            'filter.address' => ['filled', 'string'],
            'filter.city' => ['filled', 'string'],
            'filter.zip' => ['filled', 'string'],
            'filter.country' => ['filled', 'string'],
            'filter.startdate' => ['filled', 'date'],
            'filter.enddate' => ['filled', 'date'],

        ]);
    }
}
