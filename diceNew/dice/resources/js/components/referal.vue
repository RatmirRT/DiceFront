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
        <div class="referal_tabs_button" @click="menuChanger">
            <button :class="changer.showIncome ? 'active' : '' " data-target="showIncome">Доход</button>
            <button :class="changer.showReferal? 'active' : '' "  data-target="showReferal">Рефералы</button>
            <button :class="changer.showPromocode? 'active' : '' "  data-target="showPromocode">Реф.промокод</button>
        </div>
        <div class="referal_tab">
            <div class="referal_tab_general" v-if="changer.showIncome || changer.showReferal">
                <div class="referal_tab_general_element">
                    <h5 class="title">{{ (changer.showIncome) ? 'Заработано' : 'Рефералов' }}</h5>
                    <p class="number">{{ (changer.showIncome) ? income.today : referal.today }}</p>
                    <p class="desc">За сегодня</p>
                </div>
                <div class="referal_tab_general_element">
                    <h5 class="title">{{ (changer.showIncome) ? 'Заработано' : 'Рефералов' }}</h5>
                    <p class="number">asd</p>
                    <p class="desc">За вчера</p>
                </div>
                <div class="referal_tab_general_element">
                    <h5 class="title">{{ (changer.showIncome) ? 'Заработано' : 'Рефералов' }}</h5>
                    <p class="number">{{ (changer.showIncome) ? income.month : referal.month }}</p>
                    <p class="desc">За месяц</p>
                </div>
                <div class="referal_tab_general_element">
                    <h5 class="title">{{ (changer.showIncome) ? 'Заработано' : 'Рефералов' }}</h5>
                    <p class="number">{{ (changer.showIncome) ? income.allTime : referal.allTime }}</p>
                    <p class="desc">За все время</p>
                </div>
            </div>
            <referal-table v-if="changer.showReferal"></referal-table>
            <referal-promocode v-if="changer.showPromocode"></referal-promocode>
        </div>
    </section>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";

    export default {
        data() {
            return {
                changer: {
                    showIncome: true,
                    showReferal: false,
                    showPromocode: false,
                },
                referal: {
                    today: '',
                    month: '',
                    allTime: ''
                },
                income: {
                    today: '',
                    month: '',
                    allTime: ''
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
            menuChanger(e) {
                let target = e.target;
                if (target.tagName != 'BUTTON') return;
                this.changeActiveMenu(target.dataset.target);
            },

            changeActiveMenu(target){
                for (let prop in this.$data.changer) {
                    if (this.$data.changer.hasOwnProperty(target) && prop !== target) {
                        this.$data.changer[prop] = false;
                    }
                    this.$data.changer[target] = true;
                }
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
                console.log(referalStats);
                this.referal.today = referalStats.toDayReferals;
                this.referal.month = referalStats.toMonthReferals;
                this.referal.allTime = referalStats.toAllTimeReferals;
            },

            async getProfitByUserId() {
                if (!this.logged.value) return;
                const Url = '/Referal/getProfitByUserId';
                const data = {
                    'id': localStorage.getItem('id')
                };
                const incomeStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                console.log(incomeStats);
                this.income.today = incomeStats.toDayReferals;
                this.income.month = incomeStats.toMonthReferals;
                this.income.allTime = incomeStats.toAllTimeReferals;
            }
        }
    }

</script>
