const {connect} = require("./dbConnect");
const {ObjectId} = require("mongodb");
const {GridFSBucket} = require('mongodb');
const multer = require('multer');
//const {writeFileToDb} = require("./file-middleware/writeFileToDb");
//const path = require("path");
function StorageMongoDb ({bucketName, connectDb, dbName}) {
    // noinspection JSUnusedGlobalSymbols
    this.bucketName = bucketName || "fileBucket";
    this.connect = connectDb || connect;
    this.dbName = dbName || "identity";
}

// noinspection JSUnusedGlobalSymbols
StorageMongoDb.prototype._handleFile = async function _handleFile (req, file, cb) {
    const db = await this.connect(this.dbName);
    const bucket = new GridFSBucket(db,
        { bucketName: this.bucketName, //bucketName : 'darbyBucket'
            chunkSizeBytes: 30000 });
        const outStream = bucket.openUploadStream(file.originalname);
        const id = outStream.id;
        file.stream.pipe(outStream);
        outStream.on('error', cb);
        outStream.on('finish', function () {
            req.fileData = {
                id: id,
                fileName: file.originalname
            };

            cb(null, {
                fileName: "name",
                size: outStream.bytesWritten
            })
        });
};

StorageMongoDb.prototype.deleteFile = async function getFile (id, cb) {
    const db = await this.connect(this.dbName);
    const bucket = new GridFSBucket(db,
        { bucketName: this.bucketName,
            chunkSizeBytes: 30000 });
    // noinspection JSCheckFunctionSignatures
    bucket.delete(ObjectId(id), (err) => {
            cb(err);
    });
};


StorageMongoDb.prototype.getFile = async function getFile (res, fileName) {
    const db = await this.connect(this.dbName);
    const bucket = new GridFSBucket(db,
        { bucketName: this.bucketName, //bucketName : 'darbyBucket'
            chunkSizeBytes: 30000 });

    // noinspection JSCheckFunctionSignatures
    bucket
        .find({
            filename: fileName
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            }
            bucket.openDownloadStreamByName(fileName).pipe(res);
        });
};

StorageMongoDb.prototype.getFileList = async function getFile (res) {
    const db = await this.connect(this.dbName);
    const bucket = new GridFSBucket(db,
        { bucketName: this.bucketName, //bucketName : 'darbyBucket'
            chunkSizeBytes: 30000 });

    // noinspection JSCheckFunctionSignatures
    bucket
        .find({

        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            } else
                res.json(files);

        });
};

StorageMongoDb.prototype.getFileById = async function getFileById (res, id) {
    const db = await this.connect(this.dbName);
    const bucket = new GridFSBucket(db,
        { bucketName: this.bucketName, //bucketName : 'darbyBucket'
            chunkSizeBytes: 30000 });

    // noinspection JSCheckFunctionSignatures
    bucket
        .find({
            _id: ObjectId(id)
        })
        .toArray((err, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    err: "no files exist"
                });
            } else
                bucket.openDownloadStream(ObjectId(id)).pipe(res);
        });
};



//const storage = multer.memoryStorage();//storageMongoDb()
/*
const upload = multer({
    dest: 'uploads/' // this saves your file into a directory called "uploads"
});
*/
module.exports = {
    multerUpload: function (opts) {
        const storage = new StorageMongoDb(opts);
        return {
            upload: multer({storage}),
            storage: storage
        };
    }
};