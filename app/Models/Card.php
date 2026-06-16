<?php

namespace App\Models;
use App\Models\Tag;
use App\Models\User;
use App\Models\Column;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Card extends Model 
{
    protected $fillable = [
        'column_id',
        'code',
        'title',
        'description',
        'order',
        'priority',
        'due_date',
    ];

    // Relationships
    public function column (): BelongsTo
    {
        return $this->belongsTo(Column::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function assignees(): BelongsToMany
    {
        return $this->belongsToMany(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }
}