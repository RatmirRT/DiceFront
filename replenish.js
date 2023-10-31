class Replenish {

    inputLock (value) {
        let pattern =  /^\d+([.,]\d{0,2})?$/g;
        let correctValue;
        value = value.replace(",", ".");
        let test = (pattern.test(value));
        if (test || value == '') {
            return value;
        } else {
            correctValue = value.slice(0, -1);
            if (!pattern.test(correctValue)) {
                correctValue = this.inputLock(correctValue);
            }
            return correctValue;
        }
    }

    async sendReplenish(amount) {
        let Url = '/payment/createPayment';
        let data = {
            amount: amount,
            userId: localStorage.getItem('id')
        };
        const ReplenishData = await fetchRequest(Url, data, localStorage.getItem('token'));
        (!ReplenishData) ? window.open('https://pay.freekassa.ru/form/123/bd4161db429848651499aabcb1d89330') :
            console.log(ReplenishData);
    }
}

let replenish = new Replenish();

document.querySelector(".payment_method_amount input").addEventListener('input', () =>{
    let input = document.querySelector(".payment_method_amount input");
    let correctValue = replenish.inputLock(input.value);
    input.value = correctValue;
});

document.querySelector(".payment_method_send_button").addEventListener('click', ()=>{
    let input = document.querySelector(".payment_method_amount input").value;
    let button = document.querySelector(".payment_method_send_button");
    button.disabled = true;
    replenish.sendReplenish(input);
    button.disabled = false;
});