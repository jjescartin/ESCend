<?php

namespace App\Service;

use App\Models\Board;

class BoardService
{
    public function getBoardData(int $boardId)
    {
        return Board::where('id', $boardId)->first();
    }

    public function storeBoard(array $field) 
    {
        $board = Board::create($field);
        
        return $board;
    }

    public function updateBoard(int $id, array $field) 
    {
        $board = Board::find($id);
        $board->update($field);
        return $board;
    }

    public function deleteBoard(int $id) 
    {
        return Board::destroy($id);
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