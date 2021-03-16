const express = require('express')
const connection = require('../config')
const router = express.Router()
const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    'SELECT * FROM Specialities',
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
      'INSERT INTO specialities(speciality_name) VALUES(?)',
      [speciality_name],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving speciality')
        }
        return res.status(200).send('Successfully saved speciality')
      }
    )
  }
)

router.put(
  '/',
  (req, res) => {
    const idSpe = req.params.id
    const newSpe = req.body
    
    return connection.query(
      'UPDATE specialities SET ? WHERE id=?',
      [newSpe, idSpe],
          idSpe,
          (err2, records) => {
              if (err2) {
                return res.status(500).json({
                  error: err2.message,
                  sql: err2.sql
                })
              }
            const updatedSpe = records[0]
            const {  ...specialities } = updatedSpe
            // Get the host + port (localhost:3000) from the request headers
            const host = req.get('host')
            // Compute the full location, e.g. http://localhost:3000/api/users/132
            // This will help the client know where the new resource can be found!
            const location = `http://${host}${req.url}/${specialities.id}`
            return res.status(201).set('Location', location).json(specialities)
      
      
  
  }
)
}
)

module.exports = router
