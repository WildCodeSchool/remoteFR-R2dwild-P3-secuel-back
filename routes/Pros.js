const express = require('express')
const connection = require('../config')
const router = express.Router()

const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM Pros', [req.params.id], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  const { pro_name } = req.body
  return connection.query(
    'INSERT INTO Pros (pro_name) value (?)',
    [pro_name],
    err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error saving pro_name')
      }
      return res.status(200).send('Successfully saved Pros')
    }
  )
})

router.put('/', (req, res) => {
  const { idPro } = req.params.id
  const { newPro_name } = req.body

  return connection.query(
    'UPDATE Pros SET ? Where ?',
    [newPro_name, idPro],
    err => {
      if (err) {
        // MySQL reports a duplicate entry -> 409 Conflict
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            error: 'Email already exists'
          })
        }
      }
      // Other error codes -> 500
      return res.status(500).json({
        error: err.message,
        sql: err.sql
      })
    }
  )
})

module.exports = router
