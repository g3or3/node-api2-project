// require your server and launch it here

const server = require("./api/server");

const port = 4000;

server.listen(port, () => {
	console.log("running on port 4000");
});
