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

});
