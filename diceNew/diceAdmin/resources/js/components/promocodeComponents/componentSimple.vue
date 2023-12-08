<template>
    <div class="generate_simple">
        <div class="data_element">
            <h5>Сумма</h5>
            <input class="promoSum" type="text" placeholder="100">
        </div>
        <div class="data_element">
            <h5>Кол-во активаций</h5>
            <input class="promoActiveCount" type="text" placeholder="200">
        </div>
        <div class="data_element">
            <h5>Кол-во промиков</h5>
            <input type="text" placeholder="100">
        </div>
        <div class="data_element">
            <h5>Вагер</h5>
            <input class="promoWage" type="text" placeholder="50">
        </div>
        <div class="data_element">
            <h5>Название промокода</h5>
            <input class="promoName" type="text" placeholder="WTF2023">
        </div>
        <div class="button_accept">
            <button @click="createPromocode">Применить</button>
        </div>
    </div>
</template>
<script>
import {fetchRequest} from "@/fetch.js";
export default {
    methods: {
        createPromocode() {
            let promocode = document.querySelector(".promoName").value;
            let promoSum = document.querySelector(".promoSum").value;
            let promoActiveCount = document.querySelector(".promoActiveCount").value;
            let promoWage = document.querySelector(".promoWage").value;
            let Url = "/admin/generatePromocode";
            let data = {
                "promocode": promocode,
                "activationCount": promoActiveCount,
                "ballanceAdd": promoSum,
                "wagering": promoWage
            };
            let request = fetchRequest(Url, data, localStorage.getItem('token'));
            console.log(request);
        }
    }
}
</script>
