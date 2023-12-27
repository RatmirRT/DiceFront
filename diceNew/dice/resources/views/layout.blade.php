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
            <notice v-if="logged.value"></notice>
            <accaunt-box v-if="logged.value"></accaunt-box>
            <router-view />
        </main>
        <a href="https://freekassa.ru/" target="_blank" rel="noopener noreferrer">
            <img src="https://cdn.freekassa.ru/banners/big-dark-1.png" title="Прием платежей">
        </a>
        <footer>
            <a href="#">Политика конфеденциальности</a>
            <a href="#">© 2023 Logo</a>
        </footer>
    </div>
    <script src="/js/app.js"></script>
    <script src="/js/main.js"></script>
    @yield('scripts')
</body>
</html>
