<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductMaterialController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('register', [UserController::class, 'register']);
Route::post('login', [UserController::class, 'login']);

Route::get('listproduct', [ProductController::class, 'list']);
Route::post('addproduct', [ProductController::class, 'addProduct']);
Route::put('deleteproduct/{id}', [ProductController::class, 'deleteProduct']);
Route::get('product/{id}', [ProductController::class, 'getProduct']);
Route::put('updateproduct/{id}', [ProductController::class, 'updateProduct']);
Route::get('searchproduct/{key}', [ProductController::class, 'searchProduct']);

Route::get('listproductmat', [ProductMaterialController::class, 'listProductMat']);
Route::post('addproductmat', [ProductMaterialController::class, 'addProductMat']);
Route::put('deleteproductmat/{id}', [ProductMaterialController::class, 'deleteProductMat']);
Route::get('productmat/{id}', [ProductMaterialController::class, 'getProductMat']);
Route::put('updateproductmat/{id}', [ProductMaterialController::class, 'updateProductMat']);
