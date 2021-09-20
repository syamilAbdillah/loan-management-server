const router = require('express').Router()
const Creditor = require('../services/creditor.service')

router.get('/:id', async function(req, res){
	const creditor = new Creditor('')
	const [creditorById, error] = await creditor.getById(req.params.id)

	if(!creditorById){
		return res.sendStatus(404)
	}

	return res.status(200).json(creditorById)
})

router.get('/', async function(req, res){
	const creditor = new Creditor('')
	const [creditors, error] = await creditor.getAll(req.user.id)

	if(creditors == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(creditors.map(function(creditor){
		return {
			id: creditor.id,
			name: creditor.name,
			Debts: creditor?.Creditor?.Debts.map(function(debt){
				return debt.Loan
			})
		}
	}))
})


router.post('/',async function(req, res){
	const creditor 		= new Creditor(req.body.name)
	const [newCreditor, error] 	= await creditor.addContact(req.user.id)

	if(error){
		return res.sendStatus(500)
	}

	return res.status(200).json(newCreditor)
})

router.patch('/:id',async function(req, res){
	const creditor = new Creditor(req.body.name)
	const [editedCreditor, error] = await creditor.edit(req.params.id)

	if(editedCreditor == null){
		return res.sendStatus(404)
	}

	return res.sendStatus(200)
})

router.delete('/:id', async function(req, res){
	const creditor = new Creditor('')
	const [deletedCreditor, error] = await creditor.delete(req.params.id)

	if(deletedCreditor == null){
		return res.sendStatus(500)
	}

	return res.sendStatus(200)
})

module.exports = router