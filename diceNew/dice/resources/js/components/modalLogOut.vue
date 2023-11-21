<template>
    <div class="modal_signOut active">
        <h5>Вы уверены, что хотите выйти?</h5>
        <div class="modal_signOut_buttons">
            <button class="stay" @click="closeModal">остаться</button>
            <button class="out" @click="logOut">выйти</button>
        </div>
    </div>
</template>

<script>
  import socketUserCount from "@/socketUserCount.js";
    export default {
        methods: {
            logOut(e) {
                e.preventDefault();
                socketUserCount.UserDisconnected();
                socketUserCount.userCountDisconect();
                localStorage.clear();
                this.logged.value = false;
                this.ballance.value = 10000;
                document.getElementById("modal_block").classList.toggle("active");
            },
            closeModal(e) {
                e.preventDefault();
                document.getElementById("modal_block").classList.toggle("active");
            }
        }
    }
</script>

