const express = require('express')
const connection = require('../config')
const router = express.Router()

const { check, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  connection.query('SELECT * from Insured', [req.params.id], (err, results) => {
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
    check('lastname').isLength({ min: 3 }),
    check('firstname').isLength({ min: 3 }),
    check('social_security_num').isInt({min:17, max:17}),
    check('email').isEmail(),
    check('tel').isLength({min:10}),
    check('Password').isLength({ min: 10 }),
    check('Date_Birth').isISO8601(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { Account_name, Login, Password } = req.body
    return connection.query(
      'INSERT INTO Insured(lastname, firstname, social_security_num, email, tel, password, Date_Birth) VALUES(?,?,?,?,?,?,?)',
      [lastname, firstname, social_security_num, email, tel, password, Date_Birth],
      err => {
        if (err) {
          console.log(err)
          return res.status(500).send('Error saving Insured')
        }
        return res.status(200).send('Successfully saved Insured')
        })
      }
    )


    router.put('/', [
      check('lastname').isLength({ min: 3 }),
      check('firstname').isLength({ min: 3 }),
      check('social_security_num').isInt({min:17, max:17}),
      check('email').isEmail(),
      check('tel').isInt({min:10, max:10}),
      check('Password').isLength({ min: 10 }),
      check('Date_Birth').isISO8601(),
    ],(req,res) =>{
      const idInsured=req.params.id;
      const newInsured=req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      return connection.query(
        'UPDATE Insured SET ? WHERE id=?',
        [newInsured, idInsured],
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
          }
          return connection.query(
            'SELECT * FROM Insured WHERE id = ?',
            idInsured,
            (err2, records) => {
              if (err2) {
                return res.status(500).json({
                  error: err2.message,
                  sql: err2.sql,
                });
              }
              const updatedInsured= records[0];
              const { password, ...Insured } = updatedInsured;
              // Get the host + port (localhost:3000) from the request headers
              const host = req.get('host');
              // Compute the full location, e.g. http://localhost:3000/api/users/132
              // This will help the client know where the new resource can be found!
              const location = `http://${host}${req.url}/${Insured.id}`;
              return res.status(201).set("Location", location).json(Insured);
            }
          )
        })
    }
    )

module.exports = router