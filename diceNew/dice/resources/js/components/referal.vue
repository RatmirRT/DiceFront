<template>
    <section class="referal_block">
        <h3>Реферальная система</h3>
        <p>Пригласи друга и <b>зарабатывай 10%</b> от его депозита сразу на счет</p>
        <div class="referal_link">
            <p>{{referalLink}}</p>
            <button @click='copyTextToClipboard'></button>
        </div>
    </section>
    <section class="referal_tabs">
        <div class="referal_tabs_button">
            <button :class="showIncome ? 'active' : '' " @click="incomeToggle">Доход</button><button :class="showReferal? 'active' : '' "  @click="referalToggle">Рефералы</button>
        </div>
        <div class="referal_tab">
            <div class="referal_tab_general">
                <div class="referal_tab_general-top">
                    <div class="number">
                        <p :class="(showReferal) ? 'referal_today': ''">{{ (showIncome) ? income.today : referal.today }}</p>
                    </div>
                    <div class="description">
                        <p>{{ (showIncome) ? 'Заработано' : 'Рефералов' }}</p>
                        <p>За сегодня</p>
                    </div>
                </div>
                <div class="referal_tab_general-bottom">
                    <div class="month">
                        <p>{{ (showIncome) ? income.month : referal.month }}</p>
                        <p>{{ (showIncome) ? 'Заработано' : 'Рефералов' }}</p>
                        <p>За месяц</p>
                    </div>
                    <div class="allTime">
                        <p>{{ (showIncome) ? income.year : referal.year }}</p>
                        <p>{{ (showIncome) ? 'Заработано' : 'Рефералов' }}</p>
                        <p>За все время</p>
                    </div>
                </div>
            </div>
            <referal-table v-if="showReferal"></referal-table>
        </div>
    </section>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";

    export default {
        data() {
            return {
                showIncome: true,
                showReferal: false,
                referal: {
                    today: '',
                    month: '',
                    year: ''
                },
                income: {
                    today: '',
                    month: '',
                    year: ''
                },
                referalLink: 0,
            }
        },
        mounted() {
            if (this.logged.value) this.referalLink = window.location.origin + '?r=' + localStorage.getItem('id');
            this.getReferalStats();
            this.getProfitByUserId()
        },
        methods: {
            incomeToggle() {
                this.showIncome = true;
                this.showReferal = false;
            },

            referalToggle() {
                this.showIncome = false;
                this.showReferal = true;
            },

            copyTextToClipboard() {
                navigator.clipboard.writeText(this.referalLink);
            },

            async getReferalStats() {
                if (!this.logged.value) return;
                const Url = '/Referal/getReferalStats';
                const data = {
                    'id': localStorage.getItem('id')
                };
                const referalStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.referal.today = referalStats.toDayReferals;
                this.referal.month = referalStats.toMonthReferals;
                this.referal.year = referalStats.toAllTimeReferals;
            },

            async getProfitByUserId() {
                if (!this.logged.value) return;
                const Url = '/Referal/getProfitByUserId';
                const data = {
                    'id': localStorage.getItem('id')
                };
                const incomeStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.income.today = incomeStats.toDayReferals;
                this.income.month = incomeStats.toMonthReferals;
                this.income.year = incomeStats.toAllTimeReferals;
            }
        }
    }

</script>
