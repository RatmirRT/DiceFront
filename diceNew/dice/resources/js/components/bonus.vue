<template>
    <section>
        <div class="bonus">
            <h2>Бонус</h2>
            <div class="bonus_block">
                <img src="/image/bonusMen.png" alt="">
                <div class="bonus_desc">
                    <p>Получай ежедневный бонус до 100 на свой баланс</p>
                    <button>Получить</button>
                </div>
            </div>
            <div class="button_accept" v-if="!PC.value">
                <button @click="">Получить</button>
            </div>
        </div>
    </section>
</template>
<script>
    export default {

    }
</script>
