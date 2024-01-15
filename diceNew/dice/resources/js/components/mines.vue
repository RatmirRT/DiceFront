<template>
    <section id="mines" class="main_game">
        <div class="game_board">
            <div class="container">
                <div class="mines_steps">
                    <p>Шаги</p>
                    <swiper-container>
                        <swiper-slide v-for="(x,  index) in currentX" :key="index"  :virtualIndex="index"  :class="(x == 25)? 'last': ''" class="mines_steps_container">
                            <div class="mines_steps_slide" :class="(index == step && currentGame) ? 'active': ''">
                                <p>{{ (sum * x).toFixed(2) }}</p>
                                <p>x{{ x }}</p>
                            </div>
                        </swiper-slide>
                    </swiper-container>
                </div>
                <div class="mines_game" @click="pickMines">
                    <div class="mines-row" v-for="minesRow in cells">
                          <div class="mines_cell" v-for="minesCol in minesRow"
                               :class="(minesCol.IsOpen === true && minesCol.IsMined === false || minesCol.IsMined === false ) ? 'success' :
                                        (minesCol.IsMined === true) ? 'fail' : '',
                                        (minesCol.IsOpen === false) ? 'notOpen': ''"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="game_settings">
            <div class="mines_play">
                <button @click="finishGame" v-if="currentGame" :disabled="(step == -1)">
                    {{ (step == -1) ? 'Выберите ячейку' : 'Забрать ' + (sum * currentX[step]).toFixed(2)}}
                </button>
                <button @click="startMines" v-if="!currentGame">Играть</button>
            </div>
            <div class="warning" v-if="warningMessage">
                <p>{{ warningMessage }}</p>
            </div>
            <div class="mines_settings">
                <div class="mines_bid">
                    <p class="bid_title">Ставка</p>
                    <div class="mines_bid_settings">
                        <div class="button_section">
                            <button @click="setSum(1)" :disabled="currentGame">Min</button>
                            <button @click="setSum(10000000)" :disabled="currentGame">Max</button>
                            <button @click="setSum((sum * 2).toFixed(2))" :disabled="currentGame">x2</button>
                            <button @click="setSum((sum / 2).toFixed(2))" :disabled="currentGame">1/2</button>
                        </div>
                        <div class="bid_value">
                            <input type="text" value="10.00" @input="minesInput" :disabled="currentGame">
                        </div>
                    </div>
                </div>
                <div class="mines_bomb">
                    <p class="bid_title">Количество мин</p>
                    <div class="mines_bomb_setting">
                        <div class="mines_bomb_range">
                            <input type="range" min="2" max="24" value="1" @input="changeBombCount"  :disabled="currentGame">
                        </div>
                        <div class="mines_bomb_count">
                            <input type="number" @input="minesInputBomb" value="2" :disabled="currentGame" inputmode="numeric">
                            <i></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import {fetchRequest} from "@/fetch.js";
import { register } from 'swiper/element/bundle';
import Swiper from "swiper";

