<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <link rel="stylesheet" href="/css/style.css">
    @vite(['resources/js/app.js'])
</head>
<body>
    <div id = "app">
        <header>
            <head-template></head-template>
        </header>
        <main>
            <aside class="sidebar" v-if="PC.value">
                <accaunt-box v-if="logged.value"></accaunt-box>
                <game-select></game-select>
                <div class="menu_socials">
                    <a href="#"><div class="vk"><img src="/image/vk.svg" alt="vk"><p>ВКОНТАКТЕ</p></div></a>
                    <a href="#"><div class="tg"><img src="/image/tg.svg" alt="tg"><p>ТЕЛЕГРАМ</p></div></a>
                </div>
            </aside>
            <section class="content">
                <notice v-if="logged.value"></notice>
                <accaunt-box v-if="logged.value && !PC.value"></accaunt-box>
                <router-view />
            </section>
        </main>
        <a href="https://freekassa.ru/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.freekassa.ru/banners/big-dark-1.png" title="Прием платежей">
        </a>
        <footer>
            <div class="container">
                <a href="#">Политика конфеденциальности</a>
                <a href="#">© 2023 Logo</a>
            </div>
        </footer>
    </div>
    <script src="/js/app.js"></script>
    <script src="/js/main.js"></script>
    @yield('scripts')
</body>
</html>
