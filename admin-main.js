document.addEventListener('DOMContentLoaded', () => {                      
  function burgerMenuToggle(e) {
    e.preventDefault()
    document.getElementById("burger_toggle").classList.toggle('active');
    document.querySelector(".burger_background").classList.toggle('active');
    document.querySelector(".burger_menu").classList.toggle('active');
  }
  
  document.getElementById("burger_toggle").addEventListener('click', burgerMenuToggle);
  document.querySelector(".burger_background").addEventListener('click', burgerMenuToggle);
});