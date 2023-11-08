<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MainController extends Controller
{
    public function dice() {
        return view('dice');
    }
    
    public function payment() {
        return view('payment');
    }
    
    public function referal() {
        return view('referal');
    }
}
