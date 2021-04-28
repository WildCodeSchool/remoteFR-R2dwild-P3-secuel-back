const express = require('express')
const connection = require('../config')
const router = express.Router()

router.get('/', (req, res) => {
  const mysqlAll = `SELECT * FROM Account AS Acc
  JOIN Insured AS Ins ON Ins.Account_id_Compte = acc.Account_id_Compte
  JOIN Medical_events AS ME ON ME.Insured_id_Insured = Ins.id_Insured`
  connection.query(mysqlAll, (err, results) => {
    if (err) {
      console.log(err)
      res.status(500).send('Error retrieving data')
    } else {
      res.status(200).json(results)
    }
  })
})

module.exports = router
