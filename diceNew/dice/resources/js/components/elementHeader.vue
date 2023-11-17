<template>
    <div class="header_top" id="header">
        <div class="burger_button" id="burger_toggle" @click="burgerMenuToggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="header_logo">
            <router-link :to="{ name: 'home' }">LOGO</router-link>
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
    </div>
    <div class="burger_background" @click="burgerMenuToggle"></div>
    <div class="header_bottom">
        <div class="burger_menu">
            <ul class="menu">
                <li class="menu_item">
                    <router-link :to="{ name: 'home' }">Главная страница</router-link>
                </li>
                <li class="menu_item"><a href="#" @click="menuModalOpen">FAQ</a></li>
                <li class="menu_item"><router-link :to=" logged.value ? { name: 'referals' } : '#'" @click="menuModalOpen">Рефералы</router-link></li>
                <li class="menu_item"><a href="#" @click="promocodeView">Промокод</a></li>
                <li class="menu_item"><a href="#" @click="menuModalOpen">Отзывы</a></li>
                <li class="menu_item"><a href="https://t.me/gametopwin_bot">Техническая поддержка</a></li>
            </ul>
            <div class="menu_socials">
                <a href="#"><img src="image/vk.png" alt=""></a><a href="#"><img src="image/tg.png" alt=""></a><a href="#"><img src="image/ok.png" alt=""></a>
            </div>
        </div>
    </div>
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
</template>

<script>
    import socketUserCount from "@/socketUserCount.js";
    export default {
        el: '#header',
        data() {
          return {
              showPromocode: false,
              userCount: 1,
          }
        },
        created() {
            this.userCountConnect();
            socketUserCount.connectedUser(this.getUserCount);
            socketUserCount.disconnectedUser(this.getUserCount);

        },
        mounted() {
            window.addEventListener('beforeunload', this.userDisconnetc);
            let menu = document.querySelectorAll('.menu_item');
            menu.forEach(item => {
                item.addEventListener('click', this.burgerMenuToggle);
            });
        },
        methods: {

            async userCountConnect() {
                await socketUserCount.start();
                await socketUserCount.UserConnected();
                socketUserCount.unregisterReceiveMessage();
            },

            getUserCount(count){
                this.userCount = count;
            },

            userDisconnetc() {
                socketUserCount.UserDisconnected();
            },

            promocodeView() {
                if (this.logged.value) this.showPromocode = true;
                this.modalBoxToggle();
            },

            burgerMenuToggle() {
                document.getElementById("burger_toggle").classList.toggle('active');
                document.querySelector(".burger_background").classList.toggle('active');
                document.querySelector(".burger_menu").classList.toggle('active');
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
        }
    }

</script>

