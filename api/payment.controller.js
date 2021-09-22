const router = require('express').Router()
const Payment = require('../services/payment.service')


router.post('/', async function(req, res){
	const payment = new Payment(req.body)
	const [createdPayment, error] = await payment.create()

	if(createdPayment == null) return res.sendStatus(500)

	return res.status(200).json(createdPayment)
})

router.get('/:LoanId', async function(req, res){
	const [payments, error] = await Payment.getAll(req.params.LoanId)

	if(payments == null) return res.status(404).json({message: 'payments not found'})

	return res.status(200).json(payments)
})

module.exports = router