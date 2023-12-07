<template>
    <div class="user_withdrawn_history_block">
        <div class="user_withdrawn_history_table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>date</th>
                    <th>sum</th>
                    <th>pay</th>
                    <th>Status</th>
                    <th>wallet</th>
                </tr>
                </thead>
                <tbody>
                <tr v-if="withdrawHistory" v-for=" history in withdrawHistory " >
                    <td>{{ history.id }}</td>
                    <td>{{ history.createDate }}</td>
                    <td>{{ history.amount }}</td>
                    <td class="qiwi"></td>
                    <td class="paid">Оплачено</td>
                    <td>{{ history.cardNumber }}</td>
                </tr>
                </tbody>
            </table>
        </div>
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
            withdrawHistory: null,
        }
    },
    mounted() {
        this.getUserWithdrawHistory(this.pageIndex);
    },
    methods: {
        async getUserWithdrawHistory(page) {
            let Url = "/admin/getWithdrawalsByUserId";
            let data = {
                "userId": localStorage.getItem("userId"),
                "pagination": {
                    "pageNumber": page,
                    "pageSize": 20
                }
            }
            let withdrawStats = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.withdrawHistory = withdrawStats.items;
            this.paginations = withdrawStats.totalPages;
            this.pageIndex = withdrawStats.pageIndex;
            this.paginationList = pagination(this.paginations, this.pageIndex);
        },
        changePage(e) {
            let page = e.target.dataset.page;
            this.getUserWithdrawHistory(page);
        }
    }
}
</script>
