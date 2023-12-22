/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { ref, createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'
import socketUserCount from "./socketUserCount.js";
import {getBalance} from "@/ballance.js";

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */




const app = createApp({});

import headerTemplate from './components/elementHeader.vue';
import dice from './components/dice.vue';
import lastGames from './components/elementLastGames.vue';
import modalPromocode from "./components/modalPromocode.vue";
import modalLogIn from "./components/modalLogIn.vue";
import modalLogOut from "./components/modalLogOut.vue";
import accauntBox from "./components/elementAccauntBox.vue";
import notice from "./components/elementNotice.vue";
import referal from "./components/referal.vue";
import referalTable from "./components/referalComponents/elementReferalTable.vue";
import referalGraphic from "./components/referalComponents/elementReferalGraphic.vue";
import referalPromocode from "./components/referalComponents/elementReferalPromocode.vue";
import elementReferalPromocodeTable from "./components/referalComponents/elementReferalPromocodeTable.vue";
import gameSelection from "./components/gameSelection.vue";
import mines from "./components/mines.vue";
import replenish from "./components/replenish.vue";
import cooperation from "./components/cooperation.vue";
import settings from "./components/settings.vue";
import bonus from "./components/bonus.vue";
import page404 from "./components/page404.vue";

app.component('dice', dice);
app.component('lastGames', lastGames);
app.component('headTemplate', headerTemplate);
app.component('modalPromocode', modalPromocode);
app.component('modalLogIn', modalLogIn);
app.component('modalLogOut', modalLogOut);
app.component('accauntBox', accauntBox);
app.component('notice', notice);
app.component('referal', referal);
app.component('referalTable', referalTable);
app.component('referalGraphic', referalGraphic);
app.component('gameSelection', gameSelection);
app.component('mines', mines);
app.component('replenish', replenish);
app.component('referalPromocode', referalPromocode);
app.component('ReferalPromocodeTable', elementReferalPromocodeTable);
app.component('cooperation', cooperation);
app.component('settings', settings);
app.component('bonus', bonus);
app.component('page404', page404);

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */


// Object.entries(import.meta.glob('./**/*.vue', { eager: true })).forEach(([path, definition]) => {
//     app.component(path.split('/').pop().replace(/\.\w+$/, ''), definition.default);
// });

/**
 * Finally, we will attach the application instance to a HTML element with
 * an "id" attribute of "app". This element is included with the "auth"
 * scaffolding. Otherwise, you will need to add an element yourself.
 */

const router = createRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: gameSelection
        },
        {
            path: '/referal',
            name: 'referals',
            component: referal
        },
        {
            path: '/replenish',
            name: 'replenish',
            component: replenish
        },
        {
            path: '/cooperation',
            name: 'cooperation',
            component: cooperation
        },
        {
            path: '/settings',
            name: 'settings',
            component: settings
        },
        {
            path: '/bonus',
            name: 'bonus',
            component: bonus
        },
        {
            path: '/:catchAll(.*)',
            component: page404
        },
    ],
    history: createWebHistory()
});
app.use(router);


const logged = ref(false);
const ballance = ref(10000);

app.config.globalProperties.logged = logged;
app.config.globalProperties.ballance = ballance;

app.mount('#app');

if (localStorage.getItem('name') && localStorage.getItem('id') && localStorage.getItem('token')) {
    logged.value = true;
    getBalance(logged.value).then(balance => {
        ballance.value = balance;
    });
}

window.addEventListener('storage', (e) => {
    if (e.key === 'id' && e.newValue === null) {
        logged.value = false;
    }
});


window.addEventListener('pagehide', socketUserCount.userCountDisconect);



