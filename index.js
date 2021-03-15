const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const app = express()
const routes = require('./routes/index')

app.use(cors('*'))
app.use(morgan('dev'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/account', routes.account)

app.use('/insured', routes.insured)

app.get('/', (req, res) => {
  res.send('Chicken World!')
})

app.listen(3000, () => console.log('Express server is running'))
