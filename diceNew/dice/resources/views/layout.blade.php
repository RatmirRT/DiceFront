<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <link rel="stylesheet" href="/css/style.css">
    @vite(['resources/js/app.js'])
</head>
<body>
    <header>
        <div class="header_top">
            <div class="burger_button" id="burger_toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div class="header_logo">
                <p>LOGO</p>
            </div>
            <div class="header_button">
                <button id="logIn">Войти</button>
            </div>
        </div>
        <div class="burger_background"></div>
        <div class="header_bottom">
            <div class="burger_menu">
                <ul class="menu">
                    <li class="menu_item"><a href="#">Главная страница</a></li>
                    <li class="menu_item"><a href="#">FAQ</a></li>
                    <li class="menu_item"><a href="#">Рефералы</a></li>
                    <li class="menu_item"><a href="#">Промокод</a></li>
                    <li class="menu_item"><a href="#">Отзывы</a></li>
                    <li class="menu_item"><a href="https://t.me/gametopwin_bot">Техническая поддержка</a></li>
                </ul>
                <div class="menu_socials">
                    <a href="#"><img src="image/vk.png" alt=""></a><a href="#"><img src="image/tg.png" alt=""></a><a href="#"><img src="image/ok.png" alt=""></a>
                </div>
            </div>
        </div>
        <div id="modal_block">
            <div class="modal_box_background"></div>
            <div class="modal_box">
                <button class="modal_close"></button>
                <div class="modal_content"></div>
            </div>
        </div>
    </header>
    <main id = "app">
        @yield('main_content')
    </main>
    <a href="https://freekassa.ru/" target="_blank" rel="noopener noreferrer">
        <img src="https://cdn.freekassa.ru/banners/big-dark-1.png" title="Прием платежей">
        </a>
    <footer>
        <a href="#">Политика конфеденциальности</a>
        <a href="#">© 2023 Logo</a>
    </footer>
    <script src="/js/app.js"></script>
    <script src="/js/helper.js"></script>
    <script src="/js/fetch.js"></script>
    <script src="/js/user.js"></script>
    <script src="/js/main.js"></script>
    @yield('scripts')
</body>
</html>
