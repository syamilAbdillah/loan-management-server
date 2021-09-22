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

router.patch('/:id', async function(req, res){
	
	const payment = new Payment(req.body)
	const [editedPayment, error]  = await payment.edit(req.params.id)

	if(error) return res.sendStatus(500)

	return res.status(200).json({
		message: 'success edit payment with id ' + req.params.id
	}) 
})

router.delete('/:id', async function(req, res){
	const [deletedPayment, error] = await Payment.cancelPayment(req.params.id)

	if(error) return res.sendStatus(404)

	return res.status(200).json({message: 'success delete payment with id ' + req.params.id})
})

module.exports = router