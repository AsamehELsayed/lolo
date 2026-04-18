<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class SetLocaleController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $locale = $request->input('locale');

        if (in_array($locale, ['en', 'ar'])) {
            Session::put('locale', $locale);
        }

        return redirect()->back();
    }
}
