<?php

namespace App\Http\Controllers;

use App\Http\Requests\Board\BoardFormRequest;
use App\Models\Board;
use App\Service\BoardService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BoardController extends Controller 
{
    public function show(int $id, BoardService $boardService) 
    {
        $board = $boardService->getBoardData($id);

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

    public function store(BoardFormRequest $request, BoardService $boardService)
    {
        // data mapping
        $field = [
            'user_id' => Auth::user()->id,
            'name' => $request->name,
            'description' => $request->description,
            'end_date' => $request->end_date
        ];

        $board = $boardService->storeBoard($field);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $board->id,
                'boardName' => $board->name
            ]
        ]);
    }

    public function update(int $id, BoardFormRequest $request, BoardService $boardService) 
    {
        $field = [
            'name' => $request->name,
            'description' => $request->description,
            'end_date' => $request->end_date
        ];

        $board = $boardService->updateBoard($id, $field);

        return response()->json([
            'success' => true,
            'data'=> $board
        ]); 
    }

    public function destroy(int $id, BoardService $boardService) 
    {
        $deleted = $boardService->deleteBoard($id);

        if (!$deleted) {
            return response()->json([
                'success' => false,
                'message' => 'Board not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
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