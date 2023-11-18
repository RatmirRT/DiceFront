import * as signalR from '@aspnet/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://a22170-167a.f.d-f.pw/chatHub', {
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
    unregisterReceiveMessage() {
        hubConnection.off('ReceiveMessage'); // если требуется отписаться от события
    },
    sendMessage(message) {
        hubConnection.invoke('SendMessage', message); // замените на ваш метод из бэкенда
    },
    stopConnection(){
        hubConnection.stop();
    }
};
