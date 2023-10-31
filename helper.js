class Helper {
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