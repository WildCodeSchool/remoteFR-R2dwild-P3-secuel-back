const account = require('./Account')
const insured = require('./Insured')
const health_insurance = require('./Health_insurance')
const specialities = require('./specialities')
const pros = require('./Pros')
const notifications = require('./Notifications')
const notif_insured = require('./notif_insured')
const refund = require('./refund')
const medical_events = require('./Medical_events')

module.exports = {
  insured,
  account,
  health_insurance,
  pros,
  specialities,
  notifications,
  notif_insured,
  refund
  medical_events
}