@extends('layout')

@section('main_content')


<section class="payment_method">
    <h2 class="payment_method_title">Выберите способ оплаты</h2>
    <div class="notice">
        <p class="notice_message">Появились проблемы? Пишите в <a href="">тех. поддержку</a></p>
        <button class="notice_close"></button>
    </div>
    <div class="payment_method_bank">
        <label class="active">free kassa
            <input type="radio" name="bank" checked>
        </label>
        <label>spb
            <input type="radio" name="bank">
        </label>
        <label>visa/huiza
            <input type="radio" name="bank">
        </label>
        <label>U-money
            <input type="radio" name="bank">
        </label>
        <label>piastrix
            <input type="radio" name="bank">
        </label>
        <label>fk wallet
            <input type="radio" name="bank">
        </label>
    </div>
    <p class="payment_method_paydesc">Введите сумму</p>
    <div class="payment_method_amount">
        <input type="text" name="" placeholder="100">
        <button>100</button>
        <button>500</button>
        <button>1000</button>
        <button>2000</button>
    </div>
    <button class="payment_method_send_button">Пополнить</button>
</section>
<section class="paymentStory">
    <h2 class="paymentStory_title">История пополнений</h2>
    <div class="paymentStory_table">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Дата</th>
                    <th>Сумма</th>
                    <th>система</th>
                    <th>статус</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Гарсон</td>
                    <td>13.10.23 - 21:40</td>
                    <td>10000</td>
                    <td>QIWI</td>
                    <td class="paid">Оплачено</td>
                </tr>
                <tr>
                    <td>Ботан</td>
                    <td>4.20</td>
                    <td>10.0</td>
                    <td>10.0</td>
                    <td class="expectation">Ожидание</td>
                </tr>
                <tr>
                    <td>X-AE-12</td>
                    <td>4.20</td>
                    <td>10.0</td>
                    <td>10.0</td>
                    <td class="canceled">Отмена</td>
                </tr>
                <tr>
                    <td>xsdsdg7</td>
                    <td>4.20</td>
                    <td>10.0</td>
                    <td>10.0</td>
                    <td class="paid">Оплачено</td>
                </tr>
                <tr>
                    <td>suetolog..</td>
                    <td>4.20</td>
                    <td>10.0</td>
                    <td>10.0</td>
                    <td class="paid">Оплачено</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

@endsection

@section('scripts')
    <script src="/js/replenish.js"></script>
@endsection