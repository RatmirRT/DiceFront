<template>
    <div class="promocode_table">
        <table>
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Сумма</th>
                    <th>кол-во/ост-сь</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>asdasdas</td>
                    <td>asdasdas</td>
                    <td>asdas</td>
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
    export default {
        data() {
            return {
                paginations: null,
                paginationList: null,
                pageIndex: 1,
                promocode: null,
            }
        },
    }
</script>
