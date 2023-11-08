document.addEventListener('DOMContentLoaded', () => {
  if (!user.getLogIn()) {
    document.querySelector('.modal_box .modal_content').innerHTML = helper.getModalSign();
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
    document.querySelector(".modal_signIn_regButton").addEventListener('click', changeSign);
    document.querySelector(".modal_signUp_regButton a").addEventListener('click', changeSign);
    document.getElementById("signUpButton").addEventListener('click',signUp);
    document.getElementById("signInButton").addEventListener('click',signIn);
    document.getElementById("logIn").addEventListener('click', modalBoxToggle);
  }


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


    document.querySelector(".modal_close").addEventListener('click', modalBoxToggle);
    document.querySelector(".modal_box_background").addEventListener('click', modalBoxToggle);
});