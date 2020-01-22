var express = require('express');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;
var bodyParser = require('body-parser');
var app = express();
var port = 7600;
let db;
var mongourl = 'mongodb://127.0.0.1:27017/';
var col_name="janUser";

app.use(express.static(__dirname+'/public'));
app.set('views', './src/views');
app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/health',(req,res) => {
    res.send("Api is running");
});

// Add useer to DB
app.post('/addUser',(req,res) => {
    var data = {
        "id" : req.body.id,
        "name" :req.body.name,
        "city" : req.body.city,
        "phone" : req.body.phone,
        "actin" : true
    }
    db.collection(col_name)
        .insertOne(data,(err,result) => {
            if(err){
                res.status(401)
            }else{
                res.redirect('/')
            }
        })
});

// Get User from DB
app.get('/',(req,res) => {
    db.collection(col_name).find({actin:true}).toArray((err,result) => {
        if(err) throw err;
        res.render('index',{data:result})
    })
});

app.get('/user',(req,res) => {
    var query = {};
    if(req.query.id && req.query.name){
        query = {name:req.query.name,id:parseInt(req.query.id),actin:true}
    }else if(req.query.id){
        query = {"id":req.query.id,actin:true}
    } else if(req.query.name){
        query = {"name":req.query.name,actin:true}
    } else{
        query ={actin:true}
    }

    db.collection(col_name).find(query).toArray((err,result) => {
        if(err) throw err;
        res.status(200).send(result)
    });
});


app.put('/updateUser',(req,res) => {
    console.log(req.body)
    db.collection(col_name)
        .findOneAndUpdate({'id': req.body.id},{
            $set:{
                id:req.body.id,
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                actin:true
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

app.put('/softDelete',(req,res) => {
    db.collection(col_name)
        .findOneAndUpdate({'id': req.body.id},{
            $set:{
                id:req.body.id,
                name:req.body.name,
                city:req.body.city,
                phone:req.body.phone,
                actin:false
            }
        },{
            upsert:true
        },(err,result) => {
            if(err) throw err;
            res.send(result)
        })
});

app.get('/new',(req,res) => {
    var id = Math.floor(Math.random()*10000)
    var active = true
    res.render('admin',{id:id,active})
})




MongoClient.connect(mongourl,(err,client) => {
    if(err) throw err;
    db = client.db('classpractice');
    app.listen(port,(err) => {
        console.log(`Server is listing to port ${port}`)
    })
})


///CRUD