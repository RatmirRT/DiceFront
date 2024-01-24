<template>
    <div class="generate_referal">
        <div class="data_element">
            <h5>Сумма</h5>
            <input type="text" placeholder="100" v-model="promoSum">
        </div>
        <div class="data_element">
            <h5>Кол-во активаций</h5>
            <input type="text" placeholder="200"  v-model="promoActiveCount">
        </div>
        <div class="data_element">
            <h5>Кол-во промиков</h5>
            <input type="text" placeholder="100" disabled>
        </div>
        <div class="data_element">
            <h5>Вагер</h5>
            <input type="text" placeholder="50" v-model="promoWage">
        </div>
        <div class="data_element">
            <h5>Название промокода</h5>
            <input type="text" placeholder="WTF2023" v-model="promocode" @input="toUpper">
        </div>
        <div class="data_element">
            <h5>Рефер</h5>
            <input type="text" placeholder="banditos" v-model="ownerId">
        </div>
        <div class="button_accept">
            <button @click="createPromocode">Применить</button>
        </div>
        <div class="request_message" v-if="request">{{ request }}</div>
    </div>
</template>
<script>
import {fetchRequest} from "@/fetch.js";
export default {
    data(){
        return {
            request: null,
            promocode: null,
            promoSum: null,
            promoActiveCount: null,
            promoWage: null,
            ownerId: null,
        }
    },
    methods: {
        toUpper(e) {
            e.target.value = e.target.value.toUpperCase();
        },

        async createPromocode() {
            this.promocode = (this.promocode) ? this.promocode : this.generatePromocode();
            if (!this.promocode || !this.promoSum || !this.promoActiveCount || !this.promoWage || !this.ownerId ) return;
            let Url = "/admin/generatePromocode";
            let data = {
                "promocode": this.promocode,
                "activationCount": this.promoSum,
                "ballanceAdd": this.promoActiveCount,
                "wagering": this.promoWage,
                "isRefferalPromocode": true,
                "refferalPromocodeOwnerId": this.ownerId
            };
            this.request = await fetchRequest(Url, data, localStorage.getItem('token'));
        },
        generatePromocode() {
            const length = 8;
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let promocode = '';

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                promocode += characters[randomIndex];
            }

            return promocode;
        }
    }
}
</script>
