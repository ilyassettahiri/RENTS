<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class LaptopPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view laptops');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view laptops');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create laptops');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit laptops');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete laptops');
    }
}
