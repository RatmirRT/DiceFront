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
    let accountBox = helper.getAccountBox();
    let notice = helper.getNotice();
    let mainContainer = document.querySelector("main");
    mainContainer.insertAdjacentHTML('afterbegin',accountBox);
    mainContainer.insertAdjacentHTML('afterbegin',notice);
    document.getElementById("logOut").addEventListener('click', logOut);
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
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
    let accountBox = document.querySelector(".account_box");
    if (document.querySelector(".gameResulBlock"))  document.querySelector(".gameResulBlock").innerHTML = '';
    accountBox.remove();
    closeNotice();
    user.changeLogIn();
  }
    


