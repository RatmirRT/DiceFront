<template>
    <section id="users">
        <div class="search_section">
            <div class="search">
                <h5>Поиск по логину</h5>
                <div class="search_box">
                    <input class="searchByName" type="text" placeholder="vk1488756">
                    <button @click="searchByName"></button>
                </div>
            </div>
            <div class="search">
                <h5>Поиск по ID</h5>
                <div class="search_box">
                    <input class="searchById" type="text" placeholder="54258">
                    <button @click="searchById"></button>
                </div>
            </div>
        </div>
        <div class="users_table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>логин</th>
                    <th>баланс</th>
                    <th>подробнее</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for=" userStats in usersStats" @click="getUser">
                    <td>{{ userStats.userId }}</td>
                    <td>{{ userStats.name }}</td>
                    <td>{{ userStats.ballance }}</td>
                    <td><button :data-user="userStats.userId">инфо</button></td>
                </tr>
                <tr v-if="idSearch" @click="getUser">
                    <td>{{ idSearch.userId }}</td>
                    <td>{{ idSearch.name }}</td>
                    <td>{{ idSearch.ballance }}</td>
                    <td><button :data-user="idSearch.userId">инфо</button></td>
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
                usersStats: null,
                paginations: null,
                paginationList: null,
                pageIndex: 1,
                idSearch: null,
                search: null,
            }
        },
        mounted() {
            this.getUsers(this.pageIndex);
        },
        methods: {
            async getUsers(page) {
                let Url = "/admin/getUsersByPage";
                let data = {
                    "pageNumber": page,
                    "pageSize": 20
                }
                let usersStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.usersStats = usersStats.items;
                this.paginations = usersStats.totalPages;
                this.pageIndex = usersStats.pageIndex;
                this.paginationList = pagination(this.paginations - 1, this.pageIndex);
            },

            async getUsersLike(search, page = 1) {
                let Url = "/admin/findUserByName";
                let data = {
                    "pagination": {
                        "pageNumber": page,
                        "pageSize": 20
                    },
                    "name": search
                };
                let usersStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.usersStats = usersStats.items;
                this.paginations = usersStats.totalPages;
                this.pageIndex = usersStats.pageIndex;
                this.paginationList = pagination(this.paginations - 1, this.pageIndex);
            },

            async getUserById(search){
                let Url = "/admin/getUserById";
                let data = {
                    "id": search
                }
                this.idSearch = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.usersStats = null;
                this.paginations = 0;
                this.pageIndex = 0;
            },

            searchByName() {
                let input = document.querySelector(".searchByName").value;
                this.search = input;
                this.getUsersLike(input);
                this.idSearch = null;
            },

            searchById() {
                let input = document.querySelector(".searchById").value;
                this.getUserById(input);
            },

            getUser(e) {
                let target = e.target;
                if (target.tagName != 'BUTTON') return;
                localStorage.setItem("userId", target.dataset.user);
                this.$router.push("user");
            },

            changePage(e) {
                let page = e.target.dataset.page;
                if (!this.search) this.getUsers(page);
                else this.getUsersLike(this.search, page);
            }
        }
    }
</script>
