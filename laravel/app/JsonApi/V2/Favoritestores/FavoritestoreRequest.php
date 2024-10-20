<?php

namespace App\JsonApi\V2\Favoritestores;

use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;

class FavoritestoreRequest extends ResourceRequest
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
