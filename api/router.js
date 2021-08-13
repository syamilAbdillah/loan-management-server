const router = require('express').Router()
const protectRoute = require('./middleware/protectRoute')

const userRoute = require('./user.controller')
const authRoute = require('./auth.controller')
const debtorRoute = require('./debtor.controller')
const creditorRoute = require('./creditor.controller')

router.use('/auth', authRoute)
router.use('/user', protectRoute, userRoute)
router.use('/debitor', protectRoute, debtorRoute)
router.use('/creditor', protectRoute, creditorRoute)

module.exports = router