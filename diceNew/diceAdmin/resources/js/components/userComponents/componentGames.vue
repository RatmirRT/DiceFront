<template>
    <div>
        <div class="user_games" v-if="games">
            <h3>Dice</h3>
            <div class="user_data">
                <div class="data_element">
                    <h5>Выиграно</h5>
                    <p>{{ games.diceWinSum }}</p>
                </div>
                <div class="data_element">
                    <h5>Проиграно</h5>
                    <p>{{ games.diceLoseSum }}</p>
                </div>
                <div class="data_element">
                    <h5>Кол-во ставок</h5>
                    <p>{{ games.diceBetCount }}</p>
                </div>
                <div class="data_element">
                    <h5>Сумма ставок</h5>
                    <p>{{ games.diceAllBetsSum }}</p>
                </div>
            </div>
            <h3>Mines</h3>
            <div class="user_data">
                <div class="data_element">
                    <h5>Выиграно</h5>
                    <p>{{ games.minesWinSum }}</p>
                </div>
                <div class="data_element">
                    <h5>Проиграно</h5>
                    <p>{{ games.minesLoseSum }}</p>
                </div>
                <div class="data_element">
                    <h5>Кол-во ставок</h5>
                    <p>{{ games.minesBetCount }}</p>
                </div>
                <div class="data_element">
                    <h5>Сумма ставок</h5>
                    <p>{{ games.minesAllBetsSum }}</p>
                </div>
            </div>
        </div>
        <div class="user_games_table">
            <table>
                <thead>
                <tr>
                    <th>Игра</th>
                    <th>Игрок</th>
                    <th>Ставка</th>
                    <th>x</th>
                    <th>Выигрыш</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="game in tableGames">
                        <td :class="(game.gameType == 0)? 'dice' : 'mines' "></td>
                        <td>{{ game.gameDate }}</td>
                        <td>{{ game.sum }}</td>
                        <td>{{ game.multiplier }}</td>
                        <td :class=" (game.win) ? 'win' : '' ">{{ game.canWinSum }}</td>
                    </tr>
                </tbody>
            </table>
            <div class="table_pagination" v-if="paginations > 1">
                <ul>
                    <li v-for ="(pagination, key) in paginationList">
                        <a href="#"
                           :data-page="(pagination != '...') ? pagination
                           : (paginationList[key-1] == 1) ? paginationList[key-1] + 1 : paginationList[key + 1] - 1 "
                           :class="(pagination == pageIndex) ? 'active' : ''">{{ (pagination != '...') ? pagination + 1 : '...' }}</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";
    import pagination from "@/pagination.js";

    export default {
        data() {
            return {
                games: null,
                tableGames: null,
                paginations: null,
                paginationList: null,
                pageIndex: 0,
            }
        },
        mounted() {
            this.getGames();
            this.getGameStats();
        },
        methods: {
            async getGames() {
                let Url = "/admin/getGamesByUserId";
                let data = {
                    "id": localStorage.getItem("userId"),
                    "pageNumber": 1,
                    "pageSize": 20
                };
                let gameStats = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.tableGames = gameStats.items;
                this.paginations = gameStats.totalPages;
                this.pageIndex = gameStats.pageIndex;
                this.paginationList = pagination(this.paginations, this.pageIndex);
            },

            async getGameStats() {
                let Url = "/admin/getGamesStats";
                let data = {
                    "id": localStorage.getItem("userId")
                };
                this.games = await fetchRequest( Url, data, localStorage.getItem('token'));
            }
        }
    }
</script>

