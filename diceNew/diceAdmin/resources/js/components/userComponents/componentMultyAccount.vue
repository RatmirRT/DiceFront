<template>
    <div class="user_multyaccount">
        <div class="user_multyaccount_table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>login</th>
                    <th>ip reg</th>
                    <th>ip last</th>
                    <th>os</th>
                    <th>browser</th>
                </tr>
                </thead>
                <tbody>
                    <tr  v-for="user in multiAccount">
                        <td>{{ user.id }}</td>
                        <td>{{ user.name }}</td>
                        <td>{{ user.registrationIp }}</td>
                        <td>192.128.0.2</td>
                        <td>Win10</td>
                        <td>Chrome</td>
                    </tr>
                </tbody>
            </table>
        </div>
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
        data() {
            return {
                multiAccount: null,
                paginations: null,
                paginationList: null,
                pageIndex: 1,
            }
        },
        mounted() {
            this.getMultiAccount(this.pageIndex);
        },
        methods: {
            async getMultiAccount(pageNumber) {
                let Url = "/admin/getMultyAccauntsByUserId";
                let data = {
                    "userId": localStorage.getItem("userId"),
                    "pagination": {
                        "pageNumber": pageNumber,
                        "pageSize": 20
                    }
                };
                let multiAccount = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.multiAccount = multiAccount.items;
                this.paginations = multiAccount.totalPages;
                this.pageIndex = multiAccount.pageIndex;
                this.paginationList = pagination(this.paginations - 1, this.pageIndex);
            },
            changePage(e) {
                let page = e.target.dataset.page;
                this.getMultiAccount(page);
            }
        }
    }
</script>
