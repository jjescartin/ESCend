<?php

namespace App\Http\Controllers;

use App\Http\Requests\Board\ColumnRequest;
use App\Service\ColumnService;
use App\Models\Column;

class ColumnController extends controller 
{
    public function store (int $boardId, ColumnRequest $request, ColumnService $columnService) 
    {
        $fields = [
            'board_id' => $boardId,
            'title' => $request->title,
            'color' => $request->color,
            'order' => Column::where('board_id', $boardId)->count() + 1
        ];
        
        $col = $columnService->createColumn($fields);

        return response()->json([
            'success' => true,
            'data' => $col
        ]);
    }

    public function update (int $boardId, int $colId, ColumnRequest $request, ColumnService $columnService) 
    {
        $fields = [
            'title' => $request->title,
            'color' => $request->color
        ];

        $col = $columnService->updateColumn($boardId, $colId, $fields);
    
        return response()->json([
            'success' => true,
            'data' => $col
        ]);
    }

    public function destroy (int $boardID, int $colId, ColumnService $columnService) 
    {
        $col = $columnService->deleteColumn($boardID, $colId);

        return response()->json([
            'success' => true
        ]);
    }
}