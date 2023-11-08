document.addEventListener('DOMContentLoaded', () => {

    class Dice {
        #playerMoney = (localStorage.getItem("ballance")) ? localStorage.getItem("ballance") : 10000;
        #sum = 1;
        #percent = 75;
        #minRange = 949999;
        #maxRange = 50000;
        #maxPercent = 95;


        getSum() {
            return this.#sum;
        }

        getPercent() {
            return this.#percent;
        }

        setPercent(value) {
            if (!value) {
                this.#percent = 1;
                return;
            } else {
                if (value <= 1) {
                    this.#percent = 1;
                } else if (value >= this.#maxPercent){
                    this.#percent = this.#maxPercent;
                } else {
                    this.#percent = value;
                }
            }
            this.changeChance();
        }

        setSum(value) {
            if (this.checkPlayerMoney()) {
                document.querySelector(".bid_table_title input").value = value;
                this.#sum = 1;
            } else
            if (!value) {
                this.#sum = 1;
                return;
            } else {
                if (value <= 1) {
                    this.#sum = 1;
                } else 
                if (value >= Number(this.#playerMoney)){
                    this.#sum = this.#playerMoney;
                } else 
                {
                    this.#sum = value;
                }
            }
            this.changeBid();
        }

        checkPlayerMoney(){
            if (Number(this.#playerMoney) < 1 || this.#playerMoney < this.#sum) {
                this.warningMessage();
                return true
            }
            else {
                this.warningMessageRemove();
                return false
            }
        }

        warningMessage(){
            let message = document.createElement('div');
            let messageBlock = document.querySelector(".gameResulBlock");
            message.classList.add('game_warningMessage');
            message.innerHTML = "Недостаточно средств";
            messageBlock.innerHTML = "";
            messageBlock.append(message);
        }

        warningMessageRemove(){
            if (document.querySelector(".game_warningMessage")){
                document.querySelector(".game_warningMessage").remove();
            }
        }

        changeBid() {
            document.querySelector(".bid_table_title input").value = Number(this.#sum);
            this.changePossibleCash();
        }

        changeChance() {
            document.querySelector(".chances_table_title input").value = Number(this.#percent);
            this.#minRange = Math.floor((this.#percent / 100) * 999999);
            this.#maxRange = 999999 - Math.floor((this.#percent  / 100) * 999999);
            document.querySelector(".game_less_button p").innerHTML = (`0 - ${this.#minRange}`);
            document.querySelector(".game_more_button p").innerHTML = (`${this.#maxRange} - 999999`);
            this.changePossibleCash();
        }

        changePossibleCash() {
            let win = ((100.0 / this.#percent) * this.#sum).toFixed(2);
            document.querySelector(".game_possible_gain_number").innerHTML = Number.isFinite(Number(win)) ? win: 0;
        }

        changeBalance(value) {
            document.querySelector(".account_box-balance").innerHTML = value;
        }

        gameResult(value, win, button){
            let gameBlock = document.querySelector(".gameResulBlock");
            let result = document.createElement('div');
            if (win) {
                result.classList.add('game_result', "win");
                result.innerHTML = "Вы выиграли " + value;
            } else {
                result.classList.add('game_result');
                if (button == "less") {
                    let number = Math.random() * (999999 - this.#maxRange) + this.#maxRange;
                    result.innerHTML = `Вы проиграли: ${number.toFixed()}`;
                } else {
                    let number = Math.random() * (this.#minRange - 0) + 0;
                    result.innerHTML = `Вы проиграли: ${number.toFixed()}`;
                }
            }
            gameBlock.innerHTML = "";
            gameBlock.append(result);
        }

        checkBallance(value) {
            if (!value) {
                this.#playerMoney = 10000;
            } else {
                this.#playerMoney = localStorage.getItem('ballance');
            }

        }

        noAuthorize(value){
            let registrationButton = document.querySelector(".dice_Registration_Button");
            if (registrationButton) registrationButton.remove();
            if (!value) {
                let neWRegistrationButton = document.createElement("button");
                neWRegistrationButton.classList.add("dice_Registration_Button");
                neWRegistrationButton.innerHTML = "Авторизуйтесь";
                neWRegistrationButton.addEventListener('click', modalBoxToggle);
                document.querySelector(".gameResulBlock").append(neWRegistrationButton);
                return false;
            } 

            return true;
        }

        diceInputLock (value) {
            let pattern =  /^\d+([.,]\d{0,2})?$/g;
            let correctValue;
            value = value.replace(",", ".");
            let test = (pattern.test(value));
            if (test || value == '' ) {
                return value;
            } else 
            {
                correctValue = value.slice(0, -1);
                if (!pattern.test(correctValue)) {
                    correctValue = this.diceInputLock(correctValue);
                }
                return correctValue;
            }
        }

        async sendGame(button) {
            if (this.checkPlayerMoney() || this.#sum < 1) return;
            let Url = '/dice/start';
            let data = {
                userId: localStorage.getItem('id'),
                persent: Number(this.#percent).toFixed(),
                sum: this.#sum,
            };
            const gameData = await fetchRequest(Url, data, localStorage.getItem('token'));
            this.#playerMoney = gameData.newBallance.toFixed(2);
            localStorage.setItem("ballance", gameData.newBallance.toFixed(2));
            this.changeBalance(this.#playerMoney);
            let cash =  ((100.0 / this.#percent) * this.#sum).toFixed(2);
            this.gameResult(cash, gameData.isSucces, button);
        }
    }

    let dice = new Dice();

    document.querySelector(".bid_table_title input").addEventListener('input', () =>{
        let input = document.querySelector(".bid_table_title input");
        let correctValue = dice.diceInputLock(input.value);
        let lastChar = correctValue[correctValue.length - 1];
        !(lastChar == "." || correctValue == "") ? dice.setSum(correctValue) : input.value = correctValue;
    });

    document.querySelector(".bid_table_minmax button:first-child").addEventListener('click', () => {
        dice.setSum(1);
    });

    document.querySelector(".bid_table_minmax button:last-child").addEventListener('click', () => {
        dice.setSum(10000000);
    });

    document.querySelector(".bid_table_col button:first-child").addEventListener('click', () => {
        let value = (dice.getSum() * 2).toFixed(2);
        dice.setSum(value);
    });

    document.querySelector(".bid_table_col button:last-child").addEventListener('click', () => {
        let value = (dice.getSum() / 2).toFixed(2);
        dice.setSum(value);
    });

    document.querySelector(".chances_table_title input").addEventListener('input', () =>{
        let input = document.querySelector(".chances_table_title input");
        let correctValue = dice.diceInputLock(input.value);
        let lastChar = correctValue[correctValue.length - 1];
        !(lastChar == "." || correctValue == "") ? dice.setPercent(correctValue) : input.value = correctValue;
    });

    document.querySelector(".chances_table_minmax button:first-child").addEventListener('click', () => {
        dice.setPercent(1);
        let input = document.querySelector(".chances_table_title input");
        input.value = input.value + "%";
    });

    document.querySelector(".chances_table_minmax button:last-child").addEventListener('click', () => {
        dice.setPercent(95);
        let input = document.querySelector(".chances_table_title input");
        input.value = input.value + "%";
    });

    document.querySelector(".chances_table_col button:first-child").addEventListener('click', () => {
        let value = (dice.getPercent() * 2).toFixed(2);
        dice.setPercent(value);
        let input = document.querySelector(".chances_table_title input");
        input.value = input.value + "%";
    });

    document.querySelector(".chances_table_col button:last-child").addEventListener('click', () => {
        let value = (dice.getPercent() / 2).toFixed(2);
        dice.setPercent(value);
        let input = document.querySelector(".chances_table_title input");
        input.value = input.value + "%";
    });
    document.querySelector(".game_more_button button").addEventListener('click', ()=>{
        if (dice.noAuthorize(user.getLogIn())) dice.sendGame("more");
    });
    document.querySelector(".game_less_button button").addEventListener('click', ()=>{
        if (dice.noAuthorize(user.getLogIn())) dice.sendGame("less");
    });
    document.querySelector(".hidden_dice_button").addEventListener('click', () => {
        dice.checkBallance(user.getLogIn());
    });
    document.querySelector(".bid_table_title input").addEventListener('blur', ()=>{
        let input = document.querySelector(".bid_table_title input");
        if (dice.getSum() == 1 && input.value == '') input.value = 1;
    });
    document.querySelector(".chances_table_title input").addEventListener('focus', ()=>{
        let input = document.querySelector(".chances_table_title input");
        input.value = input.value.slice(0, -1);
    });
    document.querySelector(".chances_table_title input").addEventListener('blur', ()=>{
        let input = document.querySelector(".chances_table_title input");
        if ( input.value == '') input.value = 1;
        input.value = input.value + "%";
    });
});