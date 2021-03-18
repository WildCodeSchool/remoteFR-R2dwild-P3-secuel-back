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

app.use('/health_insurance', routes.health_insurance)

app.use('/pros', routes.pros)

app.use('/specialities', routes.specialities)

app.use('/notifications', routes.notifications)
app.use('/notif_insured', routes.notif_insured)
app.use('/refund', routes.refund)
app.use('/medical_events', routes.medical_events)

app.get('/', (req, res) => {
  res.send('Chicken World!')
})

app.listen(3000, () => console.log('Express server is running'))
