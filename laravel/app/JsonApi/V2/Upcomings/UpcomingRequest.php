<?php

namespace App\JsonApi\V2\Upcomings;

use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;

class UpcomingRequest extends ResourceRequest
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
                'email' => ['sometimes', 'string'],
            ];
        }

        return [
            'name'        => ['required', 'string'],
            'email' => ['required', 'string'],
        ];
    }
}
