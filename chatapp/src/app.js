import express from 'express';
import path from 'path';
import http from 'http';
let io = require('socket.io');
let app = express();


app.set('port', process.env.PORT || 6700);
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', './src/views');
app.set('view engine','ejs');

app.get('/',(req,res) => {
    res.render('index')
})

let server = http.createServer(app).listen(app.get('port'),()=> {
    console.log('Server is running')
});

io = require('socket.io').listen(server);

io.on('connection', (socket) => {
    /*socket.on('nick', (nick) => {
        socket.set('nickname', nick);
    });*/

    socket.on('chat', (data) => {
        socker.get('nickname',(err,nick) => {
            let  nickname = err ? 'Anonymous': nick;

            let payload = {
                message: data.message,
                nick:nickname
            };

            socket.emit('chat', payload);
            socket.broadcast.emit('chat', payload)
        })
    })
})