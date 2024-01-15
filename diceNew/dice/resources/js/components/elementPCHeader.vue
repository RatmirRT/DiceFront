<template>
    <section class="PC_header">
        <div class="header_logo">
            <router-link :to="{ name: 'home' }">LOGO</router-link>
        </div>
        <div>
            <ul class="menu">
                <li class="menu_item"><router-link :to="{ name: 'home' }">Главная страница</router-link></li>
                <li class="menu_item"><a href="#" @click="menuModalOpen">FAQ</a></li>
                <li class="menu_item"><router-link :to=" logged.value ? { name: 'referals' } : '#'" @click="menuModalOpen">Рефералы</router-link></li>
                <li class="menu_item"><a href="#" @click="promocodeView">Промокод</a></li>
                <li class="menu_item"><a href="#" @click="menuModalOpen">Отзывы</a></li>
                <li class="menu_item"><router-link :to=" logged.value ? { name: 'cooperation' } : '#'" @click="menuModalOpen">Сотрудничекство</router-link></li>
                <li class="menu_item"><router-link :to=" logged.value ? { name: 'bonus' } : '#'" @click="menuModalOpen">Бонусы</router-link></li>
                <li class="menu_item"><router-link :to=" logged.value ? { name: 'settings' } : '#'" @click="menuModalOpen">Настройки</router-link></li>
                <li class="menu_item"><a href="https://t.me/gametopwin_bot">Техническая поддержка</a></li>
            </ul>
        </div>
        <div class="header_button loged_in" v-if="logged.value">
            <div class="header_online">
                <p id="people_online">{{userCount}}</p>
            </div>
            <button id="logOut" @click="modalBoxToggle"></button>
        </div>
        <div class="header_button" v-else>
            <button id="logIn" @click="modalBoxToggle">Войти</button>
        </div>
    </section>
    <div id="modal_block">
        <div class="modal_box_background" @click="modalClose"></div>
        <div class="modal_box">
            <button class="modal_close" @click="modalClose"></button>
            <div class="modal_content">
            </div>
            <div class="modal_content">
                <modal-promocode v-if="showPromocode"></modal-promocode>
                <modal-log-in v-if="!logged.value && !showPromocode"></modal-log-in>
                <modal-log-out v-if="logged.value && !showPromocode"></modal-log-out>
            </div>
        </div>
    </div>
    <p hidden> {{sendUserCount}} </p>
</template>

<script>
import socketUserCount from "@/socketUserCount.js";
export default {
    data() {
        return {
            showPromocode: false,
            userCount: 0,
        }
    },
    computed: {
        async sendUserCount() {
            if (this.logged.value) {
                await this.userCountConnect();
            } else {
                socketUserCount.userCountDisconect();
            }
        }
    },
    mounted() {
        () => {
            this.sendUserCount;
        };
    },
    methods: {
        async userCountConnect() {
            await socketUserCount.start();
            socketUserCount.connectedUser(this.getUserCount);
            socketUserCount.disconnectedUser(this.getUserCount);
            socketUserCount.UserConnected();
        },

        getUserCount(count){
            this.userCount = count;
        },

        promocodeView() {
            if (this.logged.value) this.showPromocode = true;
            this.modalBoxToggle();
        },

        modalClose() {
            this.showPromocode = false;
            this.modalBoxToggle();
        },

        modalBoxToggle() {
            document.getElementById("modal_block").classList.toggle("active");
        },

        menuModalOpen(e) {
            if (!this.logged.value) this.modalBoxToggle();
        }
    },
}
</script>
