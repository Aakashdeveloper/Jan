const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017"

const maincall = () => {};

maincall.prototype.postData = (myobj) => {
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        var dbo= db.db('testjannode');
        dbo.collection('first').insertOne(myobj,  (err) => {
            if(err) throw err;
            
            db.close();
        })
    })
    var out = "'data inserted';"
    return out;
};

var out
maincall.prototype.getData = (colName) => {
    MongoClient.connect(url, (err,db) => {
        if(err) throw err;
        var dbo= db.db('testjannode');
        dbo.collection(colName).find({}).toArray((err,result) => {
            if(err) throw err;
            console.log('Data Fetched')
            out = result
        })
    })
    return out
};


module.exports = maincall;