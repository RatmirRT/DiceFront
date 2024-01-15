<template>
    <div class="side_gameSelection" @click="selectGame">
        <h4>Выбор игры</h4>
        <router-link :to="{ name: 'home' }">
            <div class="side_gameSelection_dice" :class=" (menu.dice && gameDirectory)? 'active' : '' " data-target="dice">
                <p>Dice</p>
            </div>
        </router-link>
        <router-link :to="{ name: 'home' }">
            <div class="side_gameSelection_mines" :class=" (menu.mines && gameDirectory)? 'active' : '' " data-target="mines">
                <p>Mines</p>
            </div>
        </router-link>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menu: {
                    dice: true,
                    mines: false,
                },
            }
        },
        computed: {
            gameDirectory() {
                return this.$route.path === '/';
            }
        },
        methods: {
            selectGame(e) {
                let target = e.target;
                if (target.tagName != 'DIV') return;
                this.changeActiveGame(target.dataset.target);
            },

            changeActiveGame(target) {
                for (let prop in this.menu) {
                    if (this.menu.hasOwnProperty(target) && prop !== target) {
                        this.menu[prop] = false;
                    }
                    this.menu[target] = true;
                }
                this.game.value = target;
            }
        }
    }
</script>
