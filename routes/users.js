const express = require('express')
const connection = require('./config')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/:users', (req, res) => {
  connection.query(
    'SELECT * from User WHERE id=?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error retrieving data')
      } else {
        res.status(200).json(results)
      }
    }
  )
})
