const express = require('express')
const connection = require('../config')
const router = express.Router()

const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    'SELECT * from Health_insurance',
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

router.post('/', [check('insurance_name').isLength({ min: 5 })], (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const { insurance_name } = req.body
  return connection.query(
    'INSERT INTO Health_insurance(insurance_name) VALUES(?)',
    [insurance_name],
    err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error saving Health_insurance')
      }
      return res.status(200).send('Successfully saved Health_insurance')
    }
  )
})

router.put('/', [check('insurance_name').isLength({ min: 5 })], (req, res) => {
  const idHealthIns = req.params.id
  const newHealthIns = req.body
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  return connection.query(
    'UPDATE Health_insurance SET ? WHERE id=?',
    [newHealthIns, idHealthIns],
    err => {
      if (err) {
        // MySQL reports a duplicate entry -> 409 Conflict
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            error: 'Insurance already exists'
          })
        }
        // Other error codes -> 500
        return res.status(500).json({
          error: err.message,
          sql: err.sql
        })
      }
      return connection.query(
        'SELECT * FROM Health_insurance WHERE id = ?',
        idHealthIns,
        (err2, records) => {
          if (err2) {
            return res.status(500).json({
              error: err2.message,
              sql: err2.sql
            })
          }
          const updatedHealthIns = records[0]
          const { Health_insurance } = updatedHealthIns
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${Health_insurance.id}`
          return res
            .status(201)
            .set('Location', location)
            .json(Health_insurance)
        }
      )
    }
  )
})

// route for delete insurance
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Health_insurance WHERE id_insurance = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting insurance data')
      } else {
        res.status(200).send('insurance sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
