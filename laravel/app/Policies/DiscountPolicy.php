<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class DiscountPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): Response|bool
    {
        return $user->can('view discounts');
    }

    public function view(User $user): Response|bool
    {
        return $user->can('view discounts');
    }

    public function create(User $user): Response|bool
    {
        return $user->can('create discounts');
    }

    public function update(User $user): Response|bool
    {
        return $user->can('edit discounts');
    }

    public function delete(User $user): Response|bool
    {
        return $user->can('delete discounts');
    }
}
