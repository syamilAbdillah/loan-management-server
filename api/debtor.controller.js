const router = require('express').Router()
const Debtor = require('../services/debtor.service')

router.get('/:id', async function(req, res){
	const debtor = new Debtor('')
	const [debtorById, error] = await debtor.getById(req.params.id)

	if(!debtorById){
		return res.sendStatus(404)
	}

	return res.status(200).json(debtorById)
})

router.get('/', async function(req, res){
	const debtor = new Debtor('')
	const [debtors, error] = await debtor.getAll(req.user.id)

	if(debtors == null){
		return res.sendStatus(500)
	}

	return res.status(200).json(debtors.map(function(debtor){
		return {
			id: debtor.id,
			name: debtor.name,
			Credits: debtor.Debtor.Credits.map(function(credit){
				return credit.Loan
			})
		}
	}))
})


router.post('/',async function(req, res){
	const debtor 		= new Debtor(req.body.name)
	const [newDebtor, error] 	= await debtor.addContact(req.user.id)

	if(error){
		return res.sendStatus(500)
	}

	return res.status(200).json(newDebtor)
})

router.patch('/:id',async function(req, res){
	const debtor = new Debtor(req.body.name)
	const [editedDebtor, error] = await debtor.edit(req.params.id)

	if(editedDebtor == null){
		return res.sendStatus(404)
	}

	return res.sendStatus(200)
})

router.delete('/:id', async function(req, res){
	const debtor = new Debtor('')
	const [deletedDebtor, error] = await debtor.delete(req.params.id)

	if(deletedDebtor == null){
		return res.sendStatus(500)
	}

	return res.sendStatus(200)
})

module.exports = router