<template>
    <section id="dice" class="main_game">
        <div class="game_settings">
            <div class="hidden_dice_button"></div>
            <div class="game_bid">
                <p class="bid_title">Ставка</p>
                <div class="bid_table">
                    <div class="bid_table_title">
                        <input type="text" inputmode="numeric" value="1" @input="diceBidInput">
                    </div>
                    <div class="bid_table_minmax">
                        <button @click="setSum(1)">Min</button>
                        <button @click="setSum(10000000)">Max</button>
                    </div>
                    <div class="bid_table_col">
                        <button @click="setSum((sum * 2).toFixed(2))">x2</button>
                        <button @click="setSum((sum / 2).toFixed(2))">1/2</button>
                    </div>
                </div>
            </div>
            <div class="game_chances">
                <p class="chances_title">Шанс</p>
                <div class="chances_table">
                    <div class="chances_table_title">
                        <input type="text" inputmode="numeric" value="95%" @input="diceChanceInput">
                    </div>
                    <div class="chances_table_minmax">
                        <button @click="setPercent(1, true)">Min</button>
                        <button @click="setPercent(95, true)">Max</button>
                    </div>
                    <div class="chances_table_col">
                        <button @click="setPercent((percent * 2).toFixed(2), true)">x2</button>
                        <button @click="setPercent((percent / 2).toFixed(2), true)">1/2</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="game_possible_gain">
            <p class="game_possible_gain_number">{{ possibleCash }}</p>
            <p class="game_possible_gain_desc">Возможный выигрыш</p>
        </div>
        <div class="game_more_less_buttons">
            <div class="game_less_button">
                <button @click="sendGame('more')">Меньше</button>
                <p>0-{{minRange}}</p>
            </div>
            <div class="game_more_button">
                <button @click="sendGame('less')">Больше</button>
                <p>{{maxRange}}-999999</p>
            </div>
        </div>
        <div class="gameResulBlock">
            <div class="game_warningMessage" v-if ="warningMessage">Недостаточно средств</div>
        </div>
    </section>
</template>

