<template>
    <section id="settings">
        <div class="antiMinus">
            <div class="data_element">
                <h5>Банк антиминус dice</h5>
                <input type="text" :value="diceAntiminus">
            </div>
            <div class="data_element">
                <h5>Банк антиминус mines</h5>
                <input type="text"  :value="minesAntiminus">
            </div>
            <div class="button_accept">
                <button @click="">Применить</button>
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
            <div class="button_accept">
                <button @click="">Применить</button>
            </div>
        </div>
        <div class="main_settings">
            <div class="data_element">
                <h5>пополнения</h5>
                <div class="switcher">
                    <button :class="(paymentActive)? 'active' : ''">Вкл</button>
                    <button :class="(!paymentActive)? 'active' : ''">Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>вывод</h5>
                <div class="switcher">
                    <button :class="(withdrawalActive)? 'active' : ''">Вкл</button>
                    <button :class="(!withdrawalActive)? 'active' : ''">Выкл</button>
                </div>
            </div>
            <div class="data_element">
                <h5>тех работы</h5>
                <div class="switcher">
                    <button :class="(technicalWorks)? 'active' : ''">Вкл</button>
                    <button :class="(!technicalWorks)? 'active' : ''">Выкл</button>
                </div>
            </div>
            <div class="button_accept">
                <button @click="">Применить</button>
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
        }
    },
    mounted() {
        this.getSettings();
    },
    methods: {
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
