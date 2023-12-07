<template>
    <div class="user_requisites" v-if="requisites">
        <div class="data_element">
            <h5>Free Kassa</h5>
            <p>{{ requisites.freeKassaNumber }}</p>
        </div>
        <div class="data_element">
            <h5>СПБ</h5>
            <p>54258</p>
        </div>
        <div class="data_element">
            <h5>VISA/MASTERCARD</h5>
            <p>54258</p>
        </div>
        <div class="data_element">
            <h5>U Money</h5>
            <p>54258</p>
        </div>
        <div class="data_element">
            <h5>Piastrix</h5>
            <p>54258</p>
        </div>
        <div class="data_element">
            <h5>FK Wallet</h5>
            <p>54258</p>
        </div>
        <div class="button_accept">
            <button>Применить</button>
        </div>
    </div>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
    export default {
        data(){
            return {
                requisites: null,
                paginationList: null,
                pageIndex: 0,
                withdrawHistory: null,
            }
        },
        mounted() {
            this.getUserRequisites();
        },
        methods: {
            async getUserRequisites() {
                let Url = "/admin/getPaymantRequisitesByUserId";
                let data = {
                    "id": localStorage.getItem("id"),
                }
                this.requisites = await fetchRequest(Url, data, localStorage.getItem('token'));
                console.log(this.requisites);
            },
        }
    }
</script>
