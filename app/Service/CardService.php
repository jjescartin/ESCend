<?php

namespace App\Service;

use App\Models\Card;

class CardService
{
    public function getCardDetails(int $id) {
        return Card::where('id', $id)
            ->with(['comments.user', 'tags', 'assignees'])
            ->first();
    }

    public function updateCardColumn(int $id, int $newColId) {
        return Card::where('id', $id)->update(['column_id' => $newColId]);
    }
}