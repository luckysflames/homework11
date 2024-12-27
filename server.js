import { WebSocketServer } from 'ws';

const PORT = 8080;
const server = new WebSocketServer({ port: PORT });

console.log(`Сервер работает на порту ${PORT}`);
const clients = new Set();

server.on("connection", (ws) => {
    clients.add(ws);
    console.log("Подключение нового клиента");

    ws.send(JSON.stringify({ type: "system", message: "Welcome to WebSocketChat!" }));

    ws.on("message", data => {
        console.log("received: %s", data);  
        const message = data.toString();
        clients.forEach(client => {
            if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({ type: "user", message }))
            }
        });
    });
    ws.on("close", () => {
        clients.delete(ws);
        console.log("Отключение клиента");
    });
});

