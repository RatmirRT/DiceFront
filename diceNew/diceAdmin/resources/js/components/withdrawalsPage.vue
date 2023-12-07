<template>
    <section id="withdraw">
        <div class="withdraw_table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>юзер</th>
                    <th>Сум</th>
                    <th>систм</th>
                    <th>решение</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for=" widthraw in withdrawals ">
                    <td>{{ widthraw.userId }}</td>
                    <td>{{ widthraw.cardNumber }}</td>
                    <td>{{ widthraw.amount }}</td>
                    <td class="qiwi"></td>
                    <td>
                        <button class="denied" :data-id="widthraw.userId" @click="denieWithdraw"></button>
                        <button class="accept" :data-id="widthraw.userId" @click="acceptWithdraw"></button>
                    </td>
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
    </section>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    import pagination from "@/pagination.js";
    export default {
        data() {
            return {
                withdrawals: null,
                paginations: null,
                paginationList: null,
                pageIndex: 0,
            }
        },
        mounted() {
            this.getWithdrawals(this.pageIndex);
        },
        methods: {
            async getWithdrawals(pageNumber) {
                let Url = "/admin/getWithdrawals";
                let data = {"pagination": {
                                "pageNumber": pageNumber,
                                "pageSize": 20
                            },
                            "onlyActiveWithdrawals": true
                            };
                let withdrawalStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.withdrawals = withdrawalStats.items;
                this.paginations = withdrawalStats.totalPages;
                this.pageIndex = withdrawalStats.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },
            denieWithdraw(e) {
                let Url = "/admin/unconfirmWithdrawal";
                let data = {
                    "id": e.target.dataset.id
                };
                let request = fetchRequest(Url, data, localStorage.getItem('token'));
                this.getWithdrawals(this.pageIndex);
            },
            acceptWithdraw(e) {
                let Url = "/admin/confirmWithdrawal";
                let data = {
                    "id": e.target.dataset.id
                };
                let request = fetchRequest(Url, data, localStorage.getItem('token'));
                this.getWithdrawals(this.pageIndex);
            },
            changePage(e) {
                let page = e.target.dataset.page;
                this.getWithdrawals(page);
            }
        }
    }
</script>
