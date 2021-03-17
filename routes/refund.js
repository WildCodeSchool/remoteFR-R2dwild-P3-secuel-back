const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query('SELECT * FROM refund', [req.params.id], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM refund WHERE id_refund = ?',
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

router.post(
  '/',

  (req, res) => {
    const {
      Amount_Refund,
      Date_Refund,
      Health_insurance_id_Mutuelle,
      Medical_events_id_Actes
    } = req.body
    return connection.query(
      'INSERT INTO refund( Amount_Refund, Date_Refund, Health_insurance_id_Mutuelle, Medical_events_id_Actes) VALUES(?, ?, ?, ?)',
      [
        Amount_Refund,
        Date_Refund,
        Health_insurance_id_Mutuelle,
        Medical_events_id_Actes
      ],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving refund')
        }
        return res.status(200).send('Successfully saved refund')
      }
    )
  }
)

router.put('/:id', (req, res) => {
  const idSpe = req.params.id
  const newSpe = req.body

  return connection.query(
    'UPDATE refund SET ? WHERE id_refund = ?',
    [newRef, idRef],
    err2 => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        })
      }

      connection.query(
        'SELECT * FROM refund WHERE id_refund = ?',
        idRef,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedRefund = records[0]
          const { ...refund } = updatedRefund
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${refund.id}`
          return res.status(201).set('Location', location).json(refund)
        }
      )
    }
  )
})
//delete
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM refund WHERE id_refund = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting data')
      } else {
        res.status(200).send('refund sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
