<?php

namespace App\JsonApi\V2\Items;

use LaravelJsonApi\Laravel\Http\Requests\ResourceQuery;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class ItemCollectionQuery extends ResourceQuery
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
            'filter.name'           => ['filled', 'string'],
            'filter.status'         => ['filled', 'string'],
            'filter.is_on_homepage' => ['filled', 'boolean'],
            'filter.date_at'        => ['array', 'min:2'],
            'filter.date_at.*'      => ['filled', 'date_format:Y-m-d'],
            'filter.created_at'     => ['array', 'min:2'],
            'filter.created_at.*'   => ['filled', 'date_format:Y-m-d H:i:s'],
        ]);
    }
}
