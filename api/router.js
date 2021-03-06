const router = require('express').Router()
const protectRoute = require('./middleware/protectRoute')

const userRoute = require('./user.controller')
const authRoute = require('./auth.controller')
const debtorRoute = require('./debtor.controller')
const creditorRoute = require('./creditor.controller')
const creditRoute = require('./credit.controller')
const debtRoute = require('./debt.controller')
const paymentRoute = require('./payment.controller')

router.use('/auth', authRoute)
router.use('/user', protectRoute, userRoute)
router.use('/debtor', protectRoute, debtorRoute)
router.use('/creditor', protectRoute, creditorRoute)
router.use('/credit', protectRoute, creditRoute)
router.use('/debt', protectRoute, debtRoute)
router.use('/payment', protectRoute, paymentRoute)

module.exports = router