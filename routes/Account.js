const express = require('express')
const connection = require('../config')
const router = express.Router()

const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query('SELECT * from Account', (err, results) => {
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
    'SELECT * from Account WHERE id_Compte=?',
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
  [
    check('Account_name').isLength({ min: 5 }),
    // account name must be at least 8 chars long
    check('Password').isLength({ min: 6 }),
    // let's assume a password should be 10 chars long
    check('Login').isEmail()
    // to check it's really an email adress
  ],
  (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    const { Account_name, Login, Password } = req.body
    return connection.query(
      'INSERT INTO Account(Account_name, Login,Password) VALUES(?,?,?)',
      [Account_name, Login, Password],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving account')
        }
        return res.status(200).send('Successfully saved account')
      }
    )
  }
)

// route for modification
router.put(
  '/:id',
  [
    check('Account_name').isLength({ min: 8 }),
    check('Password').isLength({ min: 10 }),
    check('Login').isEmail()
  ],
  (req, res) => {
    const idAccount = req.params.id
    const newAccount = req.body
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
    }
    return connection.query(
      'UPDATE Account SET ? WHERE id_Compte=?',
      [newAccount, idAccount],
      err => {
        if (err) {
          // MySQL reports a duplicate entry -> 409 Conflict
          if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
              error: 'Email already exists'
            })
          }
          // Other error codes -> 500
          return res.status(500).json({
            error: err.message,
            sql: err.sql
          })
        }
        return connection.query(
          'SELECT * FROM Account WHERE id_Compte = ?',
          idAccount,
          (err2, records) => {
            if (err2) {
              return res.status(500).json({
                error: err2.message,
                sql: err2.sql
              })
            }
            const updatedAccount = records[0]
            const { password, ...Account } = updatedAccount
            // Get the host + port (localhost:3000) from the request headers
            const host = req.get('host')
            // Compute the full location, e.g. http://localhost:3000/api/users/132
            // This will help the client know where the new resource can be found!
            const location = `http://${host}${req.url}/${Account.id}`
            return res.status(201).set('Location', location).json(Account)
          }
        )
      }
    )
  }
)

// route for delete account
router.delete('/:id', (req, res) => {
  connection.query(
    'DELETE FROM Account WHERE id_Compte = ?',
    [req.params.id],
    err => {
      if (err) {
        console.log(err)
        res.status(500).send('Error deleting account data')
      } else {
        res.status(200).send('account sucessfuly deleted !')
      }
    }
  )
})

router.get('/alls/:id', (req, res) => {
  // let cpt = req.query.id_Compte
  connection.query(
    `SELECT id_Insured, firstname, lastname, color FROM Insured AS I WHERE I.Account_id_Compte = ?`,
    [req.params.id],
    (err, insured) => {
      if (err) {
        console.log(err)
        res.status(500).send('Error retrieving data level 1')
      } else {
        connection.query(
          `SELECT I.id_Insured, I.firstname, I.lastname, 
          M.id_med_event, M.Date_Event, S.speciality_name, 
          M.secu_status, M.insurance_status 
          FROM Insured as I
          JOIN Medical_events AS M
          ON I.id_Insured = M.Insured_id_Insured
          JOIN Specialities as S 
          ON M.Specialities_id_speciality = S.id_speciality 
          WHERE M.Insured_Account_id_Compte = ?
          Order by I.id_Insured`,
          [req.params.id],
          (err, medical) => {
            if (err) {
              res.status(500).send('Error retrieving data level 2')
            } else {
              const obj = {
                insured: insured.map(insu => {
                  return {
                    ...insu,
                    medical: medical.filter(
                      med => med.id_Insured === insu.id_Insured
                    )
                  }
                })
              }
              res.status(200).json(obj)
            }
          }
        )
      }
    }
  )
})

module.exports = router
