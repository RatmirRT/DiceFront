<template>
    <section class="notice" v-if="showNotice">
        <p class="notice_message">Получи по ебалу прямо сейчас за привязку Telegram аккаунта и подписку на канал</p>
        <button class="notice_close" @click="closeNotice"></button>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                showNotice: true,
            }
        },
        methods: {
            closeNotice() {
                (this.showNotice) ? this.showNotice = false : this.showNotice = true;
            }
        }
    }
</script>
