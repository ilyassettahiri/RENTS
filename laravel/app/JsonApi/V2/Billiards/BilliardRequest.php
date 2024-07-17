<?php

namespace App\JsonApi\V2\Billiards;

use App\Enums\ItemStatus;
use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class BilliardRequest extends ResourceRequest
{


    public function rules(): array
    {
        if ($this->model()) {
            return [

                'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
                'picture' => ['sometimes', 'string'],
                'title' => ['sometimes', 'string'],
                'description' => ['sometimes', 'string'],
                'price' => ['sometimes', 'string'],
                'address' => ['sometimes', 'string'],
                'city' => ['sometimes', 'string'],
                'country' => ['sometimes', 'string'],
                'zip' => ['sometimes', 'string'],
                'url' => ['sometimes', 'string'],
                'startdate' => ['sometimes', 'date'],
                'enddate' => ['sometimes', 'date'],
            ];
        }

        return [

            'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
            'picture' => ['sometimes', 'string'],
            'title' => ['sometimes', 'string'],
            'description' => ['sometimes', 'string'],
            'price' => ['sometimes', 'string'],
            'address' => ['sometimes', 'string'],
            'city' => ['sometimes', 'string'],
            'country' => ['sometimes', 'string'],
            'zip' => ['sometimes', 'string'],
            'url' => ['sometimes', 'string'],
            'startdate' => ['sometimes', 'date'],
            'enddate' => ['sometimes', 'date'],
        ];
    }
}
