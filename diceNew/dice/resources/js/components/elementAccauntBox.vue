<template>
    <section class="account_box">
        <div class="account_box-img">
            <img src="image/accountIcon.svg" alt="">
        </div>
        <div class="account_box-data">
            <h2 class="account_box-name">{{userName}}</h2>
            <p class="account_box-balance">{{ballance.value}}</p>
        </div>
        <div class="account_box-buttons">
            <router-link class="account_box-replenish" :to=" logged.value ? { name: 'replenish' } : '#'">ПОПОЛНИТЬ</router-link>
            <button class="account_box-withdraw">ВЫВЕСТИ</button>
        </div>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                userName: localStorage.getItem('name'),
            }
        }
    }
</script>
