<?php

namespace App\JsonApi\V2\Listings;

use App\Enums\ItemStatus;
use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class ListingRequest extends ResourceRequest
{
    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        if ($this->model()) {
            return [
                'category'        => ['sometimes', 'string'],
                'title'        => ['sometimes', 'string'],
                'picture'        => ['sometimes', 'string'],
                'price'        => ['sometimes', 'string'],
                'url'        => ['sometimes', 'string'],
                'status'        => ['sometimes', 'string'],
                'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
            ];
        }

        return [
            'category'        => ['required', 'string'],

            'title'        => ['required', 'string'],
            'picture'        => ['required', 'string'],
            'price'        => ['required', 'string'],
            'url'        => ['required', 'string'],
            'status'        => ['required', 'string'],

            'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
        ];
    }
}
