<?php

namespace App\JsonApi\Sorting;

use LaravelJsonApi\Eloquent\Contracts\SortField;

class CollectionName implements SortField
{
    /**
     * @var string
     */
    private string $name;

    /**
     * Create a new sort field.
     *
     * @param string      $name
     * @param string|null $column
     *
     * @return CollectionName
     */
    public static function make(string $name): self
    {
        return new static($name);
    }

    /**
     * CollectionName constructor.
     *
     * @param string $name
     */
    public function __construct(string $name)
    {
        $this->name = $name;
    }

    /**
     * Get the name of the sort field.
     *
     * @return string
     */
    public function sortField(): string
    {
        return $this->name;
    }

    /**
     * Apply the sort order to the query.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string                                $direction
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function sort($query, string $direction = 'asc')
    {
        return $query
            ->leftJoin('collection', 'collections.id', '=', 'items.collection_id')
            ->select('items.*')
            ->orderBy('collections.name', $direction)
            ->orderBy('items.id', $direction);
    }
}
