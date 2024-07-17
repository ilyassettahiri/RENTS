<?php

namespace App\JsonApi\Sorting;

use Illuminate\Support\Facades\DB;
use LaravelJsonApi\Eloquent\Contracts\SortField;

class TagsName implements SortField
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
     * @return TagsName
     */
    public static function make(string $name): self
    {
        return new static($name);
    }

    /**
     * TagsName constructor.
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
            ->leftJoin('item_tag', 'item_id', '=', 'items.id')
            ->leftJoin('tags', 'item_tag.tag_id', '=', 'tags.id')
            ->groupBy('items.id')
            ->select('items.*', DB::raw('group_concat(tags.name) as ctags'))
            ->orderBy('ctags', $direction)->orderBy('items.id', $direction);
    }
}
