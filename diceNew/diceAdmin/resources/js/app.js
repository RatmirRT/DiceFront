import './bootstrap';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

const app = createApp({});

import mainPage from "./components/mainPage.vue";
import elementHeader from "./components/elementHeader.vue";
import withdrawals from "./components/withdrawalsPage.vue";
import usersPage from "./components/usersPage.vue";
import userPage from "./components/userPage.vue";
import componentData from "./components/userComponents/componentData.vue";
import componentRequisites from "./components/userComponents/componentRequisites.vue";
import componentPromocodes from "./components/userComponents/componentPromocodes.vue";
import componentGames from "./components/userComponents/componentGames.vue";
import componentPayment from "./components/userComponents/componentPayment.vue";
import componentMultyAccount from "./components/userComponents/componentMultyAccount.vue";
import subComponentPayment from "./components/userComponents/subComponentPayment.vue";
import subComponentWithdraw from "./components/userComponents/subComponentWithdraw.vue";
import cooperationPage from "./components/cooperationPage.vue";
import promocodePage from "./components/promocodePage.vue";
import componentReferal from "./components/promocodeComponents/componentReferal.vue";
import componentTable from "./components/promocodeComponents/componentTable.vue";
import componentSimple from "./components/promocodeComponents/componentSimple.vue";
import topRefPage from "./components/topRefPage.vue";
import paymentsPage from "./components/paymentsPage.vue";
import replenishPage from "./components/replenishPage.vue";
import page404 from "./components/page404.vue";

app.component('mainPage', mainPage);
app.component('headerTemplate', elementHeader);
app.component('withdrawals', withdrawals);
app.component('usersPage', usersPage);
app.component('userPage', userPage);
app.component('componentData', componentData);
app.component('componentRequisites', componentRequisites);
app.component('componentPromocodes', componentPromocodes);
app.component('componentGames', componentGames);
app.component('componentPayment', componentPayment);
app.component('componentMultyAccount', componentMultyAccount);
app.component('subComponentPayment', subComponentPayment);
app.component('subComponentWithdraw', subComponentWithdraw);
app.component('cooperationPage', cooperationPage);
app.component('promocodePage', promocodePage);
app.component('componentReferal', componentReferal);
app.component('componentTable', componentTable);
app.component('componentSimple', componentSimple);
app.component('topRefPage', topRefPage);
app.component('paymentsPage', paymentsPage);
app.component('replenishPage', replenishPage);
app.component('page404', page404);

const router = createRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: mainPage
        },
        {
            path: '/withdrawals',
            name: 'withdrawals',
            component: withdrawals
        },
        {
            path: '/users',
            name: 'users',
            component: usersPage
        },
        {
            path: '/user',
            name: 'user',
            component: userPage
        },
        {
            path: '/cooperation',
            name: 'cooperation',
            component: cooperationPage
        },
        {
            path: '/promocode',
            name: 'promocode',
            component: promocodePage
        },
        {
            path: '/topRef',
            name: 'topRef',
            component: topRefPage
        },
        {
            path: '/payments',
            name: 'payments',
            component: paymentsPage
        },
        {
            path: '/replenish',
            name: 'replenish',
            component: replenishPage
        },
        {
            path: '/:catchAll(.*)',
            component: page404
        },
    ],
    history: createWebHistory()
});

app.use(router);

app.mount('#app');
