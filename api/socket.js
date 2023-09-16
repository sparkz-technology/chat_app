import { Server } from "socket.io";
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
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    io.use((socket, next) => {
      const err = new Error("not authorized");
      err.data = { content: "Please retry later" };
      next(err);
    });
  });
}
