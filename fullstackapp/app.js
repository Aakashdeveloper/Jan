var express = require('express');
var app = express();
var port = 7800;
var morgan = require('morgan');
var chalk = require('chalk');

//Static file path
app.use(express.static(__dirname+'/public'))
//Html file
app.set('views', './src/views');
// View engine
app.set('view engine','ejs');
app.use(morgan('tiny'))

var menu = [
    {"name":'Home',"link":'/'},
    {"name":'Movies',"link":"/movies"},
    {"name":'Products',"link":"/products"}
]

var moviesRouter = require('./src/routes/moviesRoute')(menu);
var productRouter = require('./src/routes/productRoute')(menu);

app.get('/', function(req,res){
    res.render('home',{title:'Home Page',menu})
});

app.use('/movies', moviesRouter);
app.use('/products', productRouter);


app.listen(port,function(err){
    if(err) throw err;
    else{
        console.log(`${chalk.blue(`Server is running on port ${port}`)}`)
    }
})
