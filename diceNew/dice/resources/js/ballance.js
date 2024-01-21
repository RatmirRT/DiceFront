import {fetchRequest} from "./fetch.js";
export async function getBalance(logIn) {
    if (logIn) {
        const Url = "/useController/getUserById";
        let data = {
            Id: localStorage.getItem('id')
        };
        const UserData = await fetchRequest(Url, data, localStorage.getItem('token'));
        if ( UserData.ballance >= 0 ) {
            localStorage.setItem('ballance', UserData.ballance.toFixed(2));
            return UserData.ballance.toFixed(2);
        } else {
            localStorage.setItem('ballance', 'null');
            return false;
        }
    }
}
