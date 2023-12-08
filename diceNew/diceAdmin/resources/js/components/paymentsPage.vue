<template>
    <section class="replenish">
        <div class="date">
            <input class="date_picker date_startDate" type="date" :max="startDate" v-model="startDate"> -
            <input class="date_picker date_endDate" type="date" :min="startDate" :max="endDate" v-model="endDate">
        </div>
        <div class="search_section">
            <div class="search">
                <h5>Тип платёжки</h5>
                <select v-model="paymentSystemId">
                    <option>Не выбран</option>
                    <option>Неигрок</option>
                </select>
            </div>
            <div class="search">
                <h5>Статус</h5>
                <select v-model="paymentStatus">
                    <option>Не выбран</option>
                    <option>Неигрок</option>
                </select>
            </div>
        </div>
        <div class="button_accept">
            <button @click="getPaymentButton">Применить</button>
        </div>
        <div class="withdraw_history_section">
            <div class="withdraw_history_table">
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>user</th>
                        <th>date</th>
                        <th>sum</th>
                        <th>pay</th>
                        <th>Status</th>
                        <th>wallet</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="paymant in paymants">
                        <td>{{ paymant.id }}</td>
                        <td>{{ paymant.userId }}</td>
                        <td>{{ paymant.createdAt }}</td>
                        <td>{{ paymant.amount }}</td>
                        <td class="qiwi"></td>
                        <td class="paid">Оплачено</td>
                        <td>{{ paymant.orderId }}</td>
                    </tr>
                    <tr>
                        <td>54258</td>
                        <td>vk123456789</td>
                        <td>08.11.2023 23:55:12</td>
                        <td>4500</td>
                        <td class="qiwi"></td>
                        <td class="paid">Оплачено</td>
                        <td>1234567891234567</td>
                    </tr>
                    <tr>
                        <td>54258</td>
                        <td>vk123456789</td>
                        <td>08.11.2023 23:55:12</td>
                        <td>4500</td>
                        <td class="qiwi"></td>
                        <td class="paid">Оплачено</td>
                        <td>1234567891234567</td>
                    </tr>
                    <tr>
                        <td>54258</td>
                        <td>vk123456789</td>
                        <td>08.11.2023 23:55:12</td>
                        <td>4500</td>
                        <td class="qiwi"></td>
                        <td class="paid">Оплачено</td>
                        <td>1234567891234567</td>
                    </tr>
                    <tr>
                        <td>54258</td>
                        <td>vk123456789</td>
                        <td>08.11.2023 23:55:12</td>
                        <td>4500</td>
                        <td class="qiwi"></td>
                        <td class="paid">Оплачено</td>
                        <td>1234567891234567</td>
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
    </section>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
import pagination from "@/pagination.js";
export default {
    data() {
        return {
            paymants: null,
            paginations: null,
            paginationList: null,
            pageIndex: 1,
            startDate: null,
            endDate: null,
            paymentSystemId: 0,
            paymentStatus: 0,
        }
    },
    mounted() {
        this.getDate();
        this.getPayments(this.pageIndex);
    },
    watch: {
        startDate(newValue, oldValue) {
            if (oldValue) {
                this.getPayments(1);
            }
        },
        endDate(newValue, oldValue) {
            if (oldValue) {
                this.getPayments(1);
            }
        },

    },
    methods: {
        async getPayments(pageNumber) {
            let Url = "/admin/getPayments";
            let data = {
                "pagination": {
                    "pageNumber": pageNumber,
                    "pageSize": 20
                },
                "startDate": this.startDate,
                "endDate": this.endDate,
                "paymentSystemId": this.paymentSystemId,
                "paymentStatus": this.paymentStatus
            };
            let payment = await fetchRequest(Url, data, localStorage.getItem('token'));
            console.log(payment);
            this.paymants = payment.items;
            this.paginations = payment.totalPages;
            this.pageIndex = payment.pageIndex;
            this.paginationList = pagination(this.paginations - 1, this.pageIndex);
        },
        getPaymentButton() {
            this.getPayments(1);
        },
        changePage(e) {
            let page = e.target.dataset.page;
            this.getPayments(page);
        },
        getDate() {
            let date = new Date();
            this.endDate = date.toISOString().split('T')[0];
            date.setDate(date.getDate() - 1);
            this.startDate = date.toISOString().split('T')[0];
            document.querySelector(".date_startDate").value = this.startDate;
            document.querySelector(".date_endDate").value = this.endDate;
        }
    }
}
</script>

