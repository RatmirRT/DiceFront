import * as signalR from '@microsoft/signalr';
import {url} from "./fetch.js";

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl(url + 'chatHub', {
        skipNegotiation: true,
        skipHubConnection: true,
        transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

export default {
    async start() {
        try {
            await hubConnection.start();
            console.log('UserCount started!');
        }
        catch (error) {
            console.error(error);
        }
    },
    registerReceiveMessage(callback) {
        hubConnection.on('ReceiveMessage', callback); // замените на ваш метод из бэкенда
    },
    stopConnection(){
        hubConnection.stop();
    }
};
