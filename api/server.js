import app from "./app.js";

import db from "./config/db.js";
import constant from "./config/constant.js";
import { setupSocket } from "./socket.js";

const { PORT, ORIGIN } = constant;

db();
async function startServer() {
  try {
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    setupSocket(server, ORIGIN);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
