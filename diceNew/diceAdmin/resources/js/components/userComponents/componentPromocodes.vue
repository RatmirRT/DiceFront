<template>
    <div class="user_promocodes">
        <table>
            <thead>
            <tr>
                <th>date</th>
                <th>name</th>
                <th>sum</th>
                <th>wagher</th>
            </tr>
            </thead>
            <tbody>
                <tr  v-if="promocodeHistory" v-for=" history in promocodeHistory " >
                    <td>10.11.2023
                        14:29</td>
                    <td>{{ history.promocode }}</td>
                    <td>50</td>
                    <td>10</td>
                </tr>
            </tbody>
        </table>
        <div class="table_pagination" v-if="paginations > 1">
            <ul>
                <li v-for ="(pagination, key) in paginationList">
                    <a href="#"
                       :data-page="(pagination != '...') ? pagination
                           : (paginationList[key-1] == 1) ? paginationList[key-1] + 1 : paginationList[key + 1] - 1 "
                       :class="(pagination == pageIndex) ? 'active' : ''">{{ (pagination != '...') ? pagination + 1 : '...' }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import {fetchRequest} from "@/fetch.js";
    import pagination from "@/pagination.js";
    export default {
        data() {
            return {
                promocodeHistory: null,
                paginationList: null,
                paginations: null,
                pageIndex: 0,
            }
        },
        mounted() {
            this.getUserPromocode();
        },
        methods: {
            async getUserPromocode() {
                let Url = "/admin/getPromocodeActivateHistory";
                let data = {
                    "id": localStorage.getItem("userId"),
                    "pageNumber": 0,
                    "pageSize": 20
                };
                let promocodeStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.promocodeHistory = promocodeStats.items;
                this.paginations = promocodeStats.totalPages;
                this.pageIndex = promocodeStats.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
                console.log(this.promocodeHistory);
            }
        }
    }
</script>
