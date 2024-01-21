<template>
    <section id="topDW">
        <div class="date">
            <input class="date_picker date_startDate" type="date" :max="startDate" v-model="startDate"> -
            <input class="date_picker date_endDate" type="date" :min="startDate" :max="today" v-model="endDate">
        </div>
        <div class="topDW_block">
            <div class="user_menu" @click="menuChanger">
                <button :class=" (menu.paymentShow)? 'active' : '' " data-target="paymentShow">Пополнил</button>
                <button :class=" (menu.withdrawShow)? 'active' : '' " data-target="withdrawShow">Вывел</button>
            </div>
            <component-d v-if="menu.paymentShow" :startDate="startDate" :endDate="endDate"></component-d>
            <component-w v-if="menu.withdrawShow" :startDate="startDate" :endDate="endDate"></component-w>
        </div>
    </section>
</template>
<script>
export default {
    data() {
        return {
            menu: {
                paymentShow: true,
                withdrawShow: false,
            },
            startDate: null,
            endDate: null,
            today: null
        }
    },
    mounted() {
        this.getDate();
    },
    methods: {
        menuChanger(e) {
            let target = e.target;
            if (target.tagName != 'BUTTON') return;
            this.changeActiveMenu(target.dataset.target);
        },
        changeActiveMenu(target){
            for (let prop in this.menu) {
                if (this.menu.hasOwnProperty(target) && prop !== target) {
                    this.menu[prop] = false;
                }
                this.menu[target] = true;
            }
        },
        getDate() {
            let date = new Date();
            this.endDate = date.toISOString().split('T')[0];
            this.today = this.endDate;
            date.setDate(date.getDate() - 1);
            this.startDate = date.toISOString().split('T')[0];
            document.querySelector(".date_startDate").value = this.startDate;
            document.querySelector(".date_endDate").value = this.endDate;
        }
    }
}
</script>
