<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;


class ProductController extends Controller
{
    function addProduct(Request $req){
        $product= new Product;
        
        $product-> name=$req->input('name');
        $product-> description=$req->input('description');
        $product-> quantity=$req->input('quantity');
        $product-> waste_percentage=$req->input('waste_percentage');
        $product-> labour_percentage=$req->input('labour_percentage');
        $product-> equipment_cost=$req->input('equipment_cost');
        $product-> other_percentage=$req->input('other_percentage');
        $product-> margin_percentage=$req->input('margin_percentage');
        $product->save();
        return $product;
    }

    function list(){
        return Product::all();
    }

    function getProduct($id){
        return Product::find($id);
    }

    function updateProduct(Request $req, $id){
        $product = Product::find($id);
        $product-> revision=$req->input('revision');
        $product-> name=$req->input('name');
        $product-> description=$req->input('description');
        $product-> quantity=$req->input('quantity');
        $product-> waste_percentage=$req->input('waste_percentage');
        $product-> labour_percentage=$req->input('labour_percentage');
        $product-> equipment_cost=$req->input('equipment_cost');
        $product-> other_percentage=$req->input('other_percentage');
        $product-> margin_percentage=$req->input('margin_percentage');
        $product-> margin_percentage=$req->input('margin_percentage');
        $product-> modified_by=$req->input('modified_by');
        $product->save();
        return $product;
    }

    function deleteProduct(Request $req, $id){
        $product = Product::find($id);
        $product-> deleted=$req->input('deleted');
        $product-> deleted_at=$req->input('deleted_at');
        $product-> modified_by=$req->input('modified_by');
        $product->save();
        return $product;
    }


    function searchProduct($key){
        return Product::where('name', 'Like', "%$key%")->get();
    }
}