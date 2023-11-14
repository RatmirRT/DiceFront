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
        <div class="referal_table_pagination">
            <ul >
                <li v-for ="page in pages" @click="getRefferalsByUserId">
                    <a href="#" :data-page="page" :class="(page == pageNumber) ? 'active' : ''">{{ page }}</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    export default {
        data() {
            return {
                pageNumber: 1,
                refferals: null,
                pages: 0
            }
        },
        mounted() {
            this.getRefferalsByUserId();
        },
        methods: {
            async getRefferalsByUserId(e) {
                if (e) {
                    e.preventDefault();
                    if (this.pageNumber == e.target.getAttribute('data-page')) return;
                    this.pageNumber = e.target.getAttribute('data-page');
                };
                const Url = '/Referal/getRefferalsByUserId';
                const data = {
                    'id': localStorage.getItem('id'),
                    'pageNumber': this.pageNumber,
                    'pageSize': 10
                };
                let refferals = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.refferals = refferals.paginatedData.items;
                this.pageNumber = refferals.paginatedData.pageIndex;
                this.pages = refferals.paginatedData.totalPages;
            },

            formateDate(dateFormate) {
                let date = dateFormate.split("T")[0].split("-").reverse().join('.');
                let time = dateFormate.split("T")[1].split(".")[0].substring(0, 5);
                return `${date} - ${time}`;
            },
        }
    }
</script>
