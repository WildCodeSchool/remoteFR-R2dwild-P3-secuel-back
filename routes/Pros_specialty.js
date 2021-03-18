const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM Pros_Specialty JOIN Pros ON pro_id = pro_id JOIN Specialities
    ON id_speciality = speciality_id',
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

router.get('/:id/:id', (req, res) => {
  connection.query(
    'SELECT * FROM Pros_Speciality WHERE speciality_id = ? AND pro_id = ?',
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
    const { speciality_name } = req.body
    return connection.query(
      'INSERT INTO Pros_Speciality(speciality_id, pro_id) VALUES(?, ?)',
      [speciality_id,
        pro_id],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving pro_spe')
        }
        return res.status(200).send('Successfully saved pro_spe')
      }
    )
  }
)

router.put('/:id/:id', (req, res) => {
  const idSpePro = req.params.id
  const newSpePro = req.body

  return connection.query(
    'UPDATE Pros_Speciality SET ? WHERE speciality_id = ? AND pro_id = ?',
    [newSpePro, idSpePro],
    err2 => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        })
      }

      connection.query(
        'SELECT * FROM speciality_id WHERE speciality_id = ? AND pro_id = ? ',
        idSpePro,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedSpePro = records[0]
          const { ...speciality_id } = updatedSpePro
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${Pros_Speciality.id}`
          return res.status(201).set('Location', location).json(Pros_Speciality)
        }
      )
    }
  )
})
//delete 
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Pros_Speciality WHERE speciality_id = ? AND pro_id= ?',
    [req.params.id],
    (err) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting data')
      } else {
        res.status(200).send("SpePro sucessfuly deleted !")
      }
    }
  )
})

module.exports = router