<script>
    import { fetchRequest } from '@/../js/fetch.js';

    export default {
        el: "#dice",
        name: "dice",
        data(){
            return {
                playerMoney: (localStorage.getItem('ballance')) ? localStorage.getItem('ballance') : 10000,
                sum: 1,
                percent: 75,
                possibleCash: 1.05,
                maxPercent: 95,
                warningMessage: false,
            }
        },
        computed: {
            minRange() {
                return Math.floor((this.percent / 100) * 999999);
            },

            maxRange() {
                return 999999 - Math.floor((this.percent / 100) * 999999);
            },
        },
        methods: {
            diceBidInput(input) {
                let value = input.target.value;
                let correctValue = this.diceInputPattern(value);
                let lastChar = correctValue[correctValue.length - 1];
                if (!(lastChar == "." || correctValue == "")){
                    this.setSum(correctValue);
                } else {
                    input.target.value = correctValue;
                }
            },

            diceChanceInput(input) {
                let value = input.target.value;
                let correctValue = this.diceInputPattern(value);
                let lastChar = correctValue[correctValue.length - 1];
                if (!(lastChar == "." || correctValue == "")){
                    this.setPercent(correctValue);
                } else {
                    input.target.value = correctValue;
                }
            },

            diceInputPattern(value){
                let pattern =  /^\d+([.,]\d{0,2})?$/g;
                let correctValue;
                value = value.replace(",", ".");
                let test = (pattern.test(value));
                if (test || value == '' ) {
                    return value;
                } else
                {
                    correctValue = value.slice(0, -1);
                    if (!pattern.test(correctValue)) {
                        correctValue = this.diceInputPattern(correctValue);
                    }
                    return correctValue;
                }
            },

            setPercent(value, marker = false) {
                if (!value) {
                    this.percent = 1;
                    return;
                } else {
                    if (value <= 1) {
                        this.percent = 1;
                    } else if (value >= this.maxPercent){
                        this.percent = this.maxPercent;
                    } else {
                        this.percent = value;
                    }
                }

                document.querySelector(".chances_table_title input").value = this.percent + ((marker)? "%" : "");
                this.changePossibleCash();
            },

            setSum(value) {
                if (this.checkPlayerMoney()) {
                    document.querySelector(".bid_table_title input").value = value;
                } else
                if (!value) {
                    this.sum = 1;
                    return;
                } else {
                    if (value <= 1) {
                        this.sum = 1;
                    } else
                    if (value > Number(this.playerMoney)){
                        this.sum = this.playerMoney;
                    } else
                    {
                        this.sum = value;
                    }
                }

                document.querySelector(".bid_table_title input").value = this.sum;
                this.changePossibleCash();
            },

            checkPlayerMoney(){
                if (Number(this.playerMoney || this.playerMoney < this.sum) < 1) {
                    this.warningMessage = true;
                    return true
                }
                else {
                    this.warningMessage = false;
                    return false
                }
            },

            changePossibleCash() {
                let win = ((100.0 / this.percent) * this.sum).toFixed(2);
                Number.isFinite(Number(win)) ? this.possibleCash = win: this.possibleCash = 0;
            },

            // changeBalance(value) {
            //    document.querySelector(".account_box-balance").innerHTML = value;
            // },

            gameResult(value, win, button){
                let gameBlock = document.querySelector(".gameResulBlock");
                let result = document.createElement('div');
                if (win) {
                    result.classList.add('game_result', "win");
                    result.innerHTML = "Вы выиграли " + value;
                } else {
                    result.classList.add('game_result');
                    if (button == "less") {
                        let number = Math.random() * (999999 - this.maxRange) + this.maxRange;
                        result.innerHTML = `Вы проиграли: ${number.toFixed()}`;
                    } else {
                        let number = Math.random() * (this.minRange - 0) + 0;
                        result.innerHTML = `Вы проиграли: ${number.toFixed()}`;
                    }
                }
                gameBlock.innerHTML = "";
                gameBlock.append(result);
            },

            // checkBallance(value) {
            //     if (!value) {
            //         this.#playerMoney = 10000;
            //     } else {
            //         this.#playerMoney = localStorage.getItem('ballance');
            //     }

            // },

            // noAuthorize(value){
            //     let registrationButton = document.querySelector(".dice_Registration_Button");
            //     if (registrationButton) registrationButton.remove();
            //     if (!value) {
            //         let neWRegistrationButton = document.createElement("button");
            //         neWRegistrationButton.classList.add("dice_Registration_Button");
            //         neWRegistrationButton.innerHTML = "Авторизуйтесь";
            //         neWRegistrationButton.addEventListener('click', modalBoxToggle);
            //         document.querySelector(".gameResulBlock").append(neWRegistrationButton);
            //         return false;
            //     }

            //     return true;
            // },

            async sendGame(button) {
                if (this.checkPlayerMoney() || this.sum < 1 || !localStorage.getItem('token')) return;
                let Url = '/dice/start';
                let data = {
                    userId: localStorage.getItem('id'),
                    persent: Number(this.percent).toFixed(),
                    sum: this.sum,
                };
                const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
                this.playerMoney = gameData.newBallance.toFixed(2);
                localStorage.setItem("ballance", gameData.newBallance.toFixed(2));
                // this.changeBalance(this.#playerMoney);
                let cash =  ((100.0 / this.percent) * this.sum).toFixed(2);
                this.gameResult(cash, gameData.isSucces, button);
            }

        },
        mounted() {
            console.log(Math.floor((this.percent / 100) * 999999));
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector(".chances_table_title input").addEventListener('focus', ()=>{
            let input = document.querySelector(".chances_table_title input");
            input.value = input.value.slice(0, -1);
        });
        document.querySelector(".chances_table_title input").addEventListener('blur', ()=>{
            let input = document.querySelector(".chances_table_title input");
            if ( input.value == '') input.value = 1;
            input.value = input.value + "%";
        });
        document.querySelector(".bid_table_title input").addEventListener('blur', ()=>{
            let input = document.querySelector(".bid_table_title input");
            if (input.value == '') input.value = 1;
        });
    });
</script>
