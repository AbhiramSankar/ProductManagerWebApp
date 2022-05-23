<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ProductMaterial;

class ProductMaterialController extends Controller
{
    function addProductMat(Request $req){
        $productmat= new ProductMaterial;
        $productmat-> product_id=$req->input('product_id');
        $productmat-> description=$req->input('description');
        $productmat-> quantity=$req->input('quantity');
        $productmat-> rate=$req->input('rate');
        $productmat-> amount=$req->input('amount');
        $productmat->save();
        return $productmat; 
    }

    function listProductMat(){
        return ProductMaterial::all();
    }

    function getProductMat($id){
        return ProductMaterial::find($id);
    }

    function updateProductMat(Request $req, $id){
        $productmat = ProductMaterial::find($id);
        $productmat-> revision=$req->input('revision');
        $productmat-> description=$req->input('description');
        $productmat-> quantity=$req->input('quantity');
        $productmat-> rate=$req->input('rate');
        $productmat-> amount=$req->input('amount');
        $productmat-> modified_by=$req->input('modified_by');
        $productmat->save();
        return $productmat;
    }

    function deleteProductMat(Request $req, $id){
        $productmat = ProductMaterial::find($id);
        $productmat-> deleted=$req->input('deleted');
        $productmat-> deleted_at=$req->input('deleted_at');
        $productmat-> modified_by=$req->input('modified_by');
        $productmat->save();
        return $productmat;
    }

}

