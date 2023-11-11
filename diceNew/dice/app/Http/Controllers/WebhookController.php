<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class WebhookController extends Controller
{
    public function handle(Request $request)
    {
        $freeKassaUrl = ['168.119.157.136', '168.119.60.227', '138.201.88.124', '178.154.197.79', '127.0.0.1'];
        $currentUrl = $request->ip();
        if (in_array($currentUrl, $freeKassaUrl)) {
            return $this->freeKassa($request);
        }
        die("hacking attempt!");

    }

    private function freeKassa($request) {
        $paymentData = [ 'shopId' => $request->input('MERCHAN_ID'),
                             'amount' => $request->input('AMOUNT'),
                             'freKassaOrderId' => $request->input('Intid'),
                             'paymentId' => $request->input('MERCHANT_ORDER_ID')
                        ];
        return $this->SendData($paymentData, '/paymentCallBack/handle');
    }

    private function sendData($data, $link) {
        $url = 'https://a22089-da4d.s.d-f.pw:80/api'.$link;

        $json_data = json_encode($data);

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_POST, 1);

        curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);

        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($ch);

        curl_close($ch);

        if ($response !== false) {
            echo "Ответ от сервера: " . $response;
        } else {
            return "Ошибка при выполнении запроса";
        }
//        $response = Http::post($url, $data);
//
//        if ($response->successful()) {
//            return $response->json();
//        } else {
//            return response()->json(['message'=> 'no-good']);
//        }
    }
}
