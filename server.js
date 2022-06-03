const http = require("http");
var app = require("./app");
const port = process.env.PORT || 3001;
const server = http.createServer(app);
console.log("running on http://localhost/" + port);
server.listen(port);

