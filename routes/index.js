const account = require('./Account')
const health_insurance = require('./Health_insurance')
const insured = require('./Insured')
const medical_events = require('./Medical_events')
const notifications = require('./Notifications')
const notif_insured = require('./notif_insured')
const pros = require('./Pros')
const pros_speciality = require('./Pros_speciality')
const refund = require('./refund')
const specialities = require('./Specialities')

module.exports = {
  insured,
  account,
  health_insurance,
  pros,
  specialities,
  notifications,
  notif_insured,
  refund,
  medical_events,
  pros_speciality
}
