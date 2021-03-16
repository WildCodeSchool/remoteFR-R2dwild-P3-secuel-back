const express = require('express')
const connection = require('../config')
const router = express.Router()

//onst { check, validationResult } = require('express-validator')

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

router.put('/:id', (req, res) => {
  const idPro = req.params.id
  const newPro_name = req.body

  return connection.query(
    'UPDATE Pros SET ? Where pro_id = ?',
    [newPro_name, idPro],
    err => {
      if (err) {
        // MySQL reports a duplicate entry -> 409 Conflict
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            error: 'Pros name already exists'
          })
        }
        // Other error codes -> 500
        return res.status(500).json({
          error: err.message,
          sql: err.sql
        })
      }
      const rsql = 'SELECT * FROM Pros WHERE pro_id = ?'
      return connection.query(rsql, idPro, (err2, resultListPro) => {
        if (err2) {
          return res.status(500).json({
            error: err2.message,
            sql: err2.sql
          })
        }
        const updatedPro = resultListPro[0]
        const { ...Pros } = updatedPro
        // Get the host + port (localhost:3000) from the request headers
        const host = req.get('host')
        // Compute the full location, e.g. http://localhost:3000/api/users/132
        // This will help the client know where the new resource can be found!
        const location = `http://${host}${req.url}/${Pros.pro_id}`
        return res.status(201).set('Location', location).json(Pros)
      })
    }
  )
})

module.exports = router
