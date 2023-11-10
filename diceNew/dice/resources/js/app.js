/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import './bootstrap';
import { ref, createApp } from 'vue';

/**
 * Next, we will create a fresh Vue application instance. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */

const app = createApp({});

import headerTemplate from './components/header.vue';
import dice from './components/dice.vue';
import lastGames from './components/lastGames.vue';
import modalPromocode from "./components/modalPromocode.vue";
import modalLogIn from "./components/modalLogIn.vue";
import modalLogOut from "./components/modalLogOut.vue";

app.component('dice', dice);
app.component('lastGames', lastGames);
app.component('headTemplate', headerTemplate);
app.component('modalPromocode', modalPromocode);
app.component('modalLogIn', modalLogIn);
app.component('modalLogOut', modalLogOut);

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

const logged = ref(false);
const ballance = ref(10000);

app.config.globalProperties.logged = logged;
app.config.globalProperties.ballance = ballance;

app.mount('#app');

if (localStorage.getItem('name') && localStorage.getItem('id') && localStorage.getItem('token')) {
    logged.value = true;
    ballance.value = localStorage.getItem('ballance');
}

