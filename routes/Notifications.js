const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM Notifications',
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

router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM Notifications WHERE id_Notification = ?',
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
    const { type, Message } = req.body
    return connection.query(
      'INSERT INTO Notifications (type, Message) VALUES(?,?)',
      [type, Message],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving notification')
        }
        return res.status(200).send('Successfully saved notification')
      }
    )
  }
)

router.put('/:id', (req, res) => {
  const idNotif = req.params.id
  const newNotif = req.body

  return connection.query(
    'UPDATE Notifications SET ? WHERE id_Notification = ?',
    [newNotif, idNotif],
    err2 => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        })
      }

      connection.query(
        'SELECT * FROM Notifications WHERE id_Notification = ?',
        idNotif,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedNotif = records[0]
          const { ...Notifications } = updatedNotif
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${Notifications.id}`
          return res.status(201).set('Location', location).json(Notifications)
        }
      )
    }
  )
})
//delete
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Notifications WHERE id_Notification = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting data')
      } else {
        res.status(200).send('Speciality sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
