![publish npm package](https://github.com/vladi03/file-api-mongodb/workflows/publish%20npm%20package/badge.svg)
![publish npm package](https://github.com/vladi03/file-api-mongodb/workflows/unit-test/badge.svg)

# file-api-mongodb
Store files in MongoDb accessed through an express middleware.

```javascript
const {multerUpload} = require("file-api-mongodb");

const upload = multerUpload(opt);
// It's very crucial that the file name matches the name attribute in your html
appRouter.post('/', upload.single('myFile'),
    (req, res) => {
        console.log("post file");
        console.log(req.body);
        res.redirect('/');
});
```

## Options
Two options are available for the constructor:
| variable | description |
| :---: | :--- |
|`connectDb (optional)` | function that returns db connection.  If a connectDb function is not provider, the variable "process.env.DB_CONN" is used mongoClient.connect(process.env.DB_CONN)|
|`bucketName (optional)`| the default value is "fileBucket"|

## The storage object was derived from the following template
[StorageEngine](https://github.com/expressjs/multer/blob/master/StorageEngine.md)
