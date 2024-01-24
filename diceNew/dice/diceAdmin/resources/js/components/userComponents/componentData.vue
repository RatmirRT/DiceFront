<template>
    <div id="user_main">
        <div class="user_data" v-if="userData">
            <div class="data_element">
                <h5>ID Рефер vk123456789</h5>
                <p>{{ userData.userId }}</p>
            </div>
            <div class="data_element">
                <h5>Баланс</h5>
                <input type="text" v-model="userData.ballance">
            </div>
            <div class="data_element">
                <h5>логин</h5>
                <input type="text" v-model="userData.name">
            </div>
            <div class="data_element">
                <h5>пароль</h5>
                <input type="password" v-model="userData.password">
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
                <input type="text" v-model="userData.refferalPercent">
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
                    <option value="Moderator">Модератор</option>
                    <option value="Streamer">Стример</option>
                    <option value="Admin">Админ </option>
                </select>
            </div>
            <div class="data_element">
                <h5>Депозит для вывода</h5>
                <input type="text" v-model="userData.paymentForWithdrawal">
            </div>
            <div class="data_element">
                <h5>Вагер</h5>
                <p>{{ userData.wager }}</p>
            </div>
            <div class="data_element">
                <h5>Заблокирован</h5>
                <select v-model="blocked">
                    <option :value="true">Да</option>
                    <option :value="false">Нет</option>
                </select>
            </div>
            <div class="data_element">
                <h5>Причина</h5>
                <input type="text" v-model="userData.blockReason">
            </div>
            <div class="data_element">
                <h5>Возможность выводить</h5>
                <select v-model="userData.enableWithdrawal">
                    <option :value="true">Да</option>
                    <option :value="false">Нет</option>
                </select>
            </div>
            <div class="button_accept">
                <button @click="acceptChange">Применить</button>
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
                blocked: false,
            }
        },
        async mounted() {
            await this.getUserData();
            this.role = this.userData.role;
            this.blocked = this.userData.blocked;
        },
        methods: {
            async getUserData(){
                let Url = "/admin/getUserById";
                let data = {
                    "id": localStorage.getItem("userId")
                }
                this.userData = await fetchRequest(Url, data, localStorage.getItem('token'));
            },
            sendUserData(){
                let Url = "/admin/updateUserInformation";
                let data = {
                    "userId": localStorage.getItem("userId"),
                    "name": this.userData.name,
                    "password": this.userData.password,
                    "ballance": this.userData.ballance,
                    "reffetalPercent": this.userData.refferalPercent,
                    "blockUser": this.blocked,
                    "blockReason": this.blockReason,
                    "paymentForWithdrawal": this.userData.paymentForWithdrawal,
                    "enableWithdrawal": this.userData.enableWithdrawal,
                };
                fetchRequest(Url, data, localStorage.getItem('token'));
            },
            acceptChange() {
                this.sendUserData();
            }
        }
    }
</script>

