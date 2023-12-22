<template>
    <div class="modal_promocode active">
        <h4>Введите промокод</h4>
        <input type="text" @input="toUpper">
        <button @click="sendPromocode">Активировать</button>
        <div class="modal_promocode_response" v-if="promocodeStatus" :class="promocodeStatus.successful ? 'access' : 'wrong'">
            {{ promocodeStatus.message }}
        </div>
    </div>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    import {getBalance} from "@/ballance.js";
    export default {
        data() {
            return {
                promocodeStatus: null,
            }
        },
        methods: {
            toUpper(e) {
                e.target.value = e.target.value.toUpperCase();
            },
            async sendPromocode(e) {
                if (!this.logged.value) return;
                e.preventDefault();
                let Url = '/promocode/activatePromocode';
                let data = {
                    promocode: document.querySelector(".modal_promocode input").value,
                    userId: localStorage.getItem('id')
                };
                const response = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.promocodeStatus = response;
                this.ballance.value = await getBalance(this.logged.value);
            }
        }
    }
</script>

