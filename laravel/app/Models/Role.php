<?php

namespace App\Models;

use Exception;
use Illuminate\Database\Eloquent\Builder;

/**
 * @property \Illuminate\Database\Eloquent\Collection|\App\Models\User[] $users
 */
class Role extends \Spatie\Permission\Models\Role
{
    public function scopeName(Builder $query, string $value): Builder
    {
        return $query->where('name', 'LIKE', "%{$value}%", 'or');
    }

    /**
     * @return bool|null
     * @throws \Exception
     */
    public function delete(): bool|null
    {
        if ($this->users->isNotEmpty()) {
            // @todo Should be ConstraintException
            throw new Exception('This Role still has associated Users.');
        }

        return parent::delete();
    }
}
