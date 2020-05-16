const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const appRouter = express();

appRouter.use(bodyParser.urlencoded({ extended: false }));
appRouter.use(bodyParser.json());
//define each object route in the API
appRouter.get('/appName', async (req, res) => {
    res.json({
        app: [{ name: "file-api-mongodb", location: "home" }]
    });
});

//default route
appRouter.use(function (req, res) {
    res.json({message: "Hello World",stamp: new Date()});
});