const http = require("http");
require("dotenv").config();

const app = require("./bakckend/app");
const port = process.env.PORT || 3000;

app.set("port", port);

const server = http.createServer(app);
server.listen(port);
