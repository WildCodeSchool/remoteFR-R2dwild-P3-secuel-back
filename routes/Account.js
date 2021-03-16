const express = require('express')
const connection = require('../config')
const router = express.Router()

const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query('SELECT * from Account', [req.params.id], (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

router.post(
  '/',
  [
    check('Account_name').isLength({ min: 8 }),
    // account name must be at least 8 chars long
    check('Password').isLength({ min: 10 }),
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

router.put(
  '/',
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
      'UPDATE Account SET ? WHERE id=?',
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
          'SELECT * FROM Account WHERE id = ?',
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

module.exports = router
