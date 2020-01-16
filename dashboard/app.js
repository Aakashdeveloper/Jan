var express = require('express');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var app = express();
var port = 7600;
let db;
var mongourl = 'mongodb://127.0.0.1:27017/';
var col_name="janUser"

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Add useer to DB
app.post('/addUser',(req,res) => {
    db.collection(col_name)
        .insertOne(req.body,(err,result) => {
            if(err){
                res.status(401)
            }else{
                res.send('data added')
            }
        })
});

// Get User from DB
app.get('/user',(req,res) => {
    db.collection(col_name).find().toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    })
});

app.put('/updateUser',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({'id': req.body.id},{
            $set:{
                id:req.body.id,
                name:req.body.name,
                city:req.body.city
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) throw err;
            res.send(result)
        })
})


app.delete('/deleteUser',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "id":req.body.id
    },(err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})

app.put('/deleteUsr',(req,res) => {
    db.collection(col_name).findOneAndDelete({
        "id":req.body.id
    },(err,result) => {
        if(err) throw err;
        res.send(result)
    }) 
})





MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('classpractice');
    app.listen(port,(err) => {
        console.log(`Server is listing to port ${port}`)
    })
})


///CRUD