register();
export default {
    data() {
        return {
            minesCount: 2,
            sum: 10,
            currentGame: false,
            warningMessage: null,
            step: -1,
            cells: null,
            slider: null,
            picked: false,
        }
    },
    computed:{
        X: function() {
            return [
                [1.09, 1.19, 1.3, 1.43, 1.58, 1.75, 1.96, 2.21, 2.5, 2.86, 3.3, 3.85, 4.55, 5.45, 6.67, 8.33, 10.71, 14.29, 20, 30, 50, 100, 300],
                [1.14, 1.3, 1.49, 1.73, 2.02, 2.37, 2.82, 3.38, 4.11, 5.05, 6.32, 8.04, 10.45, 13.94, 19.17, 27.38, 41.07, 65.7, 115, 230, 575, 2300],
                [1.19, 1.43, 1.73, 2.11, 2.61, 3.26, 4.13, 5.32, 6.95, 9.27, 12.64, 17.69, 25.56, 38.33, 60.24, 100.4, 180.71, 361.43, 843.33, 2530, 12650],
                [1.25, 1.58, 2.02, 2.61, 3.43, 4.57, 6.2, 8.59, 12.16, 17.69, 26.54, 41.28, 67.08, 115, 210.83, 421.67, 948.75, 2530, 8855, 53130],
                [1.32, 1.75, 2.37, 3.26, 4.57, 6.53, 9.54, 14.31, 22.12, 35.38, 58.97, 103.21, 191.67, 383.33, 843.33, 2108.33, 6325, 25300, 177100],
                [1.39, 1.96, 2.82, 4.13, 6.2, 9.54, 15.1, 24.72, 42.02, 74.7, 140.06, 280.13, 606.94, 1456.67, 4005.83, 13352.78, 60087.5, 480700],
                [1.47, 2.21, 3.38, 5.32, 8.59, 14.31, 24.72, 44.49, 84.04, 168.08, 360.16, 840.38, 2185, 6555, 24035, 120175, 1081575],
                [1.56, 2.5, 4.11, 6.95, 12.16, 22.12, 42.02, 84.04, 178.58, 408.19, 1020.47, 2857.31, 9286.25, 37145, 204297.5, 2042975],
                [1.67, 2.86, 5.05, 9.27, 17.69, 35.38, 74.7, 168.08, 408.19, 1088.5, 3265.49, 11429.23, 49526.67, 297160, 3268760],
                [1.79, 3.3, 6.32, 12.64, 26.54, 58.97, 140.06, 360.16, 1020.47, 3265.49, 12245.6, 57146.15, 371450, 4457400],
                [1.92, 3.85, 8.04, 17.69, 41.28, 103.21, 280.13, 840.38, 2857.31, 11429.23, 57146.14, 400023.08, 5200300],
                [2.08, 4.55, 10.45, 25.56, 67.08, 191.67, 606.94, 2185, 9286.25, 49526.67, 371450, 5200300],
                [2.27, 5.45, 13.94, 38.33, 115, 383.33, 1456.67, 6555, 37145, 297160, 4457400],
                [2.5, 6.67, 19.17, 60.24, 210.83, 843.33, 4005.83, 24035, 204297.5, 3268760],
                [2.78, 8.33, 27.38, 100.4, 421.67, 2108.33, 13352.78, 120175, 2042975],
                [3.13, 10.71, 41.07, 180.71, 948.75, 6325, 60087.5, 1081575],
                [3.57, 14.29, 65.71, 361.43, 2530, 25300, 480700],
                [4.17, 20, 115, 843.33, 8855, 177100],
                [5, 30, 230, 2530, 53130],
                [6.25, 50, 575, 12650],
                [8.33, 100, 2300],
                [12.5, 300],
                [25]
            ]
        },
        currentX: function() {
            return this.X[this.minesCount - 2];
        }
    },
    watch: {
        minesCount(newValue, oldValue) {
            setTimeout(this.sliderChange, 500);
        },
        sum (newValue, oldValue) {
            setTimeout(this.sliderChange, 500);
        }
    },
    mounted() {
        this.getCreatedGame();
        this.sliderInitialise();
        this.bombPosition();
    },
    methods: {
        sliderChange() {
            this.slider.swiper.update();
        },

        minesInputBomb(input) {
            let value = input.target.value;
            let correctValue = this.minesBombPattern(value);
            if ( correctValue == '' ||  correctValue == 1) {
                this.minesCount = 2;
                input.target.value = correctValue;
                this.bombPosition();
                return;
            }
            if ( correctValue > 24 ) {
                this.minesCount = input.target.value = 24;
                this.bombPosition();
                this.changeBombCount(this.minesCount, true)
                return;
            }
            if ( correctValue < 2 ) {
                this.minesCount = input.target.value = 2;
                this.bombPosition();
                this.changeBombCount(this.minesCount, true)
                return;
            }
            if (correctValue){
                this.minesCount = correctValue;
                this.bombPosition();
                this.changeBombCount(this.minesCount, true)
                return;
            }

        },

        minesBombPattern(value) {
            let pattern =  /^\d+$/;
            let correctValue;
            let test = (pattern.test(value));
            if (test || value == '' ) {
                return value;
            } else {
                correctValue = value.slice(0, -1);
                if (!pattern.test(correctValue)) {
                    correctValue = this.minesInputPattern(correctValue);
                }
                return correctValue;
            }
        },

        bombPosition() {
            let inputPercent = document.querySelector('.mines_bomb_count i');
            let input = document.querySelector('.mines_bomb_count input');

            let temporaryElement = document.createElement('span');
            temporaryElement.style.visibility = 'hidden';
            temporaryElement.style.whiteSpace = 'nowrap';
            temporaryElement.innerText = input.value;
            document.body.appendChild(temporaryElement);
            let textWidth = (temporaryElement.offsetWidth <= 16) ? temporaryElement.offsetWidth + 2 : temporaryElement.offsetWidth - 4.5;
            document.body.removeChild(temporaryElement);
            inputPercent.style.cssText = `left: calc(50% + ${textWidth - 3}px)` ;
        },

        minesInput(input) {
            let value = input.target.value;
            let correctValue = this.minesInputPattern(value);
            let lastChar = correctValue[correctValue.length - 1];
            if (lastChar != "." && correctValue){
                this.setSum(correctValue);
            } else {
                input.target.value = correctValue;
            }
        },

        minesInputPattern(value){
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
                    correctValue = this.minesInputPattern(correctValue);
                }
                return correctValue;
            }
        },

        sliderInitialise() {
            let sliderParams = {
                slidesPerView: 'auto',
                navigation: true,
                pagination: true,
                initialSlide: 0,
                spaceBetween: 10,
            };
            this.slider = document.querySelector('swiper-container');
            Object.assign(this.slider, sliderParams);
            this.slider.initialize();
        },

        setSum(value) {
            this.checkPlayerMoney();
            if (!value) {
                this.sum = 1;
            } else {
                if (value <= 1) {
                    this.sum = 1;
                } else
                if (value > Number(this.ballance.value) || value >= 100000){
                    if (!this.warningMessage) {
                        ( this.ballance.value < 100000 ) ? this.sum = this.ballance.value : this.sum = 100000;
                    }
                    else {
                        (value <= 100000) ? this.sum = value : this.sum = 1;
                    }
                } else
                {
                    this.sum = value;
                }
            }
            document.querySelector(".bid_value input").value = this.sum;
        },

        changeBombCount( value, change = false ) {
            let range = document.querySelector(".mines_bomb_range input");
            let input = document.querySelector(".mines_bomb_count input");
            let progress;
            if (change) {
                progress = (value / range.max) * 100;
                this.minesCount = value;
                range.value = value;
                input.value = value;
                this.bombPosition();
            } else {
                progress = (range.value / range.max) * 100;
                this.minesCount = range.value;
                input.value = this.minesCount;
                this.bombPosition();
            }
            range.style.background = `linear-gradient(to right, #537DFF ${progress}%, #D8E2EE ${progress}%)`;
            this.slider.swiper.slideTo(0);
        },

        async pickMines(e) {
            if (this.picked || this.banned.value) return;
            if (e.target.classList.contains('mines_cell') && this.currentGame && !e.target.classList.contains('success') ) {
                this.picked = true;
                let parentElement = e.target.parentElement;
                let y = Array.prototype.indexOf.call(parentElement.children, e.target);
                let x = Array.prototype.indexOf.call(parentElement.parentElement.children, parentElement);
                let request = await  this.openCell(x, y);
                if (request.succes) {
                    this.cells[x][y].IsOpen = true;
                    this.cells[x][y].IsMined = false;
                    this.slider.swiper.slideTo(++this.step);
                } else {
                    this.cells = JSON.parse(request.result.cells);
                    console.log(this.cells);
                    this.currentGame = false;
                }
                this.picked = false;
                console.log(this.cells);
            }
        },

        checkPlayerMoney(){
            if (Number(this.ballance.value|| this.ballance.value < this.sum) < 1) {
                this.warningMessage = "Недостаточно средств";
                return true
            }
            else {
                this.warningMessage = null;
                return false
            }
        },

        async startMines() {
            if ( this.banned.value || this.checkPlayerMoney() || this.sum < 1 || !this.logged.value) return;
            let Url = '/mines/createMinesGame';
            let data = {
                userId: localStorage.getItem('id'),
                sum: this.sum,
                minesCount: this.minesCount
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            console.log(gameData);
            if (gameData.succes) {
                this.currentGame = true;
                this.cells = [
                    [{}, {}, {}, {}, {}],
                    [{}, {}, {}, {}, {}],
                    [{}, {}, {}, {}, {}],
                    [{}, {}, {}, {}, {}],
                    [{}, {}, {}, {}, {}]
                ];
                this.slider.swiper.slideTo(this.step = -1);

            } else {
                this.warningMessage = gameData.info;
            }
        },

        async finishGame() {
            if (!this.logged.value || this.banned.value || this.step == -1) return;
            let Url = '/mines/finishMinesGame';
            let data = {
                id: localStorage.getItem('id')
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.ballance.value = gameData.userBallance.toFixed(2);
            localStorage.setItem("ballance", this.ballance.value);
            this.cells = JSON.parse(gameData.cells);
            console.log(this.cells);
            this.currentGame = false;
        },

        async getCreatedGame() {
            if (!this.logged.value || this.banned.value) {
                this.cells = [
                                [{}, {}, {}, {}, {}],
                                [{}, {}, {}, {}, {}],
                                [{}, {}, {}, {}, {}],
                                [{}, {}, {}, {}, {}],
                                [{}, {}, {}, {}, {}]
                            ];
                return;
            }
            let Url = '/mines/getMinesGame';
            let data = {
                id: localStorage.getItem('id')
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            if (gameData.cells) {
                this.cells = gameData.cells;
                this.currentGame = true;
                this.step = gameData.openedCount - 1;
                this.sum = gameData.betSum;
                this.changeBombCount(gameData.minesCount, true)
                this.slider.swiper.slideTo(this.step);
                console.log(this.cells);
                return;
            }
            console.log(true);
            this.cells = [
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}]
            ];
        },

        async openCell(x, y) {
            if (!this.logged.value || !this.currentGame || this.banned.value) return;
            let Url = '/mines/openCell';
            let data = {
                userId: localStorage.getItem('id'),
                x: x,
                y: y,
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            return gameData;
        }
    }
}

</script>
