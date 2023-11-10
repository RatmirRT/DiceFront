<template>
    <div class="header_top" id="header">
        <div class="burger_button" id="burger_toggle" @click="burgerMenuToggle">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="header_logo">
            <p>LOGO</p>
        </div>
        <div class="header_button loged_in" v-if="logged.value">
            <div class="header_online">
                <p id="people_online">888</p>
            </div>
            <button id="logOut" @click="logOut"></button>
        </div>
        <div class="header_button" v-else>
            <button id="logIn" @click="logIn">Войти</button>
        </div>
    </div>
    <div class="burger_background" @click="burgerMenuToggle"></div>
    <div class="header_bottom">
        <div class="burger_menu">
            <ul class="menu">
                <li class="menu_item"><a href="#">Главная страница</a></li>
                <li class="menu_item"><a href="#">FAQ</a></li>
                <li class="menu_item"><a href="#">Рефералы</a></li>
                <li class="menu_item"><a href="#" @click="promocodeView">Промокод</a></li>
                <li class="menu_item"><a href="#">Отзывы</a></li>
                <li class="menu_item"><a href="https://t.me/gametopwin_bot">Техническая поддержка</a></li>
            </ul>
            <div class="menu_socials">
                <a href="#"><img src="image/vk.png" alt=""></a><a href="#"><img src="image/tg.png" alt=""></a><a href="#"><img src="image/ok.png" alt=""></a>
            </div>
        </div>
    </div>
    <div id="modal_block">
        <div class="modal_box_background" @click="modalBoxToggle"></div>
        <div class="modal_box">
            <button class="modal_close" @click="modalBoxToggle"></button>
            <div class="modal_content">
            </div>
            <div class="modal_content">
                <modal-promocode v-if="showParam.showPromocode"></modal-promocode>
                <modal-log-in v-if="showParam.showLogIn"></modal-log-in>
                <modal-log-out v-if="showParam.showLogOut"></modal-log-out>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        el: '#header',
        data() {
          return {
              showParam: {
                  showPromocode: false,
                  showLogIn: false,
                  showLogOut: true,
              }
          }
        },
        methods: {
            promocodeView() {
                this.updateVariables('showPromocode');
                this.burgerMenuToggle();
                this.modalBoxToggle();
            },

            burgerMenuToggle() {
                document.getElementById("burger_toggle").classList.toggle('active');
                document.querySelector(".burger_background").classList.toggle('active');
                document.querySelector(".burger_menu").classList.toggle('active');
            },

            logIn() {
                this.updateVariables('showLogIn');
                this.modalBoxToggle();
            },

            logOut() {
                this.updateVariables('showLogOut');
                this.modalBoxToggle();
            },

            modalBoxToggle() {
                document.getElementById("modal_block").classList.toggle("active");
            },

            updateVariables(currentVar) {
                const variables = this.showParam;
                for (let key in variables) {
                    if (key === currentVar) {
                        variables[key] = true;
                    } else {
                        variables[key] = false;
                    }
                }
            }


            // logIn() {
            //     let mainContainer = document.querySelector("main");
            //     mainContainer.insertAdjacentHTML('afterbegin',helper.getAccountBox());
            //     mainContainer.insertAdjacentHTML('afterbegin',helper.getNotice());
            //     document.querySelector('.modal_box .modal_content').innerHTML = helper.getModalOut();
            //     document.querySelector('.modal_signOut_buttons .stay').addEventListener('click', modalBoxToggle);
            //     document.querySelector('.modal_signOut_buttons .out').addEventListener('click', logOut);
            // }
        }
    }
</script>

