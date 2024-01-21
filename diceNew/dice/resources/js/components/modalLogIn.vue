<template>
    <div class="modal_signIn active">
        <h4>Войти</h4>
        <form action="#">
            <input id="signInLogin" type="text" placeholder="Логин" required>
            <input id="signInPassword" type="password" placeholder="Пароль" required>
            <label><input type="checkbox">Запомнить меня?</label>
            <button id="signInButton" @click="signIn">Войти</button>
        </form>
        <p class="modal_wrong" v-if="wrong_message">{{wrong_message}}</p>
        <p>или</p>
        <div class="signIn_socials">
            <telegram_login></telegram_login>
<!--            <button class="tg">ТЕЛЕГРАМ</button>-->
        </div>
        <button class="modal_signIn_regButton" @click="changeSign">Регистрация</button>
    </div>
    <div class="modal_signUp">
        <h4>Регистрация</h4>
        <form action="#">
            <input id="signUpLogin" type="text" placeholder="Логин" required>
            <input id="signUpPassword" type="password" placeholder="Пароль" required>
            <button id="signUpButton" @click="signUp">Регистрация</button>
        </form>
        <p class="modal_wrong" v-if="wrong_message">{{wrong_message}}</p>
        <p class="or">или</p>

        <div class="signUp_socials">
            <button class="tg">ТЕЛЕГРАМ</button>
        </div>
        <p class="modal_signUp_temr">Авторизуясь, вы соглашаетесь с <a href="#">Пользовательским соглашением и Политикой конфеденциальности</a></p>
        <p class="modal_signUp_regButton">Есть аккаунт? <a href="#" @click="changeSign">Войти</a></p>
    </div>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    import {getBalance} from "@/ballance.js";
    export default {
        data() {
            return {
                wrong_message: null,
            }
        },

        methods: {
            async signUp(e) {
                e.preventDefault();
                let button = document.getElementById("signUpButton");
                button.disabled = true;
                let Url = '/useController/register';
                let data = {
                    name: document.querySelector("#signUpLogin").value,
                    password: document.querySelector("#signUpPassword").value
                };
                let referal = this.checkReferal();
                if (referal) data.ownerId = referal;
                const userData = await fetchRequest(Url, data);
                if (typeof userData === 'object' && userData.info.includes("succes")) {
                    localStorage.setItem('id', userData.id);
                    localStorage.setItem('name', userData.name);
                    localStorage.setItem('token', userData.token);
                    document.getElementById("modal_block").classList.toggle("active");
                    this.logged.value = true;
                    this.ballance.value = await getBalance(this.logged.value);
                } else {
                    this.wrong_message = (userData.info) ? userData.info : userData;
                }
                button.disabled = false;
            },

            async signIn(e){
                e.preventDefault();
                let button = document.getElementById("signInButton");
                button.disabled = true;
                let Url = '/useController/authenticate';
                let data = {
                    name: document.querySelector("#signInLogin").value,
                    password: document.querySelector("#signInPassword").value,

                };
                const userData = await fetchRequest(Url, data);
                if (typeof userData === 'object') {
                    localStorage.setItem('id', userData.id);
                    localStorage.setItem('name', userData.name);
                    localStorage.setItem('token', userData.token);
                    document.getElementById("modal_block").classList.toggle("active");
                    this.logged.value = true;
                    let ballance = await getBalance(this.logged.value);
                    if (ballance !== false) {
                        this.banned.value = false;
                        this.ballance.value = ballance
                    } else {
                        this.banned.value = true;
                    }
                } else {
                    this.wrong_message = userData;
                }
                button.disabled = false;
            },

            checkReferal() {
                const urlParams = new URLSearchParams(window.location.search);
                return urlParams.get('r');
            },

            changeSign(e) {
                e.preventDefault();
                document.querySelector(".modal_signIn").classList.toggle("active");
                document.querySelector(".modal_signUp").classList.toggle("active");
            }
        },


    }
</script>
