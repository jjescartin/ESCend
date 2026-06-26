<?php

namespace App\Service;

use App\Models\Column;

class ColumnService
{
    public function createColumn(array $fields) {
        return Column::create($fields);
    }

    public function updateColumn(int $boardId, int $colId, array $fields) 
    {
        $column = $this->checkColumnOwnerShip($boardId, $colId);
        if(!$column) return null; // return if col does not exist

        $column->update($fields);

        return $column;
    }

    public function deleteColumn(int $boardId, int $colId) 
    {
        $column = $this->checkColumnOwnership($boardId, $colId);
        if (!$column) return null;

        return $column->delete();
    }

    // checks and returns the column object if existing
    private function checkColumnOwnerShip(int $boardId, int $colId) 
    {
        return Column::where('id', $colId)->where('board_id', $boardId)->first();
    }
}