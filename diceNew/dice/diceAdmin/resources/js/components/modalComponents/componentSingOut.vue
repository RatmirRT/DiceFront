<template>
    <div class="modal_signOut">
        <h5>Вы уверены, что хотите выйти?</h5>
        <div class="modal_signOut_buttons">
            <button class="stay" @click="closeModal">остаться</button>
            <button class="out" @click="logOut">выйти</button>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        logOut() {
            localStorage.clear();
            this.logged.value = false;
        },
        closeModal() {
            document.getElementById('modal_block').classList.toggle("active");
        }
    }
}
</script>
