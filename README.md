![publish npm package](https://github.com/vladi03/file-api-mongodb/workflows/publish%20npm%20package/badge.svg)
![publish npm package](https://github.com/vladi03/file-api-mongodb/workflows/unit-test/badge.svg)

# file-api-mongodb
Store files in MongoDb accessed through an express middleware.

```javascript
const {multerUpload} = require("file-api-mongodb");

const upload = multerUpload();
// It's very crucial that the file name matches the name attribute in your html
appRouter.post('/', upload.single('myFile'),
    (req, res) => {
        console.log("post file");
        console.log(req.body);
        res.redirect('/');
});
```


