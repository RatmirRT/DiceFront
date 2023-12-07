<template>
    <div id="user_main">
        <div class="user_data" v-if="userData">
            <div class="data_element">
                <h5>ID Рефер vk123456789</h5>
                <p>{{ userData.userId }}</p>
            </div>
            <div class="data_element">
                <h5>Баланс</h5>
                <p>{{ userData.ballance }}</p>
            </div>
            <div class="data_element">
                <h5>логин</h5>
                <p>{{ userData.name }}</p>
            </div>
            <div class="data_element">
                <h5>пароль</h5>
                <p>{{ userData.password }}</p>
            </div>
            <div class="data_element">
                <h5>дата регистрации</h5>
                <p>{{ userData.registrationDate }}</p>
            </div>
            <div class="data_element">
                <h5>Последний актив</h5>
                <p>{{ userData.lastActiveDate }}</p>
            </div>
            <div class="data_element">
                <h5>IP Регистрации</h5>
                <p>{{ userData.registrationIpAddres }}</p>
            </div>
            <div class="data_element">
                <h5>IP Входа</h5>
                <p>{{ userData.authIpAddres }}</p>
            </div>
            <div class="data_element">
                <h5>Пополнил</h5>
                <p>{{ userData.ballanceAdd }}</p>
            </div>
            <div class="data_element">
                <h5>Вывел</h5>
                <p>{{ userData.exitBallance }}</p>
            </div>
            <div class="data_element">
                <h5>реф %</h5>
                <p>{{ userData.refferalPercent }}</p>
            </div>
            <div class="data_element">
                <h5>Заработано</h5>
                <p>{{ userData.earnedMoney }}</p>
            </div>
            <div class="data_element">
                <h5>Пополнили рефы</h5>
                <p>{{ userData.reffsAddedBallance }}</p>
            </div>
            <div class="data_element">
                <h5>Вывели рефы</h5>
                <p>{{ userData.reffsExitBallance }}</p>
            </div>
            <div class="data_element">
                <h5>Кол-во рефов</h5>
                <p>{{ userData.refferalCount }}</p>
            </div>
            <div class="data_element">
                <h5>Роль</h5>
                <select v-model="role">
                    <option value="User">Игрок</option>
                    <option value="none">Неигрок</option>
                </select>
            </div>
            <div class="data_element">
                <h5>Депозит для вывода</h5>
                <p>none</p>
            </div>
            <div class="data_element">
                <h5>Вагер</h5>
                <p>none</p>
            </div>
            <div class="data_element">
                <h5>Заблокирован</h5>
                <p class="no_ban">Нет</p>
            </div>
            <div class="data_element">
                <h5>Причина</h5>
                <input type="text">
            </div>
            <div class="button_accept">
                <button>Применить</button>
            </div>
        </div>
        <div class="button_delete">
            <button>Удалить пользователя</button>
        </div>
    </div>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    export default {
        data() {
            return {
                userData: null,
                role: "User",
            }
        },
        async mounted() {
            await this.getUserData();
            console.log(this.userData);
            this.role = this.userData.role;
        },
        methods: {
            async getUserData(){
                let Url = "/admin/getUserById";
                let data = {
                    "id": localStorage.getItem("userId")
                }
                this.userData = await fetchRequest(Url, data, localStorage.getItem('token'));
            }
        }
    }
</script>

