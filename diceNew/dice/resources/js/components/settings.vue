<template>
    <section>
        <div class="settings_form">
            <div class="title">
                <h2>Настройки</h2>
                <p>ID: 46</p>
            </div>
            <div class="description">
                <p>Для получения бонуса сделайте привязку своих соц. сетей</p>
            </div>
            <div class="socials">
                <div class="vk">
                    <p>ВКОНТАКТЕ</p>
                    <button></button>
                </div>
                <div class="tg">
                    <p>ТЕЛЕГРАМ</p>
                    <button></button>
                </div>
            </div>
            <div class="settings_form_input">
                <div class="data_element full">
                    <p>Сменить Логин</p>
                    <input type="text" placeholder="RTyk" disabled>
                    <button></button>
                    <p>Возможность сменить логин: Осталось 2</p>
                </div>
                <div class="data_element full">
                    <p>Сменить Пароль</p>
                    <input type="password" placeholder="RTyk" disabled>
                    <button></button>
                </div>
            </div>
            <div class="button_accept">
                <button @click="">Применить</button>
            </div>
        </div>
    </section>
</template>

<script>
    export default {

    }
</script>
