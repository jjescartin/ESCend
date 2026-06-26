<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterUser;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
use App\Http\Controllers\ColumnController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::post('/register', RegisterUser::class)->name('register.user');
// Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');

Route::middleware('auth')->group(function() {

    // profile endpoints
    Route::get('/profile', [ProfileController::class, 'index'])->name('show.profile');
    Route::get('/boards', [ProfileController::class, 'getUserBoardList']);

    // board endpoints
    // Route::get('/boards/{id}', [BoardController::class, 'show']);
    // Route::post('boards/create',[BoardController::class, 'store']);
    // Route::patch('boards/update/{id}',[BoardController::class, 'update']);
    // Route::post('boards/delete/{id}',[BoardController::class, 'delete']);
    // Route::get('/boards/{id}/cols', [BoardController::class, 'getBoardColumns'])->name('get.board.columns');


    Route::prefix('boards')->group(function() {
        Route::get('/{id}', [BoardController::class, 'show']);
        Route::post('/',[BoardController::class, 'store']);
        Route::put('/{id}',[BoardController::class, 'update']);
        Route::delete('/{id}',[BoardController::class, 'destroy']);
        Route::get('/{id}/cols', [BoardController::class, 'getBoardColumns']);

        Route::prefix('/{boardId}/columns')->group(function(){
            Route::post('/', [ColumnController::class, 'store']);
            Route::put('/{columnId}',[ColumnController::class, 'update']);
            Route::delete('/{columnId}',[ColumnController::class, 'destroy']);
        });
    });

    // card endpoints
    Route::get('/card/{id}', [CardController::class, 'show'])->name('get.card.details');
    Route::patch('/card/{id}/move', [CardController::class, 'move']);
});