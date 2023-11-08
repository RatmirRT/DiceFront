<template>
    <section class="last_games" id="lastGames">
        <h2 class="last_games_title">Последние игры</h2>
        <div class="last_games_table">
            <table>
                <thead>
                <tr>
                    <th>Игрок</th>
                    <th>Ставка</th>
                    <th>X</th>
                    <th>Выигрыш</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="lastGame in lastGames">
                    <td>{{ lastGame.userName }}</td>
                    <td>{{ lastGame.sum }}</td>
                    <td>{{ lastGame.multiplier }}</td>
                    <td :class="lastGame.win ? 'last_games_table-win' : 'last_games_table-defeat'">{{ lastGame.canWinSum }}</td>
                </tr>
                </tbody>
            </table>
        </div>
    </section>
</template>

<script>
    import { fetchRequest } from '@/../js/fetch.js';
    export default {
        el: '#lastGames',
        data(){
            return {
                lastGames: null,
            }
        },
        mounted() {
            this.getLastGames();
            setInterval( this.getLastGames, 5000);
        },
        methods: {
            async getLastGames(){
                let Url = '/dice/getLastGames';
                let data = {};
                this.lastGames = await fetchRequest(Url, data);
            }
        }
    }
</script>
