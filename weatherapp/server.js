import express from 'express'
const app = express();
const port = 7800;
import request from 'request';

app.use(express.static(__dirname+'/public'));
app.set('views','./src/views');
app.set('view engine','ejs');

const ApiUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=London&mode=json&units=metric&cnt=5&appid=fbf712a5a83d7305c3cda4ca8fe7ef29";

app.get('/weather',(req,res) => {
    request(ApiUrl,(err,response) => {
        //res.send(response.body)
        var out = JSON.parse(response.body)
        res.render('index',{title:'WeatherApp', result:out})
    })
})


app.listen(port,(err) => {
    if(err) throw err;
    console.log(`Api call is running on port ${port}`)
})