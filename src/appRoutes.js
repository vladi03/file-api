const express = require("express");
const bodyParser = require("body-parser");
const {multerUpload} = require("./file-middleware");
const appRouter = express();
appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.use(bodyParser.json());

const {upload, storage } = multerUpload({bucketName : 'darbyBucket'});

// It's very crucial that the file name matches the name attribute in your html
appRouter.post('/', upload.single('myFile'),
    (req, res) => {
        //res.redirect('/');
        res.json(req.fileData);
});
//imageUpload
appRouter.post('/image/:imageWidth', upload.single('myFile'),
    (req, res) => {
        res.json(req.fileData);
    });

appRouter.get('/:fileName', (req,res) => {
    storage.getFile(res, req.params.fileName);
});

appRouter.get('/id/:id', (req,res) => {
    storage.getFileById(res, req.params.id);
});//getFileList

appRouter.get('/', (req,res) => {
    storage.getFileList(res);
});

appRouter.delete('/:id', (req,res) => {
    storage.deleteFile(req.params.id, (err) => {
        if(err)
            res.status(500).send(err.message);
        else
            res.status(204).send();
    });
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