<template>
    <section id="dice" class="main_game">
        <div class="game_settings">
            <div class="hidden_dice_button"></div>
            <div class="game_bid">
                <p class="bid_title">Ставка </p>
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
                        <input type="text" inputmode="numeric" value="95" @input="diceChanceInput">
                        <span>%</span>
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
            <p class="game_possible_gain_number" :style="(possibleCash > 100000) ? 'font-size: 54px' : ''">{{ possibleCash }}</p>
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
            <div class="game_warningMessage" v-if ="warningMessage && logged.value">Недостаточно средств</div>
            <div class="game_result" v-if="showResult && logged.value" :class="win ? 'win' : '' ">{{diceResult}}</div>
            <button class="dice_Registration_Button" v-if ="noAuthorize && !logged.value" @click="modalBoxToggle">Авторизуйтесь</button>
        </div>
    </section>
    <last-games></last-games>
</template>

<script>
    import {fetchRequest} from "@/fetch.js";

    export default {
        el: "#dice",
        name: "dice",
        data(){
            return {
                sum: 1,
                percent: 95,
                possibleCash: 1.05,
                maxPercent: 95,
                warningMessage: false,
                noAuthorize: false,
                showResult: false,
                diceResult: 0,
                win: false,
                saveChanceValue: false,
            }
        },
        mounted() {
           this.percentPosition();
        },
        computed: {
            minRange() {
                return Math.floor((this.percent / 100) * 999999);
            },

            maxRange() {
                return 999999 - Math.floor((this.percent / 100) * 999999);
            }
        },
        methods: {
            percentPosition() {
                let inputPercent = document.querySelector('.chances_table_title span');
                let input = document.querySelector('.chances_table_title input');

                let temporaryElement = document.createElement('span');
                temporaryElement.style.visibility = 'hidden';
                temporaryElement.style.whiteSpace = 'nowrap';
                temporaryElement.innerText = input.value;
                document.body.appendChild(temporaryElement);
                let textWidth = temporaryElement.offsetWidth;
                document.body.removeChild(temporaryElement);

                inputPercent.style.cssText = `left: calc(50% + ${textWidth - 3}px)` ;
            },

            diceBidInput(input) {
                let value = input.target.value;
                let correctValue = this.diceInputPattern(value);
                let lastChar = correctValue[correctValue.length - 1];
                if (!(lastChar == ".") || correctValue == ""){
                    this.setSum(correctValue);
                } else {
                    input.target.value = correctValue;
                }
            },

            diceChanceInput(input) {
                let value = input.target.value;
                let correctValue = this.diceInputPattern(value);
                let lastChar = correctValue[correctValue.length - 1];
                if (!(lastChar == ".") || correctValue == ""){
                    if (this.saveChanceValue) {
                        correctValue = correctValue.slice(1);
                        this.saveChanceValue = false;
                    }
                    this.setPercent(correctValue);
                } else {
                    input.target.value = correctValue;
                    this.percentPosition();
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

            setPercent(value) {
                if (!value) {
                    this.saveChanceValue = true;
                    this.percent = 1;
                } else if (value <= 1) {
                    this.percent = 1;
                } else if (value >= this.maxPercent) {
                    this.percent = this.maxPercent;
                } else {
                    this.percent = value;
                }
                document.querySelector(".chances_table_title input").value = this.percent;
                this.changePossibleCash();
                this.percentPosition();
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
                    if (value > Number(this.ballance.value)){
                        this.sum = this.ballance.value;
                    } else
                    {
                        this.sum = value;
                    }
                }

                document.querySelector(".bid_table_title input").value = this.sum;
                this.changePossibleCash();
            },

            checkPlayerMoney(){
                if (Number(this.ballance.value|| this.ballance.value < this.sum) < 1) {
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

            gameResult(value, win, button){
                if (win) {
                    this.win = true;
                    this.diceResult = `Выиграли ${value}`;
                } else {
                    this.win = false;
                    if (button == "less") {
                        let number = Math.random() * (999999 - this.maxRange) + this.maxRange;
                        this.diceResult = `Вы проиграли: ${number.toFixed()}`;
                    } else {
                        let number = Math.random() * (this.minRange - 0) + 0;
                        this.diceResult = `Вы проиграли: ${number.toFixed()}`;
                    }
                }
                this.showResult = true;
            },

            authorizationShow(){
                (this.logged.value) ? this.noAuthorize = false : this.noAuthorize = true;
                return this.noAuthorize;
            },

            modalBoxToggle() {
                document.getElementById("modal_block").classList.toggle("active");
            },

            async sendGame(button) {
                if (this.authorizationShow()) return;
                if (this.checkPlayerMoney() || this.sum < 1) return;
                let Url = '/dice/start';
                let data = {
                    userId: localStorage.getItem('id'),
                    persent: Number(this.percent).toFixed(),
                    sum: this.sum,
                };
                const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
                localStorage.setItem("ballance", gameData.newBallance.toFixed(2));
                this.ballance.value = localStorage.getItem("ballance");
                let cash =  ((100.0 / this.percent) * this.sum).toFixed(2);
                this.gameResult(cash, gameData.isSucces, button);
            }

        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector(".bid_table_title input").addEventListener('blur', ()=>{
            let input = document.querySelector(".bid_table_title input");
            if (input.value == '') input.value = 1;
        });
    });
</script>
