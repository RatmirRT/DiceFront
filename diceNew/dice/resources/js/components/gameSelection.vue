<template>
    <div class="gameSection">
        <div class="gameSection_head">
            <button :class="(dice) ? 'active' : ''" @click="activeDice">Dice</button>
            <button :class="(mines) ? 'active' : ''" @click="activeMines">Mines</button>
        </div>
    </div>
    <dice v-if="dice"></dice>
    <mines v-if="mines"></mines>
    <last-games></last-games>
</template>

<script>
    export default {
        data() {
            return {
                dice: false,
                mines: true,
            }
        },
        methods: {
            activeDice() {
                this.dice = true;
                this.mines = false;
            },
            activeMines() {
                this.dice = false;
                this.mines = true;
            }
        }

    }
</script>
