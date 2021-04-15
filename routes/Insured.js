const express = require('express')
const connection = require('../config')
const router = express.Router()

const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query(
    'SELECT *, DATE_FORMAT(birth_date, "%d/%m/%Y") as bd from Insured',
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
    'SELECT *, DATE_FORMAT(birth_date, "%d/%m/%Y") as bd from Insured WHERE id_Insured=?',
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

router.get('/allAccI', (req, res) => {
  let cpt = req.query.id_Compte
  connection.query(
    `SELECT * FROM Insured WHERE Account_id_Compte = ?`[cpt],
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

router.get('/insActe/:id', (req, res) => {
  // let cpt = req.query.id_Compte
  connection.query(
    `SELECT I.id_Insured, I.firstname, I.lastname, 
    id_med_event, Date_Event, 
    M.secu_status, M.insurance_status, 
    S.speciality_name
    FROM Insured AS I 
    LEFT JOIN Medical_events AS M
    ON M.Insured_id_Insured = I.id_Insured
    LEFT JOIN Specialities AS S
    ON S.id_speciality = M.Specialities_id_speciality
    WHERE I.Account_id_Compte = ?`,
    [req.params.id],
    (err, insured) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error retrieving data level 1')
      } else {
        res.status(200).json({ insured })
      }
    }
  )
})

router.post(
  '/',
  [
    check('lastname').isLength({ min: 3 }),
    check('firstname').isLength({ min: 3 }),
    check('social_security_num').isLength({ min: 13 }),
    check('email').isEmail(),
    check('tel').isLength({ min: 10 }),
    check('Password').isLength({ min: 10 }),
    check('birth_date').isISO8601()
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const {
      lastname,
      firstname,
      social_security_num,
      email,
      tel,
      Password,
      birth_date,
      Account_id_Compte
    } = req.body
    return connection.query(
      'INSERT INTO Insured(lastname, firstname, social_security_num, email, tel, Password, birth_date, Account_id_Compte) VALUES(?,?,?,?,?,?,?,?)',
      [
        lastname,
        firstname,
        social_security_num,
        email,
        tel,
        Password,
        birth_date,
        Account_id_Compte
      ],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving insured')
        }
        return res.status(200).send('Successfully saved insured')
      }
    )
  }
)

router.put(
  '/:id',
  [
    check('lastname').isLength({ min: 2 }),
    check('firstname').isLength({ min: 2 }),
    check('social_security_num').isLength({ min: 13 }),
    check('email').isEmail(),
    check('tel').isLength({ min: 10 }),
    check('Password').isLength({ min: 10 }),
    check('birth_date').isISO8601()
  ],
  (req, res) => {
    const idInsured = req.params.id
    const newInsured = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    return connection.query(
      'UPDATE Insured SET ? WHERE id_Insured=?',
      [newInsured, idInsured],
      err => {
        if (err) {
          // MySQL reports a duplicate entry -> 409 Conflict
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              error: 'ID already exists'
            })
          }
          // Other error codes -> 500
          return res.status(500).json({
            error: err.message,
            sql: err.sql
          })
        }
        return connection.query(
          'SELECT * FROM Insured WHERE id_Insured = ?',
          idInsured,
          (err2, records) => {
            if (err2) {
              return res.status(500).json({
                error: err2.message,
                sql: err2.sql
              })
            }
            const updatedInsured = records[0]
            const { password, ...Insured } = updatedInsured
            // Get the host + port (localhost:3000) from the request headers
            const host = req.get('host')
            // Compute the full location, e.g. http://localhost:3000/api/users/132
            // This will help the client know where the new resource can be found!
            const location = `http://${host}${req.url}/${Insured.id}`
            return res.status(201).set('Location', location).json(Insured)
          }
        )
      }
    )
  }
)

// route for delete insured
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Insured WHERE id_Insured = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting insured data')
      } else {
        res.status(200).send('insured sucessfuly deleted !')
      }
    }
  )
})

module.exports = router
