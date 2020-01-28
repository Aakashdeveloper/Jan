const express  = require('express');
const app = express();
const port = 8700;
const db = require('./db');

const UserController = require('./auth/usercontroller');
app.use('/api/auth', UserController)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
