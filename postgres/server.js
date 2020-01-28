const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'docker',
  port: 5432,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})


app.get('/users', (req,res) => {
    pool.query('SELECT * FROM employee', (error, results) => {
        if (error) {
          throw error
        }
        res.status(200).json(results.rows)
    })
});

app.post('/users', (req,res) => {
    const { city, name, phone } = req.body

  pool.query('INSERT INTO employee (city, name, phone) VALUES ($1, $2, $3)', [city, name, phone], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added`)
  })
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})