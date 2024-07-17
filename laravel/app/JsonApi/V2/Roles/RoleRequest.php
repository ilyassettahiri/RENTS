<?php

namespace App\JsonApi\V2\Roles;

use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;

class RoleRequest extends ResourceRequest
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
                'name' => ['sometimes', 'string'],
            ];
        }

        return [
            'name' => ['required', 'string'],
        ];
    }
}
