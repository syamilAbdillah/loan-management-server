const router = require('express').Router()
const Creditor = require('../services/creditor.service')

router.get('/', async function(req, res){
	const creditor = new Creditor('')
	const creditors = await creditor.getAll(req.user.id)

	if(creditors == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(creditors)
})

router.post('/',async function(req, res){
	const creditor 		= new Creditor(req.body.name)
	const newCreditor 	= await creditor.addContact(req.user.id)

	if(newCreditor == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(newCreditor)
})

router.patch('/:id',async function(req, res){
	const creditor = new Creditor(req.body.name)
	const editedCreditor = await creditor.edit(req.params.id)

	if(editedCreditor == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(editedCreditor)
})

router.delete('/:id', async function(req, res){
	const creditor = new Creditor('')
	const deletedCreditor = await creditor.delete(req.params.id)

	if(deletedCreditor == null){
		return res.sendStatus(500)
	}

	return res.sendStatus(200)
})

module.exports = router