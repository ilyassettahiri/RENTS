<?php

namespace App\JsonApi\V2\Reviews;

use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;

class ReviewRequest extends ResourceRequest
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
                'name'        => ['sometimes', 'string'],
                'description' => ['sometimes', 'string'],
            ];
        }

        return [
            'name'        => ['required', 'string'],
            'description' => ['required', 'string'],
        ];
    }
}
