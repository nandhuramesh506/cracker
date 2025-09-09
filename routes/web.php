<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CrackerController;
use App\Http\Controllers\OrderController;

Route::get('/', function () {
    return view('welcome');
});
Route::get('/crackers', function () {
    return view('crackers');
});
Route::get('/onlinCrackers', function () {
    return view('onlinCrackers');
});

Route::resource('crackers', CrackerController::class);


Route::post('/submit-order', [OrderController::class, 'submitOrder']);
