var express = require('express');
var moviesRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017"




function router(menu){
    
    moviesRouter.route('/')
        .get((req,res) => {
          mongodb.connect(url,function(err,dc){
            if(err){
              res.status(501).send('Error while connecting')
            }else{
              const dbo = dc.db('classdatabase');
              dbo.collection('movies').find({}).toArray((err,data) => {
                if(err){
                  res.status(402).send('Error while fetching')
                }else{
                  res.render('movies',{title:'Movies Page',menu,movies:data})
                }
              })
            }
          })
    });


    moviesRouter.route('/details/:id')
        .get((req,res) => {
            var {id} = req.params;
            console.log(id)
            mongodb.connect(url,function(err,dc){
              if(err){
                res.status(501).send('Error while connecting')
              }else{
                const dbo = dc.db('classdatabase');
                dbo.collection('movies').findOne({_id:id}, function(err,data) {
                  if(err){
                    res.status(402).send('Error while fetching')
                  }else{
                    console.log(data)
                    res.render('moviesDetails',{title:'Movies Details Page',menu:menu,movies:data})
                  }
                })
              }
            })
           
    });

    return moviesRouter
}



module.exports = router;