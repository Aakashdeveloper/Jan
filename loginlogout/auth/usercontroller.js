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


router.get('/users',(req,res) => {
    User.find({},(err,user) => {
        if(err) return res.status(500).send('Erro in fetching user');
        res.send(user)
    });
})

module.exports = router

