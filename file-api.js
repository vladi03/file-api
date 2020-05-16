require('dotenv').config(); //load .env file for process.env
const http = require('http');
const appRouter = require('./src/appRoutes');

const port = process.env.PORT || 1337;

//Create a server
const server = http.createServer(appRouter);

//Lets start our server
server.listen(port, function () {
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", port);
});


