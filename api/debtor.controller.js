const router = require('express').Router()
const Debtor = require('../services/debtor.service')

router.get('/', async function(req, res){
	const debtor = new Debtor('')
	const debtors = await debtor.getAll(req.user.id)

	if(debtors == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(debtors)
})

router.post('/',async function(req, res){
	const debtor 		= new Debtor(req.body.name)
	const newDebtor 	= await debtor.addContact(req.user.id)

	if(newDebtor == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(newDebtor)
})

router.patch('/:id',async function(req, res){
	const debtor = new Debtor(req.body.name)
	const editedDebtor = await debtor.edit(req.params.id)

	if(editedDebtor == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(editedDebtor)
})

router.delete('/:id', async function(req, res){
	const debtor = new Debtor('')
	const deletedDebtor = await debtor.delete(req.params.id)

	if(deletedDebtor == null){
		return res.sendStatus(500)
	}

	return res.sendStatus(200)
})

module.exports = router