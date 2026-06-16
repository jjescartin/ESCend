<?php

namespace App\Models;

use App\Models\Board;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'username',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
    ];

    // Relationship
    public function boards(): HasMany
    {
        return $this->hasMany(Board::class);

    }

    public function memberBoard(): BelongsToMany
    {
        return $this->belongsToMany(Board::class);
    }

    public function assignedCards(): BelongsToMany
    {
        return $this->belongsToMany(Card::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function memberBoards(): BelongsToMany
    {
        return $this->belongsToMany(Board::class, 'board_members');
    }
}
