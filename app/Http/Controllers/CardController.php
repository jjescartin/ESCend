<?php

namespace App\Http\Controllers;

use App\Http\Requests\Board\CardRequest;
use App\Service\CardService;
use Illuminate\Http\Request;

class CardController extends Controller 
{
    public function show(int $id, CardService $cardService) {
        $card = $cardService->getCardDetails($id);

        return response()->json([
            'success'=>true,
            'data'=>$card
        ]);
    }

    public function move(Request $request, CardService $cardService) {
        try {
            if ($cardService->updateCardColumn($request->id, $request->newColId)){
                return response()->json(['sucess'=>true]);
            }
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Something went wrong. Please try again.',
                'error' => $th->getMessage(),
            ], 500);
        }
    }

    public function store(CardRequest $request, CardService $cardService)
    {
        $fields = [
            'column_id' => $request->column_id,
            'title' => $request->title,
            'description' => $request->description,
            'priority' => $request->priority,
            'due_date' =>  $request->due_date,
        ];

        $card = $cardService->createCard($fields);

        return response()->json([
            'success'=>true,
            'data'=>$card
        ]);
    }

    public function update(CardRequest $request, int $id, CardService $cardService) 
    {
        $cardService->deleteCard($id);

        return response()->json([
            'success' => true,
            'data' => null
        ]);
    }

    public function delete(CardRequest $request, CardService $cardService)
    {
        $card = "card";

        return response()->json([
            'success'=>true,
            'data'=>$card
        ]);
    }
}