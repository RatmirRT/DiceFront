import * as signalR from '@aspnet/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://a22152-c45f.f.d-f.pw:80/chatHub', {
        skipNegotiation: true,
        skipHubConnection: true,
        transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

export default {
    start() {
        hubConnection.start()
            .then(() => {
                console.log('Connection started!');
            })
            .catch(err => console.error('Error while establishing connection :('));
    },
    registerReceiveMessage(callback) {
        console.log("yes");
        hubConnection.on('ReceiveMessage', callback); // замените на ваш метод из бэкенда
    },
    unregisterReceiveMessage(callback) {
        hubConnection.off('ReceiveMessage', callback); // если требуется отписаться от события
    },
    sendMessage(message) {
        hubConnection.invoke('SendMessage', message); // замените на ваш метод из бэкенда
    }
};
