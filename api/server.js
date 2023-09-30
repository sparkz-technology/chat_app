const app = require("./app.js");

const db = require("./config/db.js");
const constant = require("./config/constant.js");
const setupSocket = require("./socket.js");

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
