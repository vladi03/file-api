const express = require("express");
const bodyParser = require("body-parser");
const {multerUpload} = require("./file-middleware");
const appRouter = express();
appRouter.use(bodyParser.urlencoded({ extended: false }));
appRouter.use(bodyParser.json());

const upload = multerUpload({bucketName : 'darbyBucket'});
// It's very crucial that the file name matches the name attribute in your html
appRouter.post('/', upload.single('myFile'),
    (req, res) => {
        console.log("post file");
        console.log(req.body);
        res.redirect('/');
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