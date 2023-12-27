<template>
    <section  v-if="showNotice">
        <div class="notice warning" v-if="banned.value">
            <p class="notice_message">Ваш аккаунт заблокирован Причина: мультиаккаунты</p>
        </div>
        <div class="notice" v-else>
            <p class="notice_message">Получи бонус за привязку Telegram аккаунта и подписку на канал</p>
            <button class="notice_close" @click="closeNotice"></button>
        </div>
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
