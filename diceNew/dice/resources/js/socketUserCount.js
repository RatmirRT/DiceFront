import * as signalR from '@aspnet/signalr';

const hubConnection = new signalR.HubConnectionBuilder()
    .withUrl('https://a22988-3fca.a.d-f.pw/onlineusershub', {
        skipNegotiation: true,
        skipHubConnection: true,
        transport: signalR.HttpTransportType.WebSockets,
    })
    .build();

export default {
    async start() {
        try {
            await hubConnection.start();
            setInterval(function() {
                if (localStorage.getItem('id')) this.UserConnected();
            }.bind(this), 5000);
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

    UserConnected() {
        hubConnection.invoke('UserConnected', +localStorage.getItem('id')); // замените на ваш метод из бэкенда
    },

    UserDisconnected() {
        hubConnection.invoke('UserDisconnected', +localStorage.getItem('id')); // замените на ваш метод из бэкенда
    },

    userCountDisconect() {
        hubConnection.stop();
    }

};
