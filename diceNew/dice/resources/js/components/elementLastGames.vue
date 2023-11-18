<template>
    <section class="last_games" id="lastGames">
        <h2 class="last_games_title" @click="test">Последние игры</h2>
        <div class="last_games_table">
            <table>
                <thead>
                <tr>
                    <th>Игра</th>
                    <th>Игрок</th>
                    <th>Ставка</th>
                    <th>Выигрыш</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lastGame in lastGames">
                    <td class="dice"></td>
                    <td>{{ lastGame.userName.slice(0,5) + "***" }}</td>
                    <td>{{ lastGame.sum.toFixed(2) }}</td>
                    <td class="last_games_table-win" v-if="lastGame.win ">{{ lastGame.canWinSum }}</td>
                    <td class="last_games_table-defeat" v-else> 0 </td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    import { fetchRequest } from '@/fetch.js';
    import lastGamesSocket from '@/socketLastGames.js';

    export default {
        el: '#lastGames',
        data(){
            return {
                lastGames: null,
            }
        },
        created() {
            this.lastGamesConnect();
            //lastGamesSocket.registerReceiveMessage(this.addGame);
        },
        mounted() {
            this.getLastGames();
        },
        beforeUnmount() {
            lastGamesSocket.stopConnection();
        },
        methods: {
            async lastGamesConnect() {
                await lastGamesSocket.start();
            },
            addGame(message) {
                let data = JSON.parse(message);
                this.lastGames.unshift(data);
                this.lastGames.pop();
            },
            async getLastGames(){
                let Url = '/dice/getLastGames';
                let data = {};
                this.lastGames = await fetchRequest(Url, data);
            }
        }
    }
</script>
