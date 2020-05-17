const {connect} = require("./dbConnect");
const {GridFSBucket} = require('mongodb');
const {createReadStream} = require("fs");
const writeFileToDb = async ()=> {
    const db = await connect();
    const bucket = new GridFSBucket(db,
        { bucketName: 'darbyBucket' }); //, chunkSizeBytes: 1

    createReadStream('C:\\Rules\\files\\darbyfurnitureoutlet.com.xlsx').
    pipe(bucket.openUploadStream('darbyfurnitureoutlet.com.xlsx')).
    on('error', function(error) {
        console.error(error);
    }).
    on('finish', function() {
        console.log('done! db write.');
        //process.exit(0);
    });
};

module.exports = {writeFileToDb};
