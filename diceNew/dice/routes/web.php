<?php

use App\Http\Controllers\MainController;
use App\Http\Controllers\WebhookController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [MainController::class, 'dice']);

Route::get('/payment', [MainController::class,'payment']);

Route::get('/referal', [MainController::class, 'referal']);

Route::post('/webhook', [WebhookController::class, 'handle']);


