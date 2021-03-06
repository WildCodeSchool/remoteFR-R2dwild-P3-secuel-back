const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

// get table Medical_events
router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM Medical_events AS M JOIN Specialities as S ON M.Specialities_id_speciality = S.id_speciality JOIN Insured AS I ON M.Insured_id_Insured = I.id_Insured JOIN Account AS A ON M.Insured_Account_id_Compte = A.id_Compte JOIN Pros AS P ON M.Pros_pro_id = P.pro_id',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error retrieving data table Medical_events')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

// get one medical event with id
router.get('/:id', (req, res) => {
  connection.query(
    'SELECT * FROM Medical_events AS M JOIN Specialities as S ON M.Specialities_id_speciality = S.id_speciality JOIN Insured AS I ON M.Insured_id_Insured = I.id_Insured JOIN Account AS A ON M.Insured_Account_id_Compte = A.id_Compte JOIN Pros AS P ON M.Pros_pro_id = P.pro_id WHERE id_med_event = ?',
    [req.params.id],
    (err, results) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error retrieving data Medical_events_ID')
      } else {
        res.status(200).json(results)
      }
    }
  )
})

// post new Medicalevent
router.post('/', (req, res) => {
  const {
    Date_Event,
    amount_Event,
    secu_status,
    insurance_status,
    // list of foreign key in medical event
    Specialities_id_speciality,
    Insured_id_Insured,
    Insured_Account_id_Compte,
    Pros_pro_id
  } = req.body
  return connection.query(
    'INSERT INTO Medical_events(Date_Event, amount_Event, secu_status, insurance_status, Specialities_id_speciality, Insured_id_Insured, Insured_Account_id_Compte, Pros_pro_id) VALUES(?,?,?,?,?,?,?,?)',
    [
      Date_Event,
      amount_Event,
      secu_status,
      insurance_status,
      Specialities_id_speciality,
      Insured_id_Insured,
      Insured_Account_id_Compte,
      Pros_pro_id
    ],
    err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error saving Medical_events')
      }
      return res.status(200).send('Successfully saved Medical_events')
    }
  )
})

router.put('/:id', (req, res) => {
  const idMedEvent = req.params.id
  const newMedEvent = req.body

  return connection.query(
    'UPDATE Medical_events SET ? WHERE id_med_event = ?',
    [newMedEvent, idMedEvent],
    err2 => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        })
      }

      connection.query(
        'SELECT * FROM Medical_events WHERE id_med_event = ?',
        idMedEvent,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedMedEvent = records[0]
          const { ...medical_events } = updatedMedEvent
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${medical_events.id}`
          return res.status(201).set('Location', location).json(medical_events)
        }
      )
    }
  )
})

//delete
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Medical_events WHERE id_med_event = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting Medical_events')
      } else {
        res.status(200).send('Medical_events sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
