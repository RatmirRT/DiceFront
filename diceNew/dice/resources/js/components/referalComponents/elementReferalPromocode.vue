<template>
    <section class="reeral_promocode_section">
        <div class="referal_promocode_form">
            <div class="data_element full">
                <p>Название промокода</p>
                <input type="text" placeholder="DOTA2024">
            </div>
            <div class="data_element">
                <p>Сумма</p>
                <input type="text" placeholder="100">
            </div>
            <div class="data_element">
                <p>Кол-во активаций</p>
                <input type="text" placeholder="200">
            </div>
            <div class="button_accept">
                <button @click="">Применить</button>
            </div>
        </div>
        <referal-promocode-table></referal-promocode-table>
    </section>
</template>

<script>
    export default {

    }
</script>
