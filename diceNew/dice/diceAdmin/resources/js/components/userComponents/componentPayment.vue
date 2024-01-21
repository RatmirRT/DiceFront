<template>
    <div class="user_payment_history">
        <div class="user_payment_history_change" @click="menuChanger">
            <button :class=" (paymentShow)? 'active' : '' " data-target="paymentShow">Пополнил</button>
            <button :class=" (withdrawShow)? 'active' : '' " data-target="withdrawShow">Вывел</button>
        </div>
        <sub-component-payment v-if="paymentShow"></sub-component-payment>
        <sub-component-withdraw v-if="withdrawShow"></sub-component-withdraw>
    </div>
</template>
<script>
    import {fetchRequest} from "@/fetch.js";
    export default {
        data(){
            return {
                paymentShow: true,
                withdrawShow: false,
                paginations: null,
                paginationList: null,
                pageIndex: 0,
                paymentHistory: null,
            }
        },
        mounted() {
            this.getUserPaymentHistory();
        },
        methods: {
            async getUserPaymentHistory() {
                let Url = "/admin/getPaymantsByUserId";
                let data = {
                    "userId": localStorage.getItem("userId"),
                    "pagination": {
                        "pageNumber": 0,
                        "pageSize": 20
                    }
                }
                let paymentStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.paymentHistory = paymentStats.items;
                this.paginations = paymentStats.totalPages;
                this.pageIndex = paymentStats.pageIndex;
                this.pagination();
            },

            pagination() {
                if (this.paginations > 5 && this.pageIndex < 4) {
                    this.paginationList = [...this.range(0, 3, 1), "..." , this.paginations];
                    return;
                }
                if (this.paginations > 5 && this.pageIndex < this.paginations - 3) {
                    this.paginationList = [ 0, "...", ...this.range(this.pageIndex - 2, this.pageIndex + 2, 1), "..." , this.paginations  ];
                    return;
                }
                if (this.paginations > 5 && this.pageIndex >= this.paginations - 3) {
                    this.paginationList = [ 0, "...", ...this.range(this.paginations - 3, this.paginations, 1) ];
                    return;
                }
            },

            menuChanger(e) {
                let target = e.target;
                if (target.tagName != 'BUTTON') return;
                this.changeActiveMenu(target.dataset.target);
            },

            changeActiveMenu(target){
                for (let prop in this.$data) {
                    if (this.$data.hasOwnProperty(target) && prop !== target) {
                        this.$data[prop] = false;
                    }
                    this.$data[target] = true;
                }
            }
        }
    }
</script>
