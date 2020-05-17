const mongoClient = require("mongodb").MongoClient;
let dbConnection = null;

const connect = () => {
    return new Promise((resolve, reject) => {
        if(dbConnection)
            resolve(dbConnection);
        else
            mongoClient.connect(process.env.DB_CONN,{
                    useNewUrlParser: true,
                    sslValidate: false,
                    useUnifiedTopology: true },
                function(err, client) {
                    if(err)
                        reject(err);
                    else {
                        dbConnection = client.db("identity");
                        resolve(dbConnection);
                    }
                });
    });
};

const connectNweDb =(dbName) => {
    return connect().then((conn) => {
        return conn.db(dbName);
    })
};

// noinspection JSUnusedGlobalSymbols
module.exports = {connect, connectNweDb};