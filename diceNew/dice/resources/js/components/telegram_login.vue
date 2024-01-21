<template>
    <div>
        <telegram-login-temp
            mode="callback"
            telegram-login="funnygamebot"
            size = "large"
            requestAccess = "write"
            @callback="handleTelegramLogin"
        />
    </div>
</template>

<script>
import { telegramLoginTemp } from 'vue3-telegram-login'
    export default {
        components: { telegramLoginTemp },
        methods: {
            handleTelegramLogin(response) {
                console.log('Telegram login response:', response);
            }
        }
    };
</script>
