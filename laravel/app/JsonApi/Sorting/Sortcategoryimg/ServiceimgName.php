<?php

namespace App\JsonApi\Sorting;

use LaravelJsonApi\Eloquent\Contracts\SortField;

class ServiceimgName implements SortField
{



    public static function make(string $name): self
    {
        return new static($name);
    }





    public function __construct(string $name)
    {
        $this->name = $name;
    }




    public function sortField(): string
    {
        return $this->name;
    }




    public function sort($query, string $direction = 'asc')
    {
        return $query

            ->orderBy('servicesimgs.id', $direction);

    }
}