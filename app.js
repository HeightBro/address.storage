// Dependencies
const express = require("express");
const http = require("http");

// Server
const app = express();
const server = http.createServer(app);
const port = normalizePort(process.env.PORT || "3000");

// Routers
const telegramRouter = require("./src/routes/telegram");

app.set("port", port);

app.use(express.json());

// Check service is available
app.get("/", (req, res) => {
  return res.status(200).send({ status: "Service is available" });
});
app.use("/telegram", telegramRouter);

server.listen(port);
server.on("listening", onListening);
server.on("error", onError);

/**
 * Нормализовать порт в число, строку или false
 */
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ?
    "pipe " + addr :
    "port " + addr.port;

  console.log(`Server has been started on ${bind}`);
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ?
    "Pipe " + port :
    "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}