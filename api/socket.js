import { Server } from "socket.io";

// Create a map to store online users
export const onlineUsers = new Map();

// Define a threshold for considering a user as offline
const reconnectThreshold = 60000;

// Function to set up the Socket.IO server
export const setupSocket = (server, origin) => {
  const io = new Server(server, {
    cors: {
      origin,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  // Handle socket connections
  io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
      console.log("add-user", userId);

      const lastSeen = onlineUsers.get(userId);
      const currentTime = Date.now();

      // Set the userId property on the socket object
      socket.userId = userId;

      if (onlineUsers.has(userId)) {
        if (onlineUsers.get(userId) !== socket.id) {
          onlineUsers.set(userId, socket.id);
          io.emit("is-online", userId);
        }
      } else {
        onlineUsers.set(userId, socket.id);
        io.emit("is-online", userId);
      }

      if (!lastSeen || currentTime - lastSeen > reconnectThreshold) {
        // Check if there's an existing socket ID for this user
        const existingSocketId = Array.from(onlineUsers.values()).find(
          (id) => id === socket.id
        );

        // If there's no existing socket ID, update it
        if (!existingSocketId) {
          onlineUsers.set(userId, socket.id);
          io.emit("is-online", userId);
        }
      }
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to);
      if (sendUserSocket) {
        io.to(sendUserSocket).emit("msg-receive", data.msg);
      }
    });

    socket.on("check-online", (userId) => {
      console.log("check-online", userId);
      onlineUsers.get(userId)
        ? io.emit("is-online", userId)
        : io.emit("is-offline", userId);
    });

    socket.on("disconnect", () => {
      // Find the user ID associated with this socket and remove it from onlineUsers
      const userId = socket.userId;
      console.log("disconnect", userId ? userId : "no user id");

      if (userId) {
        onlineUsers.delete(userId);
        io.emit("is-offline", userId);
        console.log("\x1b[31m", "user disconnected", userId);
      }
      console.log("user disconnected");
    });
  });
};
