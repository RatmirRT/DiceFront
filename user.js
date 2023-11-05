class User {
    #logIn = false;
    constructor() {
        this.init();
    }

    async init() {
        if (localStorage.getItem('name') && localStorage.getItem('id') && localStorage.getItem('token') ) {
            this.#logIn = true;
            await this.getBalance();
            logIn();
        }
    }

    changeLogIn() {
        if (localStorage.getItem('name') && localStorage.getItem('id') && localStorage.getItem('token') ) {
            this.#logIn = true;
        } else {
            this.#logIn = false;
        }
    }

    getLogIn() {
        return this.#logIn;
    }

    async getBalance() {
        if (this.#logIn) {
            const Url = "/useController/getUserById";
            let data = {
                Id: localStorage.getItem('id')
            };
            const UserData = await fetchRequest(Url, data, localStorage.getItem('token'));
            localStorage.setItem('ballance', UserData.ballance.toFixed(2));
        }
    }

}

let user = new User();

function modalBoxToggle(e){
    e.preventDefault()
    document.getElementById("modal_block").classList.toggle("active");
}

function logIn() {
    let logOutButton = document.querySelector(".header_button");
    logOutButton.classList.add("loged_in");
    logOutButton.innerHTML = helper.getLogOut();
    let mainContainer = document.querySelector("main");
    mainContainer.insertAdjacentHTML('afterbegin',helper.getAccountBox());
    mainContainer.insertAdjacentHTML('afterbegin',helper.getNotice());
    document.querySelector('.modal_box .modal_content').innerHTML = helper.getModalOut();
    document.getElementById("logOut").addEventListener('click', modalBoxToggle); 
    document.querySelector('.modal_signOut_buttons .stay').addEventListener('click', modalBoxToggle);
    document.querySelector('.modal_signOut_buttons .out').addEventListener('click', logOut);
    document.querySelector(".notice_close").addEventListener('click', closeNotice);
}

function closeNotice() {
    notice = document.querySelector(".notice");
    if (notice) document.querySelector(".notice").remove();
}

function logOut(e) {
    e.preventDefault();
    localStorage.clear();
    let logInButton = document.querySelector(".header_button");
    logInButton.classList.remove("loged_in");
    logInButton.innerHTML = helper.getLogInButton();
    document.querySelector('.modal_box .modal_content').innerHTML = helper.getModalSign();
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
    document.querySelector(".modal_signIn_regButton").addEventListener('click', changeSign);
    document.querySelector(".modal_signUp_regButton a").addEventListener('click', changeSign);
    document.getElementById("signUpButton").addEventListener('click',signUp);
    document.getElementById("signInButton").addEventListener('click',signIn);
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
    let accountBox = document.querySelector(".account_box");
    if (document.querySelector(".gameResulBlock"))  document.querySelector(".gameResulBlock").innerHTML = '';
    accountBox.remove();
    closeNotice();
    user.changeLogIn();
}


/*Добить эту хуету*/
function modalInForm() {
    document.querySelector('.modal_box .modal_content').innerHTML = helper.getModalSign();
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
    document.querySelector(".modal_signIn_regButton").addEventListener('click', changeSign);
    document.querySelector(".modal_signUp_regButton a").addEventListener('click', changeSign);
    document.getElementById("signUpButton").addEventListener('click',signUp);
    document.getElementById("signInButton").addEventListener('click',signIn);
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
}

async function signUp(e) {
    e.preventDefault();
    let button = document.getElementById("signUpButton");
    button.disabled = true;
    let Url = '/useController/register';
    let data = {
      name: document.querySelector("#signUpLogin").value,
      password: document.querySelector("#signUpPassword").value
    };
    const userData = await fetchRequest(Url, data);
    if (typeof userData === 'object' && userData.info.includes("succes")) {
      localStorage.setItem('id', userData.id);
      localStorage.setItem('name', userData.name);
      localStorage.setItem('token', userData.token);
      user.changeLogIn();
      await user.getBalance();
      logIn();
      if (document.querySelector(".gameResulBlock") || document.querySelector(".hidden_dice_button") ) {
        document.querySelector(".gameResulBlock").innerHTML = '';
        document.querySelector(".hidden_dice_button").click();
        document.getElementById("modal_block").classList.toggle("active");
      }
    } else {
      if(document.querySelector(".modal_signUp .modal_wrong")) document.querySelector(".modal_signUp .modal_wrong").remove();
      let wrong_message = (userData.info) ? userData.info : userData;
      let wrong_block = helper.getLoginWrong(wrong_message);
      document.querySelector(".modal_signUp form").insertAdjacentHTML('afterend', wrong_block);
    }
    button.disabled = false;
  }

  async function signIn(e){
    e.preventDefault();
    let button = document.getElementById("signInButton");
    button.disabled = true;
    let Url = '/useController/authenticate';
    let data = {
      name: document.querySelector("#signInLogin").value,
      password: document.querySelector("#signInPassword").value
    };
    const userData = await fetchRequest(Url, data);
    if (typeof userData === 'object') {
      localStorage.setItem('id', userData.id);
      localStorage.setItem('name', userData.name);
      localStorage.setItem('token', userData.token);
      user.changeLogIn();
      await user.getBalance();
      logIn();
      if (document.querySelector(".gameResulBlock")) document.querySelector(".gameResulBlock").innerHTML = '';
      if (document.querySelector(".hidden_dice_button")) document.querySelector(".hidden_dice_button").click();
      document.getElementById("modal_block").classList.toggle("active");
    } else if (!document.querySelector("modal_signIn .modal_wrong")) {
      let wrong_message = userData;
      let wrong_block = helper.getLoginWrong(wrong_message);
      document.querySelector(".modal_signIn form").insertAdjacentHTML('afterend', wrong_block);
    }
    button.disabled = false;

  }

  function changeSign(e) {
    e.preventDefault();
    document.querySelector(".modal_signIn").classList.toggle("active");
    document.querySelector(".modal_signUp").classList.toggle("active");
  }



