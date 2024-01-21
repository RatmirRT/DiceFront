<template>

    <section id="requests">
        <div class="cooperationModal">
            <div class="cooperation_bgc" @click="hideMessage"></div>
            <div class="cooperation_block">
                <div class="closeModal" @click="hideMessage"></div>
                <p>1235</p>
            </div>
        </div>
        <div class="requests_table">
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>login</th>
                    <th>Text</th>
                    <th>link</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="cooperation in cooperations">
                        <td>{{ cooperation.id }}</td>
                        <td>{{ cooperation.name }}</td>
                        <td><a href="#" :data-text="cooperation.message" @click="showMessage">Читать</a></td>
                        <td><a class="link" :href="cooperation.link"></a></td>
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
    import pagination from "@/pagination.js";
    import {fetchRequest} from "@/fetch.js";
    export default {
        data() {
            return {
                cooperations: null,
                paginations: null,
                paginationList: null,
                pageIndex: 0,
            }
        },
        mounted() {
            this.getCooperations(this.pageIndex);
        },
        methods: {
            async getCooperations(pageNumber) {
                let Url = "/admin/getAllCooperationRequest";
                let data = {
                    "pageNumber": pageNumber,
                    "pageSize": 20
                };
                let CooperationList = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.cooperations = CooperationList.items;
                this.paginations = CooperationList.totalPages;
                this.pageIndex = CooperationList.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },
            showMessage(e) {
                document.querySelector(".cooperationModal").classList.toggle('active');
                document.querySelector('.cooperation_block p').innerHTML = e.target.dataset.text;
            },
            hideMessage(e) {
                document.querySelector(".cooperationModal").classList.toggle('active');
            },
            changePage(e) {
                let page = e.target.dataset.page;
                this.getCooperations(page);
            }
        }
    }
</script>
