const router = require('express').Router()
const Credit = require('../services/credit.service')

router.get('/', async function(req, res){
	const [credits, error] = await Credit.getAll()
	if(!credits){
		return res.status(404).json(error)
	}

	return res.status(200).json(credits.map(credit => ({
		id: credit.id,
		desc: credit.desc,
		date: credit.date,
		nominal: credit.nominal,
		paid: credit.Payments.reduce((acc, curr) => acc + curr.nominal, 0),
		Debtor: {
			id: credit.Credit.DebtorContactId,
			name: credit.Credit.Debtor.Contact.name
		}
	})))
})

router.get('/:id', async function(req, res){
	const [credit, error] = await Credit.getById(req.params.id)
	if(!credit) return res.status(404).json(error)

	return res.status(200).json({
		id: credit.id,
		nominal: credit.nominal,
		date: credit.date,
		desc: credit.desc,
		Contact: {
			id: credit.Credit.DebtorContactId,
			name: credit.Credit.Debtor.Contact.name
		},
		Payments: credit.Payments
	})
})

router.post('/', async function(req, res){
	const credit = new Credit(req.body)
	const [createdCredit, error] = await credit.create()

	if(error) return res.status(500).json(error)

	return res.status(200).json({
		id: createdCredit.loan.id,
		nominal: createdCredit.loan.nominal,
		date: createdCredit.loan.date,
		desc: createdCredit.loan.desc,
		DebtorId: createdCredit.credit.DebtorContactId
	})
})

router.patch('/:id', async function(req, res){
	const credit = new Credit(req.body)
	const [editedCredit, error] = await credit.edit(req.params.id)

	if(error) return res.status(404).json(error)

	if(editedCredit[0] != 1) return res.sendStatus(500)

	return res.status(200).json(editedCredit)
})

router.delete('/:id',async function(req, res){
	const [deletedCredit, error] = await Credit.delete(req.params.id)
	if(error) return res.sendStatus(404)

	return res.sendStatus(200)
})

module.exports = router