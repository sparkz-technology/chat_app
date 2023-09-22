import { Server } from "socket.io";
export const onlineUsers = new Map(); //! Map to store the user's socket ID

export function setupSocket(server, origin) {
  const io = new Server(server, {
    cors: {
      origin: origin,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id); //! Add the user to the map with the socket ID
      console.log(onlineUsers);
      io.emit("online-users", [...onlineUsers.keys()]); //! Send the list of online users to all the users
      io.emit("is-online", userId);
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to); //! Get the socket ID of the user to send the message to
      if (sendUserSocket) {
        io.to(sendUserSocket).emit("msg-recieve", data.msg); //! Use io.to() to send the message to the specific user
      }
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key);
          io.emit("online-users", [...onlineUsers.keys()]);
          io.emit("is-offline", key); //! Emit the "is-offline" event when a user disconnects.
        }
      });
    });

    io.use((socket, next) => {
      const err = new Error("not authorized");
      err.data = { content: "Please retry later" };
      next(err);
    });
  });
}
