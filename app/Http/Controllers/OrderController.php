<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function submitOrder(Request $request)
    {
        // Validate the request data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'totalQuantity' => 'required|integer',
            'totalPrice' => 'required|numeric',
            'packingCharges' => 'required|numeric',
            'totalAmount' => 'required|numeric',
        ]);

        try {
            // Create and save the order
            Order::create($validated);

            // Return a success response
            return response()->json(['message' => 'Order placed successfully!'], 200);
        } catch (\Exception $e) {
            // Return error response if saving fails
            return response()->json(['message' => 'Failed to place order.'], 500);
        }
    }
}
