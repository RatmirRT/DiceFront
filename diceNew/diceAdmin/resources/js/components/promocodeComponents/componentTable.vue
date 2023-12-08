<template>
    <div>
        <div class="search_section">
            <div class="search">
                <h5>Поиск по названию</h5>
                <div class="search_box">
                    <input id="searchPromocode" type="text" placeholder="vk1488756">
                    <button @click="searchPromocode"></button>
                </div>
            </div>
            <div class="check_box" :class="(onlyActive)? 'active' : ''" @click="changeView">
                <p>Активные</p>
            </div>
        </div>
        <div class="promocode_list">
            <table>
                <thead>
                <tr>
                    <th>Название</th>
                    <th>Сумма</th>
                    <th>вагер</th>
                    <th>кол-во/ост-сь</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="promocode in promocodes">
                        <td>{{ promocode.name }}</td>
                        <td>{{ promocode.ballanceAdd }}</td>
                        <td>{{ promocode.wagering }}</td>
                        <td>{{ promocode.allActivationCount }}/{{ promocode.activatedCount }}</td>
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
    </div>
</template>
<script>
    import {fetchRequest} from "@/fetch.js";
    import pagination from "@/pagination.js";
    export default {
        data() {
            return {
                promocodes: null,
                paginations: null,
                paginationList: null,
                onlyActive: false,
                pageIndex: 0,
                likeName: null,
            }
        },
        mounted() {
            this.getPromocodes(this.pageIndex);
        },
        methods: {
            async getPromocodes(pageNumber) {
                let Url = "/admin/getPromocodes";
                let data = {"pagination": {
                        "pageNumber": pageNumber,
                        "pageSize": 20
                    },
                    "onlyActiveWithdrawals": this.onlyActive
                };
                let promocodeStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.promocodes = promocodeStats.items;
                this.paginations = promocodeStats.totalPages;
                this.pageIndex = promocodeStats.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },
            async getPromocodeLike(promocodeName, page = 1) {
                let Url = "/admin/getPromocodeByNameByLike";
                let data = {"pagination": {
                        "pageNumber": page,
                        "pageSize": 20
                    },
                    "name": promocodeName
                };
                let promocodeStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.promocodes = promocodeStats.items;
                this.paginations = promocodeStats.totalPages;
                this.pageIndex = promocodeStats.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },
            searchPromocode() {
                let input = document.getElementById("searchPromocode").value;
                this.likeName = input;
                this.getPromocodeLike(input);
            },
            changeView() {
                this.onlyActive = !this.onlyActive;
                this.getPromocodes(0);
            },
            changePage(e) {
                let page = e.target.dataset.page;
                if (!this.likeName) this.getPromocodes(page);
                else this.getPromocodeLike(this.likeName, page);
            }
        }
    }
</script>
