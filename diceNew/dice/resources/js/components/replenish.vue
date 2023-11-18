<template>
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
            <input type="text" name="" placeholder="100" @input="amountInput">
            <button @click="amountButton(100)">100</button>
            <button @click="amountButton(500)">500</button>
            <button @click="amountButton(1000)">1000</button>
            <button @click="amountButton(2000)">2000</button>
        </div>
        <button class="payment_method_send_button" @click="">Пополнить</button>
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
                    <td>13.10.23<br>
                        21:40</td>
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
</template>

<script>
    export default {
        data() {
            return {
                amount: 0,
            }
        },
        methods: {
            inputLock (value) {
                let pattern =  /^\d+([.,]\d{0,2})?$/g;
                let correctValue;
                value = value.replace(",", ".");
                let test = (pattern.test(value));
                if (test || value == '') {
                    return value;
                } else {
                    correctValue = value.slice(0, -1);
                    if (!pattern.test(correctValue)) {
                        correctValue = this.inputLock(correctValue);
                    }
                    return correctValue;

                }
            },

            amountInput(input) {
                let value = input.target.value;
                let correctValue = this.inputLock(value);
                let lastChar = correctValue[correctValue.length - 1];
                if (!(lastChar == ".") || correctValue == ""){
                    this.amount = correctValue;
                }
                input.target.value = correctValue;
            },

            amountButton(value) {
                this.amount = value;
                document.querySelector('.payment_method_amount input').value = value;
            },

            async sendReplenish(e) {
                e.target.disabled = true;
                let Url = '/payment/createPayment';
                let data = {
                    amount: this.amount,
                    userId: localStorage.getItem('id')
                };
                const ReplenishData = await fetchRequest(Url, data, localStorage.getItem('token'));
                (!ReplenishData) ? window.open('https://pay.freekassa.ru/form/123/bd4161db429848651499aabcb1d89330') :
                    console.log(ReplenishData);
                e.target.disabled = false;
            }
        }
    }
</script>

