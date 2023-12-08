<template>
    <header>
        <div class="header_top">
            <div class="burger_button" id="burger_toggle"  @click="burgerMenuToggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="header_title">
                <p>Панель управления</p>
            </div>
            <div class="header_button">
                <button id="logOut"></button>
            </div>
        </div>
        <div class="burger_background"  @click="burgerMenuToggle"></div>
        <div class="header_bottom">
            <div class="burger_menu">
                <ul class="menu">
                    <li class="menu_item"><router-link :to="{ name: 'home' }">Главная</router-link></li>
                    <li class="menu_item"><router-link :to="{ name: 'users' }">Пользователи</router-link></li>
                    <li class="menu_item"><router-link :to="{ name: 'replenish' }">Пополнения</router-link></li>
                    <li class="menu_item"><router-link :to="{ name: 'withdrawals' }">Выводы</router-link></li>
                    <li class="menu_item"><router-link :to="{ name: 'payments' }">Выплаты</router-link></li>
                    <li class="menu_item"><router-link :to="{ name: 'promocode' }">Промокоды</router-link></li>
                    <li class="menu_item"><a href="#">Настройки</a></li>
                    <li class="menu_item"><router-link :to="{ name: 'cooperation' }">Заявки на сотрудничество</router-link></li>
                    <li class="menu_item"><a href="#">Топ D W</a></li>
                    <li class="menu_item"><router-link :to="{ name: 'topRef' }">Топ рефоводов</router-link></li>
                </ul>
            </div>
        </div>
    </header>
</template>
<script>
    import {fetchRequest} from "@/fetch.js";
    export default {
        mounted() {
            if (!localStorage.getItem('token')) this.signIn();
        },
        methods: {
            burgerMenuToggle() {
                document.getElementById("burger_toggle").classList.toggle('active');
                document.querySelector(".burger_background").classList.toggle('active');
                document.querySelector(".burger_menu").classList.toggle('active');
            },
            async signIn(){
                let Url = '/useController/authenticateAdminPage';
                let data = {
                    name: "admin",
                    password: "admin"
                };
                const userData = await fetchRequest(Url, data);
                if (typeof userData === 'object') {
                    localStorage.setItem('id', userData.id);
                    localStorage.setItem('name', userData.name);
                    localStorage.setItem('token', userData.token);
                }
            },
        }
    }
</script>
