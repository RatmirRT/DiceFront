<template>
    <div class="topDW_table">
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>юзер</th>
                <th>Сумма</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="item of replenish">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.totalPaymentAmount }}</td>
                </tr>
            </tbody>
        </table>
        <div class="table_pagination" v-if="paginations > 1">
            <ul>
                <li v-for ="(pagination, key) in paginationList">
                    <a href="#" @click="changePage"
                       :data-page="(pagination != '...') ? pagination + 1
                           : (paginationList[key-1] == 1) ? paginationList[key-1] + 1 : paginationList[key + 1] - 1 "
                       :class="(pagination + 1 == pageIndex) ? 'active' : ''"> {{ (pagination != '...') ? pagination + 1 : '...' }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
import pagination from "@/pagination.js";
export default {
    props: {
        startDate: String,
        endDate: String,
    },
    data() {
        return {
            replenish: null,
            paginations: null,
            paginationList: null,
            pageIndex: 1
        }
    },
    mounted() {
        this.getReplenish(this.pageIndex);
    },
    watch: {
        startDate(newValue, oldValue) {
            if (oldValue) {
               //this.getReplenish(1);
            }
        },
        endDate(newValue, oldValue) {
            if (oldValue) {
                //this.getReplenish(1);
            }
        },
    },
    methods: {
        async getReplenish(pageNumber) {
            let Url = "/admin/getUserPaymentInfo";
            let data = {
                "pageNumber": pageNumber,
                "pageSize": 20
            };
            let replenish = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.replenish = replenish.items;
            this.paginations = replenish.totalPages;
            this.pageIndex = replenish.pageIndex;
            this.paginationList = pagination(this.paginations - 1, this.pageIndex);
        },
        changePage(e) {
            let page = e.target.dataset.page;
            this.getReplenish(page);
        },
    }
}
</script>
