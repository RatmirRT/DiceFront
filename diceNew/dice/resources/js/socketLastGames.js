import * as signalR from '@aspnet/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://a22988-3fca.a.d-f.pw/chatHub', {
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
