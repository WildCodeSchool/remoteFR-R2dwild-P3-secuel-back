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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
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
        })
      }
    )


    router.put('/', [
      check('Account_name').isLength({ min: 8 }),
      check('Password').isLength({ min: 10 }),
      check('Login').isEmail()
    ],(req,res) =>{
      const idAccount=req.params.id;
      const newAccount=req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      return connection.query(
        'UPDATE Account SET ? WHERE id=?',
        [newAccount, idAccount],
        (err)=>{
          if (err) {
            // MySQL reports a duplicate entry -> 409 Conflict
            if (err.code === 'ER_DUP_ENTRY') {
              return res.status(409).json({
                error: 'Email already exists',
              });
            }
            // Other error codes -> 500
            return res.status(500).json({
              error: err.message,
              sql: err.sql,
            });
            // en attente de la suite validation de l objet update
          }
        })
    }

module.exports = router
