<?php
namespace App\Http\Controllers;

use App\Models\Cracker; // Ensure you have the correct namespace for your model

class CrackerController extends Controller
{
    public function index()
    {
        // Fetch all crackers from the Cracker model
        $crackers = Cracker::all();
    
        // Clean up unwanted whitespace for 'category_name' and 'cracker_name'
        $crackers->transform(function ($cracker) {
            $cracker->category_name = trim($cracker->category_name);
            $cracker->cracker_name = trim($cracker->cracker_name);
            return $cracker;
        });
    
        // Pass crackers to the view
        return view('crackers', ['crackers' => $crackers]);
    }
    
}
