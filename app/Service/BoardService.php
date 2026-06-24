<?php

namespace App\Service;

use App\Models\Board;

class BoardService
{
    public function getBoards(int $UserId)
    {
        return Board::where('user_id', $UserId)->get();
    }

    public function getBoardColumns(int $id)
    {
        return Board::find($id)
            ->columns()
            ->with(['cards' => function($query) {
                $query->select('id', 'column_id', 'code', 'title')
                    ->with(['tags', 'assignees']);
            }])
            ->get();
    }
}