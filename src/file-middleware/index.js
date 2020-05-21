const {multerUpload} = require("./StorageMongoDb");


module.exports = {
    getName: () => "file-api-mongodb",
    multerUpload
};