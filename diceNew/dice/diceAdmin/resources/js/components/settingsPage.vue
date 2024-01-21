<template>
    <section id="settings">
        <div class="antiMinus">
            <div class="data_element">
                <h5>Банк антиминус dice</h5>
                <input type="text" inputmode="numeric" :value="diceAntiminus" data-input="dice" @input="checkInput">
            </div>
            <div class="data_element">
                <h5>Банк антиминус mines</h5>
                <input type="text" inputmode="numeric"  :value="minesAntiminus" data-input="mines" @input="checkInput">
            </div>
        </div>
        <div class="payment_system">
            <div class="data_element">
                <h5>free kassa</h5>
                <div class="switcher">
                    <button class="active">Вкл</button>
                    <button>Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>СПБ</h5>
                <div class="switcher">
                    <button class="active">Вкл</button>
                    <button>Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>Visa/mastercard</h5>
                <div class="switcher">
                    <button class="active">Вкл</button>
                    <button>Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>Umoney</h5>
                <div class="switcher">
                    <button class="active">Вкл</button>
                    <button>Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>Piastrix</h5>
                <div class="switcher">
                    <button class="active">Вкл</button>
                    <button>Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>fk wallet</h5>
                <div class="switcher">
                    <button class="active">Вкл</button>
                    <button>Выкл</button>
                </div>
            </div>
        </div>
        <div class="main_settings">
            <div class="data_element">
                <h5>пополнения</h5>
                <div class="switcher">
                    <button :class="(paymentActive)? 'active' : ''" @click="paymentActive = true">Вкл</button>
                    <button :class="(!paymentActive)? 'active' : ''" @click="paymentActive = false">Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>вывод</h5>
                <div class="switcher">
                    <button :class="(withdrawalActive)? 'active' : ''" @click="withdrawalActive = true">Вкл</button>
                    <button :class="(!withdrawalActive)? 'active' : ''" @click="withdrawalActive = false">Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>тех работы</h5>
                <div class="switcher">
                    <button :class="(technicalWorks)? 'active' : ''" @click="technicalWorks = true">Вкл</button>
                    <button :class="(!technicalWorks)? 'active' : ''" @click="technicalWorks = false">Выкл</button>
                </div>
            </div>
            <div class="button_accept">
                <button @click="updateSettings">Применить</button>
            </div>
            <div class="result" :class="(result === true) ? 'success': (result === false) ? 'fail':'' ">
                <p>{{ (result === true) ? 'Успешно применено': (result === false) ? 'Произошла ошибка':'' }}</p>
            </div>
        </div>
    </section>
</template>

<script>

import {fetchRequest} from "@/fetch.js";
export default {
    data() {
        return {
            diceAntiminus: null,
            minesAntiminus: null,
            paymentActive: null,
            withdrawalActive: null,
            technicalWorks: null,
            result: null
        }
    },
    mounted() {
        this.getSettings();
    },
    methods: {
        checkInput(input) {
            let value = input.target.value;
            let target = input.target.dataset.input;
            let correctValue = this.pattern(value);
            console.log(correctValue);
            if ( !correctValue) {
                (target == "dice") ? this.diceAntiminus = 0: this.minesAntiminus = 0;
                input.target.value = correctValue;
                return;
            } else {
                (target == "dice") ? this.diceAntiminus = correctValue: this.minesAntiminus = correctValue;
                input.target.value = correctValue;
                return;
            }

        },

        pattern(value) {
            let pattern =  /^\d+$/;
            let correctValue;
            let test = (pattern.test(value));
            if (test || value == '' ) {
                return value;
            } else {
                correctValue = value.slice(0, -1);
                if (!pattern.test(correctValue)) {
                    correctValue = this.pattern(correctValue);
                }
                return correctValue;
            }
        },

        async updateSettings() {
            let Url = "/admin/updateSettings";
            let data = {
                "diceAntiminus": this.diceAntiminus,
                "minesAntiminus": this.minesAntiminus,
                "paymentActive": this.paymentActive,
                "withdrawalActive": this.withdrawalActive,
                "technicalWorks": this.technicalWorks
            }
            let usersStats = await fetchRequest(Url, data, localStorage.getItem('token'));
            ( usersStats === '') ? this.result = true : this.result = false;
        },

        async getSettings() {
            let Url = "/admin/getSettings";
            let data = {}
            let settings = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.diceAntiminus = settings.diceAntiminus;
            this.minesAntiminus = settings.minesAntiminus;
            this.paymentActive = settings.paymentActive;
            this.withdrawalActive = settings.withdrawalActive;
            this.technicalWorks = settings.technicalWorks;
        }
    }
}
</script>
