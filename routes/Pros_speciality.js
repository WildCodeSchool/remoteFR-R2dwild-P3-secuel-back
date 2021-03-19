const express = require('express')
const connection = require('../config')
const router = express.Router()
//const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM Pros_Specialty ps JOIN Pros AS p ON ps.pro_id = p.pro_id JOIN Specialities s ON s.id_speciality = ps.speciality_id',
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
    'SELECT * FROM Pros_Specialty as ps WHERE ps.speciality_id = ? AND ps.pro_id = ?',
    [req.params.id, req.params.id],
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
  const { speciality_id, pro_id } = req.body
  return connection.query(
    'INSERT INTO Pros_Specialty(speciality_id, pro_id) VALUES(?, ?)',
    [speciality_id, pro_id],
    err => {
      if (err) {
        console.log(err)
        return res.status(500).send('Error saving pro_spe')
      }
      return res.status(200).send('Successfully saved pro_spe')
    }
  )
})

/*router.put('/:id/:id', (req, res) => {
  const idPro = parseInt(req.params.id)
  const idSpe = parseInt(req.params.id)
  const newPro = req.body
  const newSpe = req.body
  console.log(idPro + idSpe)
  return connection.query(
    'UPDATE Pros_Specialty SET speciality_id=? ,pro_id=? WHERE speciality_id = ? AND pro_id = ?',
    [newSpe, newPro, idSpe, idPro],
    err2 => {
      if (err2) {
        return res.status(500).json({
          error: err2.message,
          sql: err2.sql
        })
      }

      connection.query(
        'SELECT * FROM Pros_Specialty  WHERE speciality_id = ? AND pro_id = ? ',
        idSpe,
        idPro,
        (err3, records) => {
          if (err3) {
            res.status(500).json({
              error: err3.message,
              sql: err3.sql
            })
          }

          const updatedSpePro = records[0]
          const { ...Pros_Specialty } = updatedSpePro
          // Get the host + port (localhost:3000) from the request headers
          const host = req.get('host')
          // Compute the full location, e.g. http://localhost:3000/api/users/132
          // This will help the client know where the new resource can be found!
          const location = `http://${host}${req.url}/${Pros_Specialty.id.id}`
          return res.status(201).set('Location', location).json(Pros_Specialty)
        }
      )
    }
  )
})
*/
//delete
router.delete('/:id/:id', (req, res) => {
  connection.query(
    'DELETE FROM Pros_Specialty WHERE speciality_id = ? AND pro_id= ?',
    [req.params.id, req.params.id],
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
