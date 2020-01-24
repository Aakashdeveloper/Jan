var express = require('express');
const database = require('./database');
const app = express();
const port = 6700;

app.post('/addpord', (req,res) => {
    var mydata = {"name":"abc"}
    database.prototype.postData(mydata)
    res.send('data inserted')
})

app.get('/getProd',(req,res) => {
    let out = database.prototype.getData('first')
    res.send(out)
})

app.listen(port, (err) => {
    console.log(`App is running on port ${port}`)
})