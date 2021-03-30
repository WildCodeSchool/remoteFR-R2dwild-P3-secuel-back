
const cors = require('cors')
const express = require('express')
const morgan = require('morgan')
const routes = require('./routes/index')

const app = express()

app.use(cors('*'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.use('/account', routes.account)
app.use('/health_insurance', routes.health_insurance)
app.use('/insured', routes.insured)
app.use('/pros', routes.pros)
app.use('/Pros_speciality', routes.pros_speciality)
app.use('/medical_events', routes.medical_events)
app.use('/notifications', routes.notifications)
app.use('/notif_insured', routes.notif_insured)
app.use('/refund', routes.refund)
app.use('/specialities', routes.specialities)

app.listen(3000, () => console.log('Express server is running'))
