const router = require('express').Router()
const Payment = require('../services/payment.service')


router.post('/', async function(req, res){
	const payment = new Payment(req.body)
	const [createdPayment, error] = await payment.create()

	if(createdPayment == null) return res.sendStatus(500)

	return res.status(200).json(createdPayment)
})

module.exports = router