<template>
    <section id="mines" class="main_game">
        <div class="mines_steps">
            <p>Шаги</p>
            <swiper-container>
                <swiper-slide v-for="(x,  index) in currentX" :key="index"  :virtualIndex="index">
                    <div class="mines_steps_slide">
                        <p>{{ (sum * x).toFixed(2) }}</p>
                        <p>x{{ x }}</p>
                    </div>
                </swiper-slide>
            </swiper-container>
        </div>
        <div class="mines_game" @click="pickMines">
            <div class="mines-row" v-for="minesRow in cells">
                  <div class="mines_cell" v-for="minesCol in minesRow"
                       :class="(minesCol.IsOpen === true) ? 'success' :
                                (minesCol.IsOpen === 'fail') ? 'fail' : '' "></div>
            </div>
        </div>
        <div class="mines_play">
            <button @click="finishGame" v-if="currentGame">Закончить</button>
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
                        <button @click="setSum(1)">Min</button>
                        <button @click="setSum(10000000)">Max</button>
                        <button @click="setSum((sum * 2).toFixed(2))">x2</button>
                        <button @click="setSum((sum / 2).toFixed(2))">1/2</button>
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
                        <p>{{ minesCount }}</p>
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
            step: 0,
            cells: null,
            slider: null,
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
        }
    },
    mounted() {
        this.getCreatedGame();
        this.sliderInitialise();
    },
    methods: {
        sliderChange() {
            this.slider.swiper.update();
        },
        minesInput(input) {
            let value = input.target.value;
            let correctValue = this.diceInputPattern(value);
            let lastChar = correctValue[correctValue.length - 1];
            if (lastChar != "." && correctValue){
                this.setSum(correctValue);
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
        sliderInitialise() {
            let sliderParams = {
                slidesPerView: 2,
                centeredSlides: true,
                navigation: true,
                pagination: true,
                initialSlide: this.step,
            };
            this.slider = document.querySelector('swiper-container');
            Object.assign(this.slider, sliderParams);
            this.slider.initialize();
        },

        setSum(value) {
            this.checkPlayerMoney();
            if (!value) {
                this.sum = 1;
                return;
            } else {
                if (value <= 1) {
                    this.sum = 1;
                } else
                if (value > Number(this.ballance.value)){
                    if (!this.warningMessage) this.sum = this.ballance.value;
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
            let progress;
            if (change) {
                progress = (value / range.max) * 100;
                this.minesCount = value;
                range.value = value;
            } else {
                progress = (range.value / range.max) * 100;
                this.minesCount = range.value;
            }
            range.style.background = `linear-gradient(to right, #537DFF ${progress}%, #D8E2EE ${progress}%)`;
            this.slider.swiper.slideTo(0);
        },

        async pickMines(e) {
            if (e.target.classList.contains('mines_cell') && this.currentGame && !e.target.classList.contains('success') ) {
                let parentElement = e.target.parentElement;
                let y = Array.prototype.indexOf.call(parentElement.children, e.target);
                let x = Array.prototype.indexOf.call(parentElement.parentElement.children, parentElement);
                if (await  this.openCell(x, y)) {
                    this.cells[x][y].IsOpen = true;
                    this.slider.swiper.slideTo(++this.step);
                } else {
                    this.cells[x][y].IsOpen = 'fail';
                    this.currentGame = false;
                }
                console.log(this.cells);
                console.log(this.startCells);
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
            if (this.checkPlayerMoney() || this.sum < 1 || !this.logged.value) return;
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
                this.slider.swiper.slideTo(this.step = 0);

            } else {
                this.warningMessage = gameData.info;
            }
        },

        async finishGame() {
            if (!this.logged.value) return;
            let Url = '/mines/finishMinesGame';
            let data = {
                id: localStorage.getItem('id')
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.currentGame = false;
        },

        async getCreatedGame() {
            if (!this.logged.value) return;
            let Url = '/mines/getMinesGame';
            let data = {
                id: localStorage.getItem('id')
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            if (gameData.cells) {
                this.cells = gameData.cells;
                this.currentGame = true;
                this.step = gameData.openedCount;
                this.sum = gameData.betSum;
                this.changeBombCount(gameData.minesCount, true)
                this.slider.swiper.slideTo(this.step);
                console.log(this.step);
                return;
            }
            this.cells = [
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}],
                [{}, {}, {}, {}, {}]
            ];
        },

        async openCell(x, y) {
            if (!this.logged.value || !this.currentGame) return;
            let Url = '/mines/openCell';
            let data = {
                userId: localStorage.getItem('id'),
                x: x,
                y: y,
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            return gameData.succes;
        }
    }
}

</script>
