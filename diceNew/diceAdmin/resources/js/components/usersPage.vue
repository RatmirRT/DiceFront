<template>
    <section id="users">
        <div class="search_section">
            <div class="search">
                <h5>Поиск по логину</h5>
                <div class="search_box">
                    <input type="text" placeholder="vk1488756">
                    <button></button>
                </div>
            </div>
            <div class="search">
                <h5>Поиск по ID</h5>
                <div class="search_box">
                    <input type="text" placeholder="54258">
                    <button></button>
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
                </tbody>
            </table>
            <div class="table_pagination">
                <ul>
                    <a href="">
                        <li>1</li>
                    </a><a href="">
                    <li>2</li>
                </a><a href="">
                    <li>3</li>
                </a><a href="">
                    <li>...</li>
                </a><a href="">
                    <li>10</li>
                </a>
                </ul>
            </div>
        </div>
    </section>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    export default {
        data() {
            return {
                usersStats: null,
                pagination: null,
                pageIndex: 0,
            }
        },
        mounted() {
            this.getUsers();
        },
        methods: {
            async getUsers() {
                let Url = "/admin/getUsersByPage";
                let data = {
                    "pageNumber": 1,
                    "pageSize": 20
                }
                this.usersStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                console.log(this.usersStats);
            },

            getUser(e) {
                let target = e.target;
                if (target.tagName != 'BUTTON') return;
                localStorage.setItem("userId", target.dataset.user);
                this.$router.push("user");
            },
        }
    }
</script>
