<?php

namespace App\JsonApi\V2\Magasins;

use App\Enums\ItemStatus;
use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class MagasinRequest extends ResourceRequest
{


    public function rules(): array
    {
        if ($this->model()) {
            return [

                'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
            ];
        }

        return [

            'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
        ];
    }
}
