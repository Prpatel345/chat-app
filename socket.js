const { Server } = require("socket.io");

let users = [];
let socketRef;
let ioRef;

function initSocket(server) {
  const io = new Server(server);

  ioRef = io;

  io.on("connection", (socket) => {
    console.log("New client connected");

    socketRef = socket;

    socket.on("newUser", (newUser) => {
      const isExist = users.find((user) => user.id === newUser.id);
      if (!isExist) {
        users.push({ ...newUser, socketId: socket.id });
      } else {
        isExist.socketId = socket.id;
      }
      io.emit("allUsers", users);
    });

    socket.on("sendMessage", (message) => {
      if (message.receiverId) {
        const findSender = users.find((user) => user.id == message.id);
        const findReceiver = users.find(
          (user) => user.id == message.receiverId
        );
        if (findSender)
          io.to(findSender.socketId).emit("receiveMessage", message);
        if (findReceiver)
          io.to(findReceiver.socketId).emit("receiveMessage", message);
      } else {
        io.emit("receiveMessage", message);
      }
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected", socket.id);
      users = users.filter((user) => user.socketId !== socket.id);
      io.emit("allUsers", users);
    });
  });
}

module.exports = {
  initSocket,
};
