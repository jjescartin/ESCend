<?php

namespace App\Http\Controllers;

use App\Models\Board;
use App\Service\BoardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller 
{
    public function show(int $id, BoardService $boardService) 
    {
        $board = $boardService->getBoards($id);

        if (!$board) {
            return response()->json([
                'success' => false,
                'message' => 'Board not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $board
        ]);
    }

    public function getBoardColumns (int $id, BoardService $boardService) {
        $columns = $boardService->getBoardColumns($id);

        return response()->json([
            'success' => true,
            'data' => $columns
        ]);
    }
}