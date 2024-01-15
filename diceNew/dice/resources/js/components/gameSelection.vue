<template>
    <div class="gameSection" v-if="!PC.value">
        <div class="gameSection_head">
            <button :class="(game.value == 'dice') ? 'active' : ''" @click="activeDice">Dice</button>
            <button :class="(game.value == 'mines') ? 'active' : ''" @click="activeMines">Mines</button>
        </div>
    </div>
    <dice v-if="game.value == 'dice'"></dice>
    <mines v-if="game.value == 'mines'"></mines>
    <last-games></last-games>
</template>

<script>
    export default {
        methods: {
            activeDice() {
                this.game.value = 'dice';
            },
            activeMines() {
                this.game.value = 'mines'
            }
        }

    }
</script>
