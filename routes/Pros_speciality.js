const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    `SELECT * FROM Pros_Speciality ps 
    JOIN Pros AS p 
    ON ps.pros_pro_id = p.pro_id 
    JOIN Specialities s
    ON s.id_speciality = ps.specialities_id_speciality`,
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
    'SELECT * FROM Pros_Speciality as ps WHERE ps.id_Pros_Speciality = ? ',
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

router.post('/', (req, res) => {
  const { pros_pro_id, specialities_id_speciality, Status } = req.body
  return connection.query(
    'INSERT INTO Pros_Speciality (pros_pro_id, specialities_id_speciality, Status) VALUES(?, ?, ?)',
    [pros_pro_id, specialities_id_speciality, Status],
    err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error saving pro_spe')
      }
      return res.status(200).send('Successfully saved pro_spe')
    }
  )
})

router.put('/:id', (req, res) => {
  const idProSpe = parseInt(req.params.id)
  const newProSpe = req.body

  return connection.query(
    'UPDATE Pros_Speciality SET ? WHERE id_Pros_Speciality = ?',
    [newProSpe, idProSpe],
    err => {
      if (err) {
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(409).json({
            error: 'Pros name already exists'
          })
        }
        return res.status(500).json({
          error: err.message,
          sql: err.sql
        })
      }

      return connection.query(
        'SELECT * FROM Pros_Speciality  WHERE id_Pros_Speciality= ?',
        idProSpe,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedProSpe = records[0]
          const { ...Pros_Specialty } = updatedProSpe
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${Pros_Specialty.id}`
          return res.status(201).set('Location', location).json(Pros_Specialty)
        }
      )
    }
  )
})

//delete
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Pros_Specialty WHERE id_Pros_Speciality = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting data')
      } else {
        res.status(200).send('SpePro sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
