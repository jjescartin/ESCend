<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterUser;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\CardController;
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
    Route::get('/boards', [ProfileController::class, 'getBoardList'])->name('get.profile.board.list');

    // board endpoints
    Route::get('/boards/{id}', [BoardController::class, 'show'])->name('get.board.data');
    Route::get('/boards/{id}/cols', [BoardController::class, 'getBoardColumns'])->name('get.board.columns');


    // card endpoints
    Route::get('/card/{id}', [CardController::class, 'show'])->name('get.card.details');
    Route::patch('/card/{id}/move', [CardController::class, 'move']);
});