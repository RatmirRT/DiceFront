<template>
    <div class="signIn">
        <form action="#">
            <input type="text" placeholder="Логин" required v-model="login">
            <input type="password" placeholder="Пароль" required v-model="password">
            <button @click="signIn">Войти</button>
        </form>
        <p class="modal_wrong" v-if="wrongMessage">{{wrongMessage}}</p>
    </div>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
export default {
    data() {
        return {
            wrongMessage: null,
            login: null,
            password: null,
        }
    },
    methods: {
        async signIn(e){
            e.target.disabled = true;
            let Url = '/useController/authenticateAdminPage';
            let data = {
                name: this.login,
                password: this.password
            };
            console.log(data);
            const userData = await fetchRequest(Url, data);
            if (typeof userData === 'object' && userData.info.includes("succes")) {
                localStorage.setItem('id', userData.id);
                localStorage.setItem('name', userData.name);
                localStorage.setItem('token', userData.token);
                this.logged.value = true;
            } else {
                this.wrongMessage = "Неверные данные";
            }
            e.target.disabled = false;
        },
    },
}
</script>
