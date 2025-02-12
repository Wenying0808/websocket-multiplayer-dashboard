import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME || "localhost";
const port = parseInt(process.env.PORT || "3100", 10);

const app = next({dev, hostname, port});
const handle = app.getRequestHandler();

// Next.js application for handling requests
app.prepare().then( () => {
    const httpServer = createServer(handle); // This creates an HTTP server using Node.js's createServer function.
    const io = new Server(httpServer); // initializes a new instance of Socket.IO

    // This sets up an event listener for new connections. 
    // When a client connects, a socket object is created for that connection, allowing you to communicate with that specific client.
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`)

        // This listens for a "join-room" event from the client. When a client emits this event, the server receives the room and username parameters.
        socket.on("join-room", ({ room, username }) => {
            socket.join(room); // This method allows the socket (client) to join a specific room, enabling group communication.
            console.log(`User joined ${username} joined the room ${room}`);
            socket.to(room).emit("user_joined", `${username} joined room`); // This emits a "user_joined" event to all clients in the specified room
        })

        // This listens for a "message" event from the client, which includes the room, message, and sender parameters.
        socket.on("message", ({ room, message, sender }) => {
            console.log(`Message from ${sender} in the room ${room}: ${message}`);
            socket.to(room).emit("message", { sender, message }); // This sends the received message to all clients in the specified room, allowing them to see the message.
        })

        socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`)
        })  
    });

    httpServer.listen(port, () => {
        console.log(`Server running on http://${hostname}:${port}`)
    });

})

