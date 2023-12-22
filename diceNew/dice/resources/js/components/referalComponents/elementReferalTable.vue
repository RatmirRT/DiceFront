<template>
    <div class="referal_table">
        <table>
            <thead>
            <tr>
                <th>Логин</th>
                <th>Регистрация</th>
                <th>Доход</th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="refferals" v-for="referal in refferals">
                <td>{{ referal.name.substring(0, 5) + "*".repeat(5)
                    }}</td>
                <td>{{ formateDate(referal.registrationDate) }}</td>
                <td>{{ referal.profit }}</td>
            </tr>
            </tbody>
        </table>
        <div class="referal_table_pagination" v-if="paginations > 1">
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
        data() {
            return {
                paginations: null,
                paginationList: null,
                pageIndex: 1,
                refferals: null,
            }
        },
        mounted() {
            this.getRefferalsByUserId(this.pageIndex);
        },
        methods: {
            async getRefferalsByUserId(page) {
                let Url = "/Referal/getRefferalsByUserId";
                let data = {
                    "id": localStorage.getItem('id'),
                    "pageNumber": page,
                    "pageSize": 20
                };
                let refferals = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.refferals = refferals.paginatedData.items;
                this.pageNumber = refferals.paginatedData.pageIndex;
                this.paginations = refferals.totalPages;
                this.pageIndex = refferals.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },

            formateDate(dateFormate) {
                let date = dateFormate.split("T")[0].split("-").reverse().join('.');
                let time = dateFormate.split("T")[1].split(".")[0].substring(0, 5);
                return `${date} - ${time}`;
            },

            changePage(e) {
                let page = e.target.dataset.page;
                this.getRefferalsByUserId(page);
            }
        }
    }
</script>
