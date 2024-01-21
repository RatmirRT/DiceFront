<template>
    <section id="control_panel">
        <div class="date"><p>{{ date }}</p></div>
        <div class="replenishment">
            <div class="panel_element">
                <div class="description">
                    <p>Пополнений</p>
                    <p>За сегодня</p>
                </div>
                <div class="total" v-if="paymentStats">
                    <p>{{ paymentStats.toDay  }}</p>
                </div>
            </div>
            <div class="panel_element">
                <div class="description">
                    <p>Пополнений</p>
                    <p>За 7 дней</p>
                </div>
                <div class="total" v-if="paymentStats">
                    <p>{{ paymentStats.toWeek  }}</p>
                </div>
            </div>
            <div class="panel_element">
                <div class="description">
                    <p>Пополнений</p>
                    <p>За месяц</p>
                </div>
                <div class="total" v-if="paymentStats">
                    <p>{{ paymentStats.toMonth  }}</p>
                </div>
            </div>
            <div class="panel_element">
                <div class="description">
                    <p>Пополнений</p>
                    <p>За всё время</p>
                </div>
                <div class="total" v-if="paymentStats">
                    <p>{{ paymentStats.allDays  }}</p>
                </div>
            </div>
        </div>
        <div class="payments">
            <div class="panel_element">
                <div class="description">
                    <p>Выплат</p>
                    <p>За сегодня</p>
                </div>
                <div class="total" v-if="withdrawalStats">
                    <p>{{ withdrawalStats.toDay  }}</p>
                </div>
            </div>
            <div class="panel_element">
                <div class="description">
                    <p>Выплат</p>
                    <p>За 7 дней</p>
                </div>
                <div class="total" v-if="withdrawalStats">
                    <p>{{ withdrawalStats.toWeek  }}</p>
                </div>
            </div>
            <div class="panel_element">
                <div class="description">
                    <p>Выплат</p>
                    <p>За месяц</p>
                </div>
                <div class="total" v-if="withdrawalStats">
                    <p>{{ withdrawalStats.toMonth  }}</p>
                </div>
            </div>
            <div class="panel_element">
                <div class="description">
                    <p>Выплат</p>
                    <p>За всё время</p>
                </div>
                <div class="total" v-if="withdrawalStats">
                    <p>{{ withdrawalStats.allDays  }}</p>
                </div>
            </div>
        </div>
        <div class="total_sum">
            <div class="panel_element">
                <div class="description">
                    <p>Общая сумма</p>
                    <p>На вывод</p>
                </div>
                <div class="total" v-if="withdrawalStats">
                    <p>{{ withdrawalStats.withdrawalWaitSum  }}</p>
                </div>
            </div>
        </div>
        <div class="free_kassa">
            <div class="panel_element">
                <div class="description">
                    <p>FREE-KASSA</p>
                    <p>Баланс</p>
                </div>
                <div class="total" v-if="freeKassa">
                    <p>{{ freeKassa  }}</p>
                </div>
            </div>
        </div>
        <div class="total_user">
            <div class="panel_element">
                <div class="description">
                    <p>Кол-во юзеров</p>
                    <p>За всё время</p>
                </div>
                <div class="total" v-if="userCount">
                    <p>{{ userCount  }}</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
    export default  {
        data(){
            return {
                paymentStats: null,
                withdrawalStats: null,
                freeKassa: null,
                userCount: null,
                date: null,
            }
        },
        mounted() {
            this.getMainStats();
            this.date = new Date().toLocaleDateString('ru-RU');
        },
        methods: {
            async getMainStats() {
                let Url = "/admin/getMainPageStats";
                let data = {};
                let mainStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.paymentStats = mainStats.paymentStats;
                this.withdrawalStats = mainStats.withdrawalStats;
                this.freeKassa = mainStats.freeKassaBallance;
                this.userCount = mainStats.usersCount;
            }
        }
    }
</script>

