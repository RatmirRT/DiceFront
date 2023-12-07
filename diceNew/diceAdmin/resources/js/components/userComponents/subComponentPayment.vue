<template>
    <div class="user_payment_history_table">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>date</th>
                <th>sum</th>
                <th>pay</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="paymentHistory" v-for=" history in paymentHistory ">
                <td>{{ history.id }}</td>
                <td>{{ history.createdAt }}</td>
                <td>{{ history.amount }}</td>
                <td class="qiwi"></td>
                <td :class=" (history.status == 0 ) ? 'paid' : ''">{{ (history.status == 0 ) ? 'Оплачено' : 'none' }}</td>
            </tr>
            </tbody>
        </table>
        <div class="table_pagination" v-if="paginations > 1">
            <ul>
                <li v-for ="(pagination, key) in paginationList">
                    <a href="#" @click="changePage"
                       :data-page="(pagination != '...') ? pagination
                           : (paginationList[key-1] == 1) ? paginationList[key-1] + 1 : paginationList[key + 1] - 1 "
                       :class="(pagination == pageIndex) ? 'active' : ''"> {{ (pagination != '...') ? pagination + 1 : '...' }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    import pagination from "@/pagination.js";
    export default {
        data(){
            return {
                paginations: null,
                paginationList: null,
                pageIndex: 0,
                paymentHistory: null,
            }
        },
        mounted() {
            this.getUserPaymentHistory(this.pageIndex);
        },
        methods: {
            async getUserPaymentHistory(page) {
                let Url = "/admin/getPaymantsByUserId";
                let data = {
                    "userId": localStorage.getItem("userId"),
                    "pagination": {
                        "pageNumber": page,
                        "pageSize": 20
                    }
                }
                let paymentStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.paymentHistory = paymentStats.items;
                this.paginations = paymentStats.totalPages;
                this.pageIndex = paymentStats.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },
            changePage(e) {
                let page = e.target.dataset.page;
                this.getUserPaymentHistory(page);
            }
        }
    }
</script>
