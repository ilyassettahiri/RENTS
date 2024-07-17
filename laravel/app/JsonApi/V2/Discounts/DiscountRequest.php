<?php

namespace App\JsonApi\V2\Discounts;

use App\Enums\ItemStatus;
use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class DiscountRequest extends ResourceRequest
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
                'code'        => ['sometimes', 'string'],
                'discountvalue' => ['sometimes', 'string'],
                'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
            ];
        }

        return [
            'code'        => ['required', 'string'],
            'discountvalue' => ['required', 'string'],
            'user'           => ['sometimes', 'nullable', JsonApiRule::toOne()],
        ];
    }
}
