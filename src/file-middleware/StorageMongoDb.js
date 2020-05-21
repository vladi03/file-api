const {connect} = require("./dbConnect");
const {GridFSBucket} = require('mongodb');
const multer = require('multer');
//const {writeFileToDb} = require("./file-middleware/writeFileToDb");
//const path = require("path");
function StorageMongoDb (opts) {
}

StorageMongoDb.prototype._handleFile = async function _handleFile (req, file, cb) {
    const db = await connect();
    const bucket = new GridFSBucket(db,
        { bucketName: 'darbyBucket',
            chunkSizeBytes: 30000 });
        const outStream = bucket.openUploadStream(file.originalname);

        file.stream.pipe(outStream);
        outStream.on('error', cb);
        outStream.on('finish', function () {
            cb(null, {
                fileName: "name",
                size: outStream.bytesWritten
            })
        })
};

//const storage = multer.memoryStorage();//storageMongoDb()
/*
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});
*/
module.exports = {
    storageMongoDb: function (opts) {
        return new StorageMongoDb(opts)
    },
    multerUpload: function () {
        return multer({ storage: new StorageMongoDb() });
    }
};