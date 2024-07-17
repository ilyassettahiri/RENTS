<?php

namespace App\JsonApi\V2\Boxings;

use LaravelJsonApi\Laravel\Http\Requests\ResourceQuery;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class BoxingCollectionQuery extends ResourceQuery
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

        ]);
    }
}
