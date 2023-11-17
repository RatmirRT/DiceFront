import * as signalR from '@aspnet/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://a22170-167a.f.d-f.pw/onlineusershub', {
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
    connectedUser(callback) {
        hubConnection.on('UserConnected', callback);
    },

    disconnectedUser(callback) {
        hubConnection.on('UserDisconnected', callback);
    },

    unregisterReceiveMessage(callback) {
        hubConnection.off('ReceiveMessage', callback); // если требуется отписаться от события
    },

    async UserConnected(message) {
        await hubConnection.invoke('UserConnected'); // замените на ваш метод из бэкенда
    },

    UserDisconnected(message) {
        hubConnection.invoke('UserDisconnected'); // замените на ваш метод из бэкенда
    }

};
