<template>
    <section>
        <div class="header_top" id="header">
            <div class="burger_button" id="burger_toggle" @click="burgerMenuToggle" v-if="!PC.value">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="header_logo">
                <router-link :to="{ name: 'home' }">LOGO</router-link>
            </div>
            <div class="burger_menu">
                <ul class="menu">
                    <li class="menu_item">
                        <router-link :to="{ name: 'home' }">Главная страница</router-link>
                    </li>
                    <li class="menu_item"><a href="#" @click="menuModalOpen">FAQ</a></li>
                    <li class="menu_item"><router-link :to=" logged.value ? { name: 'referals' } : '#'" @click="menuModalOpen">Рефералы</router-link></li>
                    <li class="menu_item"><a href="#" @click="promocodeView">Промокод</a></li>
                    <li class="menu_item"><a href="#" @click="menuModalOpen">Отзывы</a></li>
                    <li class="menu_item"><router-link :to=" logged.value ? { name: 'cooperation' } : '#'" @click="menuModalOpen">Сотрудничекство</router-link></li>
                    <li class="menu_item"><router-link :to=" logged.value ? { name: 'bonus' } : '#'" @click="menuModalOpen">Бонусы</router-link></li>
                    <li class="menu_item"><router-link :to=" logged.value ? { name: 'settings' } : '#'" @click="menuModalOpen">Настройки</router-link></li>
                    <li class="menu_item"><a href="https://t.me/gametopwin_bot">Техническая поддержка</a></li>
                </ul>
                <div class="menu_socials" v-if="!PC.value">
                    <a href="#"><div class="vk"><img src="/image/vk.svg" alt="vk"><p>ВКОНТАКТЕ</p></div></a>
                    <a href="#"><div class="tg"><img src="/image/tg.svg" alt="tg"><p>ТЕЛЕГРАМ</p></div></a>
                </div>
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
        <div class="burger_background" @click="burgerMenuToggle"  v-if="!PC.value"></div>
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
        el: '#header',
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
            let menu = document.querySelectorAll('.menu_item');
            menu.forEach(item => {
                item.addEventListener('click', this.burgerMenuToggle);
            });
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
        },
    }

</script>

