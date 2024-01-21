<template>
    <section>
        <div class="settings_form">
            <div class="title">
                <h2>Настройки</h2>
                <p>ID: 46</p>
            </div>
            <div class="description">
                <p>Для получения бонуса сделайте привязку своих соц. сетей</p>
            </div>
            <div class="socials">
                <div class="vk">
                    <p>ВКОНТАКТЕ</p>
                    <button></button>
                </div>
                <div class="tg">
                    <p>ТЕЛЕГРАМ</p>
                    <button></button>
                </div>
            </div>
            <div class="settings_form_input">
                <div class="data_element full">
                    <p>Сменить Логин</p>
                    <input type="text" :disabled="!changeName" v-model="login">
                    <button @click="()=> {changeName = true}"></button>
                    <p>Возможность сменить логин: Осталось 2</p>
                </div>
                <div class="data_element full">
                    <p>Сменить Пароль</p>
                    <input type="password" :disabled="!changePass" v-model="password">
                    <button @click="()=> {changePass = true}"></button>
                </div>
            </div>
            <div class="button_accept">
                <button @click="changeUserData">Применить</button>
            </div>
        </div>
    </section>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    export default {
        data() {
            return  {
                changeName: false,
                changePass: false,
                login: localStorage.getItem('name'),
                password: null,
            }
        },
        methods: {
            async changeUserData() {
                let Url = '/useController/changeUserData';
                let data = {
                    userId: localStorage.getItem('id'),
                    newName: this.login,
                    newPassword: this.password
                };
                const userData = await fetchRequest(Url, data, localStorage.getItem('token'));
                return userData;
            }
        }
    }
</script>
