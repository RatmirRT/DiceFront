<template>

    <section class="promocode">
        <div class="promocode_generate">
            <div class="user_menu" @click="menuChanger">
                <button :class=" (simple)? 'active' : '' " data-target="simple">Обычный</button>
                <button :class=" (referal)? 'active' : '' " data-target="referal">Реферальный</button>
            </div>
            <component-simple v-if="simple"></component-simple>
            <component-referal v-if="referal"></component-referal>
        </div>
        <component-table></component-table>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                simple: true,
                referal: false,
            }
        },
        mounted() {

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
