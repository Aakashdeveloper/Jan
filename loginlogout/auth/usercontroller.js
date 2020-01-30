const express  = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const brcypt = require('bcryptjs');
const config = require('../config');
const User = require('./user');

router.use(bodyParser.urlencoded({extended:false}));
router.use(bodyParser.json());

//Register User
router.post('/register', (req,res) => {
    const hashedPassword = brcypt.hashSync(req.body.password,8);
    User.create({
        name: req.body.name,
        password: hashedPassword,
        email: req.body.email
    },(err,user) => {
        if(err) return res.status(500).send('Problem in registring user');
        res.send('Registration Successfull')
    });
});

router.post('/login', (req,res) => {
    User.findOne({email: req.body.email},(err,user) => {
        if(err) return res.status(500).send('Error on server');
        if(!user) { res.send('Not Registered user')}
        else{
            const passIsValid= brcypt.compareSync(req.body.password, user.password)
            if(!passIsValid) return res.status(401).send({auth: false, token:null});
            var token = jwt.sign({id:user._id}, config.secert, {
                expiresIn: 86400 //24 hours
            });
            res.send({auth: true, token:token})
        }
    });
});

router.get('/userinfo', (req,res) => {
    var token = req.headers['x-access-token'];
    if(!token) res.status(401).send({auth: false, token:'No Token provided'});
    jwt.verify(token, config.secert, (err,decode) => {
        if(err) return res.status(401).send({auth: false, token:'Invalid Token provided'});
        User.findById(decode.id,{password:0},(err,user) =>{
            if(err) return res.status(500).send({auth: false, token:'Fail to get user'});
            if(!user) res.status(401).send({auth: false, token:'No User found'})
            res.send(user)
        })
    })

})

router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) return res.status(500).send('Erro in fetching user');
        res.send(user)
    });
})

module.exports = router

