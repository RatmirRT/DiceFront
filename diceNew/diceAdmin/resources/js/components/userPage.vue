<template>
    <section id="user">
        <div class="user_menu" @click="menuChanger">
            <button :class=" (data)? 'active' : '' " data-target="data">Данные</button>
            <button :class=" (requisites)? 'active' : '' " data-target="requisites">Реквы</button>
            <button :class=" (promocodes)? 'active' : '' " data-target="promocodes">Промокоды</button>
            <button :class=" (games)? 'active' : '' " data-target="games">Игры</button>
            <button :class=" (payment)? 'active' : '' " data-target="payment">История деп/вывод</button>
            <button :class=" (multyAccount)? 'active' : '' " data-target="multyAccount">Мультиаккаунты</button>
        </div>
        <component-data v-if="data"></component-data>
        <component-requisites v-if="requisites"></component-requisites>
        <component-promocodes v-if="promocodes"></component-promocodes>
        <component-games v-if="games"></component-games>
        <component-payment v-if="payment"></component-payment>
        <component-multy-account v-if="multyAccount"></component-multy-account>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                data: true,
                requisites: false,
                promocodes: false,
                games: false,
                payment: false,
                multyAccount: false,
            }
        },
        methods: {
            menuChanger(e) {
                let target = e.target;
                if (target.tagName != 'BUTTON') return;
                this.changeActiveMenu(target.dataset.target);
            },

            changeActiveMenu(target){
                for (let prop in this.$data) {
                    if (this.$data.hasOwnProperty(target) && prop !== target) {
                        this.$data[prop] = false;
                    }
                    this.$data[target] = true;
                }
            }

        }
    }
</script>
