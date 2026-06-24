<?php

namespace App\Http\Controllers;

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
}