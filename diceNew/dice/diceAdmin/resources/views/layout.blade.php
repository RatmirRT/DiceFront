<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Admin</title>
        <link rel="stylesheet" href="/css/style.css">
        @vite(['resources/js/app.js'])
    </head>
    <body>
       <div id="app">
           <header-template></header-template>
           <main>
               <router-view />
           </main>
           <footer>
               <a href="#">Политика конфеденциальности</a>
               <a href="#">© 2023 Logo</a>
           </footer>
       </div>
    </body>
</html>
