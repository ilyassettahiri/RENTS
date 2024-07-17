<?php

namespace App\JsonApi\V2\Tags;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;

class TagRequest extends ResourceRequest
{
    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        /** @var \App\Models\Tag|null $model */
        if ($model = $this->model()) {
            return [
                'name'  => [
                    Rule::unique('tags')->ignore($model->id),
                    'sometimes',
                    'string',
                ],
                'color' => 'sometimes|string',
            ];
        }

        return [
            'name'  => ['required', 'string', 'unique:tags,name'],
            'color' => ['required', 'string'],
        ];
    }
}
