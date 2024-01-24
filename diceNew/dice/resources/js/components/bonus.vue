<template>
    <section>
        <div class="bonus">
            <h2>Бонус</h2>
            <div class="bonus_block">
                <img src="/image/bonusMen.png" alt="">
                <div class="bonus_desc">
                    <p>Получай ежедневный бонус до 100 на свой баланс</p>
                    <button @click="getBonus">Получить</button>
                </div>
            </div>
            <p class="bonusResult" v-if="result.message" :class="result.type">{{ result.message }}</p>
            <div class="button_accept" v-if="!PC.value">
                <button @click="getBonus">Получить</button>
            </div>
        </div>
    </section>
</template>
<script>
    import {fetchRequestString} from "@/fetch.js";
    export default {
        data() {
          return {
              result: {
                  message: null,
                  type: null,
              },
          }
        },
        methods: {
            async getBonus() {
                let Url = '/useController/getDailyBonusByUserId';
                let data = {
                    id: localStorage.getItem('id'),
                };
                const bonusAnswer = await fetchRequestString(Url, data, localStorage.getItem('token'));
                this.bonusMessage(bonusAnswer)
            },

            bonusMessage(message) {
                switch (message) {
                    case 'Alredy use bonus':
                        this.result.message = 'Бонус уже получен!';
                        this.result.type = 'warning';
                        break;
                    case 'Succes':
                        this.result.message = 'Вы получили на баланс!';
                        this.result.type = 'success';
                        break;
                    case 'Telegram use bonus':
                        this.result.message = 'Для получения бонуса привяжите соц. сети';
                        this.result.type = 'warning';
                        break;

                }
            }
        }
    }
</script>
