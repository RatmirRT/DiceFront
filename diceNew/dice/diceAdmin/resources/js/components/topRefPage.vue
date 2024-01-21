<template>
    <section id="referals">
        <div class="referals_table">
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>юзер</th>
                        <th>РЕФОВ</th>
                        <th>Заработано</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="topRef in topRefs">
                        <td>{{ topRef.id }}</td>
                        <td>{{ topRef.name }}</td>
                        <td>{{ topRef.refferalCount }}</td>
                        <td>{{ topRef.earnedMoney }}</td>
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
    </section>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
import pagination from "@/pagination.js";
export default {
    data() {
        return {
            topRefs: null,
            paginations: null,
            paginationList: null,
            pageIndex: 1,
        }
    },
    mounted() {
        this.getTopRefs(this.pageIndex);
    },
    methods: {
        async getTopRefs(pageNumber) {
            let Url = "/admin/getTopRefferals";
            let data = {
                "pageNumber": pageNumber,
                "pageSize": 20
            };
            let topRefs = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.topRefs = topRefs.items;
            this.paginations = topRefs.totalPages;
            this.pageIndex = topRefs.pageIndex;
            this.paginationList = pagination(this.paginations - 1, this.pageIndex);
        },
        changePage(e) {
            let page = e.target.dataset.page;
            this.getTopRefs(page);
        }
    }
}
</script>
