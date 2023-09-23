import { Server } from "socket.io";

export const onlineUsers = new Map(); // Map to store the user's socket ID
const reconnectThreshold = 60000; // 60 seconds (adjust as needed)

export function setupSocket(server, origin) {
  const io = new Server(server, {
    cors: {
      origin: origin,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("add-user", (userId) => {
      console.log("add-user", userId);

      // Check if the user was recently seen (within a certain time frame)
      const lastSeen = onlineUsers.get(userId);
      const currentTime = Date.now();

      // Check if there's already an active socket connection for this user
      if (onlineUsers.has(userId)) {
        // Check if the socket ID is different (possible reconnection)
        if (onlineUsers.get(userId) !== socket.id) {
          onlineUsers.set(userId, socket.id); // Update the socket ID
          io.emit("is-online", userId);
        }
      } else {
        onlineUsers.set(userId, socket.id);
        io.emit("is-online", userId);
      }

      if (!lastSeen || currentTime - lastSeen > reconnectThreshold) {
        // Check if the user is not already connected with the same socket ID
        const existingSocketId = Array.from(onlineUsers.values()).find(
          (id) => id === socket.id
        );
        if (!existingSocketId) {
          onlineUsers.set(userId, socket.id);
          io.emit("is-online", userId);
        }
      }
    });

    socket.on("check-online", (userId) => {
      console.log("check-online", userId);
      if (onlineUsers.has(userId)) {
        io.emit("is-online", userId); // Emit the "is-online" event when a user is online.
      }
    });

    socket.on("send-msg", (data) => {
      const sendUserSocket = onlineUsers.get(data.to); // Get the socket ID of the user to send the message to
      if (sendUserSocket) {
        io.to(sendUserSocket).emit("msg-receive", data.msg); // Use io.to() to send the message to the specific user
      }
    });

    socket.on("disconnect", () => {
      const userId = Array.from(onlineUsers.entries()).find(
        (entry) => entry[1] === socket.id
      )?.[0];
      if (userId) {
        onlineUsers.delete(userId);
        io.emit("is-offline", userId);
      }
      console.log("user disconnected");
    });
  });

  // when a user disconnects, remove them from our onlineUsers object
  // io.on("disconnect", () => {
  //   console.log("a user disconnected");
  //   onlineUsers.delete(socket.id);
  // });
  // });
  //
  // how to delete users when server restarts
  // io.on("connection", (socket) => {
  //   console.log("a user connected");
  //   socket.on("disconnect", () => {
  //     console.log("user disconnected");
  //     onlineUsers.delete(socket.id);
  //   });
}
