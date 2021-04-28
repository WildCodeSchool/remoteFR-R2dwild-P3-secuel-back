const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

router.get('/:id', (req, res) => {
  connection.query(
    `SELECT i.color, ni.notifications_id_Notification, n.type, n.Message, i.lastname, i.firstname 
    FROM notif_insured AS ni
    JOIN Insured AS i 
    ON ni.insured_id_Insured= i.id_insured 
    JOIN Notifications AS n 
    ON ni.notifications_id_Notification = n.id_Notification
    WHERE i.Account_id_Compte=? `,
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
router.get('/modif/:id', (req, res) => {
  connection.query(
    `SELECT * FROM notif_insured AS ni
    WHERE id_notif_insured=? `,
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

router.get('/', (req, res) => {
  connection.query('SELECT * FROM notif_insured ', (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post('/', (req, res) => {
  const {
    notifications_id_Notification,
    insured_id_Insured,
    insured_Account_id_Compte,
    Status
  } = req.body
  return connection.query(
    `INSERT INTO notif_insured
    (notifications_id_Notification,insured_id_Insured,insured_Account_id_Compte, Status ) 
    VALUES(?,?,?,?)`,
    [
      notifications_id_Notification,
      insured_id_Insured,
      insured_Account_id_Compte,
      Status
    ],
    err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error saving notif notif_insured')
      }
      return res.status(200).send('Successfully saved notif_insured')
    }
  )
})

router.put('/:id', (req, res) => {
  const idNotifIns = Number(req.params.id)
  const newNotifIns = req.body

  return connection.query(
    'UPDATE notif_insured SET ? WHERE id_notif_insured= ?',
    [newNotifIns, idNotifIns],
    err2 => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        })
      }

      connection.query(
        'SELECT * FROM notif_insured WHERE id_notif_insured= ?',
        idNotifIns,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedNotifIns = records[0]
          const { ...notif_insured } = updatedNotifIns
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${notif_insured.id}`
          return res.status(201).set('Location', location).json(notif_insured)
        }
      )
    }
  )
})
//delete
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM notif_insured WHERE id_notif_insured = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting data')
      } else {
        res.status(200).send('Notification sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
