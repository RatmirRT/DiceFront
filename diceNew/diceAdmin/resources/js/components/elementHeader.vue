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
                <button id="logOut" @click="logOut"></button>
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
                    <li class="menu_item"><router-link :to="{ name: 'topDW' }">Топ D W</router-link></li>
                    <li class="menu_item"><router-link :to="{ name: 'topRef' }">Топ рефоводов</router-link></li>
                </ul>
            </div>
        </div>
        <div id="modal_block" :class="(!logged.value) ? 'active':''">
            <div class="modal_box_background"></div>
            <div class="modal_box">
                <button class="modal_close" @click="closeModal" v-if="logged.value"></button>
                <div class="modal_content">
                    <modal-sign-in v-if="!logged.value"></modal-sign-in>
                    <modal-sing-out v-if="logged.value"></modal-sing-out>
                </div>
            </div>
        </div>
    </header>
</template>
<script>
    export default {
        data() {
            return {
                showLogOut: false,
            }
        },
        methods: {
            burgerMenuToggle() {
                document.getElementById("burger_toggle").classList.toggle('active');
                document.querySelector(".burger_background").classList.toggle('active');
                document.querySelector(".burger_menu").classList.toggle('active');
            },
            logOut() {
                document.getElementById('modal_block').classList.toggle("active");
            },
            closeModal() {
                document.getElementById('modal_block').classList.toggle("active");
            }
        }
    }
</script>
