const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const {writeFileToDb} = require("./file-middleware/writeFileToDb");
const appRouter = express();
const multer = require('multer');
const {connect} = require("./file-middleware/dbConnect");

appRouter.use(bodyParser.urlencoded({ extended: false }));
appRouter.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/*
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});
*/
// It's very crucial that the file name matches the name attribute in your html
appRouter.post('/', upload.single('myFile'),
    (req, res) => {
        console.log("post file");
        console.log(req.body);
        console.log(req.file.buffer);
        res.redirect('/');
        writeFileToDb(req.file.buffer);
});


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

module.exports = appRouter;