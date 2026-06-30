<?php

namespace App\Service;

use App\Models\Card;
use App\Models\Column;

class CardService
{
    public function getCardDetails(int $id) {
        return Card::where('id', $id)
            ->with(['comments.user', 'tags', 'assignees'])
            ->first();
    }

    public function createCard(array $fields) {
        $fields['code'] = $this->generateCardCode($fields['column_id']);
        return Card::create($fields);
    }

    public function updateCard(int $id, array $field) {
        $card = Card::findOrFail($id);
        $card->update($field);

        return $card;
    }

    public function updateCardColumn(int $id, int $newColId) {
        return Card::where('id', $id)->update(['column_id' => $newColId]);
    }
    
    public function deleteCard(int $id) {
        $card = Card::findOrFail($id);
        $card->delete();
    }

    private function generateCardCode(int $columnId) {

        //check which board this column is from.
        $board = Column::find($columnId)->board;

        // get the latest max code
        $maxCode = Card::whereHas('column', function($q) use ($board) {
            $q->where('board_id', $board->id);
        })->max('code');

        // append 1
        $next = $maxCode ? (int) substr($maxCode, strrpos($maxCode, '-') + 1) + 1 : 1;

        // format code.
        $prefix = strtoupper(substr($board->name, 0, 3));
        return $prefix . '-' . str_pad($next, 3, '0', STR_PAD_LEFT);    
    }
}