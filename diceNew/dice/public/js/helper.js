class Helper {
    getModalSign() {
        const modal = `<div class="modal_signIn active">
                            <h4>Войти</h4>
                            <form action="#">
                                <input id="signInLogin" type="text" placeholder="Логин">
                                <input id="signInPassword" type="password" placeholder="Пароль">
                                <label><input type="checkbox">Запомнить меня?</label>
                                <button id="signInButton">Войти</button>
                            </form>
                            <p>или</p>
                            <div class="signIn_socials">
                                <button class="vk">ВКОНТАКТЕ</button>
                                <button class="tg">ТЕЛЕГРАМ</button>
                                <button class="google">GOOGLE</button>
                            </div>
                            <button class="modal_signIn_regButton">Регистрация</button>
                        </div>
                        <div class="modal_signUp">
                            <h4>Регистрация</h4>
                            <form action="#">
                                <input id="signUpLogin" type="text" placeholder="Логин">
                                <input id="signUpPassword" type="password" placeholder="Пароль">
                                <button id="signUpButton">Регистрация</button>
                            </form>
                            <p class="or">или</p>
                            <div class="signUp_socials">
                                <button class="vk">ВКОНТАКТЕ</button>
                                <button class="tg">ТЕЛЕГРАМ</button>
                                <button class="google">GOOGLE</button>
                            </div>
                            <p class="modal_signUp_temr">Авторизуясь, вы соглашаетесь с <a href="#">Пользовательским соглашением и Политикой конфеденциальности</a></p>
                            <p class="modal_signUp_regButton">Есть аккаунт? <a href="">Войти</a></p>
                        </div>`;
        return modal;
    }

    getModalOut() {
        const modal = `<div class="modal_signOut active">
                            <h5>Вы уверены, что хотите выйти?</h5>
                            <div class="modal_signOut_buttons">
                                <button class="stay">остаться</button>
                                <button class="out">выйти</button>
                            </div>
                        </div>`;
        return modal;
    }

    getAccountBox() {
        let name = localStorage.getItem('name');
        let ballance = localStorage.getItem('ballance');
        const accBox = `<section class="account_box">
            <div class="account_box-img">
                <img src="image/accountIcon.svg" alt="">
            </div>
            <div class="account_box-data">
                <h2 class="account_box-name">${name}</h2>
                <p class="account_box-balance">${ballance}</p>
            </div>
            <div class="account_box-buttons">
                <button class="account_box-replenish">ПОПОЛНИТЬ</button>
                <button class="account_box-withdraw">ВЫВЕСТИ</button>
            </div>
        </section>`;
        return accBox;
    }

    getLogOut() {
        const logOut = `<div class="header_online">
            <p id="people_online">888</p>
        </div>
        <button id="logOut"></button>`
        return logOut;
    }

    getNotice(){
        const notice = `<section class="notice">
            <p class="notice_message">Получи по ебалу прямо сейчас за привязку Telegram аккаунта и подписку на канал</p>
            <button class="notice_close"></button>
        </section>`;
        return notice;
    }

    getLogInButton(){
        const logInButton = `<button id="logIn">Войти</button>`;
        return logInButton;
    }

    getLoginWrong(value) {
        let wrong_message = `<p class="modal_wrong">${value}</p>`;
        return wrong_message;
    }

}

let helper = new Helper();
