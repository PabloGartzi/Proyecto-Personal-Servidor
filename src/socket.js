const { Server } = require("socket.io");

let io;
const connectedUsers = new Map();

const initSocket = (server, corsOptions) => {
    io = new Server(server, { cors: corsOptions });

    io.on("connection", (socket) => {
        console.log("Cliente conectado:", socket.id);

        socket.on("register", (userEmail) => {
        connectedUsers.set(userEmail, socket.id);
        console.log(`Usuario ${userEmail} registrado`);
        });

        socket.on("disconnect", () => {
        console.log("Cliente desconectado:", socket.id);
        for (const [userEmail, socketId] of connectedUsers.entries()) {
            if (socketId === socket.id) {
            connectedUsers.delete(userEmail);
            break;
            }
        }
        });
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io no inicializado");
    }
    return io;
};

module.exports = {
  initSocket,
  getIO,
  connectedUsers
};
