document.addEventListener('DOMContentLoaded', () => {
  let bankButton = document.querySelectorAll('.payment_method_bank label input');
    
    bankButton.forEach(function(radio) {
        radio.addEventListener('change', function(){
            for (let i = 0; i < bankButton.length; i++) {
                bankButton[i].parentElement.classList.remove("active");
            }
            this.parentElement.classList.add("active");
        })
    });
    
    function burgerMenuToggle(e) {
      e.preventDefault()
      document.getElementById("burger_toggle").classList.toggle('active');
      document.querySelector(".burger_background").classList.toggle('active');
      document.querySelector(".burger_menu").classList.toggle('active');
    }
    
    document.getElementById("burger_toggle").addEventListener('click', burgerMenuToggle);
    document.querySelector(".burger_background").addEventListener('click', burgerMenuToggle);

    if (!user.getLogIn()) document.getElementById("logIn").addEventListener('click', modalBoxToggle);

    document.querySelector(".modal_close").addEventListener('click', modalBoxToggle);
    document.querySelector(".modal_box_background").addEventListener('click', modalBoxToggle);

    function changeSign(e) {
      e.preventDefault();
      document.querySelector(".modal_signIn").classList.toggle("active");
      document.querySelector(".modal_signUp").classList.toggle("active");
    }

    document.querySelector(".modal_signIn_regButton").addEventListener('click', changeSign);
    document.querySelector(".modal_signUp_regButton a").addEventListener('click', changeSign);

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
    
    document.getElementById("signUpButton").addEventListener('click',signUp);
    document.getElementById("signInButton").addEventListener('click',signIn);

    console.log("Helo");
});