const router = require('express').Router()
const Debt = require('../services/debt.service')

router.get('/', async function(req, res){
	const [debts, error] = await Debt.getAll()
	if(!debts){
		return res.status(404).json(error)
	}

	return res.status(200).json(debts.map(debt => ({
		id: debt.id,
		desc: debt.desc,
		date: debt.date,
		nominal: debt.nominal,
		Creditor: {
			id: debt.Debt.CreditorContactId,
			name: debt.Debt.Creditor.Contact.name
		}, 
		paid: debt.Payments.reduce((acc, curr) => acc + curr.nominal, 0)
	})))

})

router.get('/:id', async function(req, res){
	const [debt, error] = await Debt.getById(req.params.id)
	if(!debt) return res.status(404).json(error)

	return res.status(200).json({
		id: debt.id,
		nominal: debt.nominal,
		date: debt.date,
		desc: debt.desc,
		Contact: {
			id: debt.Debt.CreditorContactId,
			name: debt.Debt.Creditor.Contact.name
		},
		Payments: debt.Payments
	})
})

router.post('/', async function(req, res){
	const debt = new Debt(req.body)
	const [createdDebt, error] = await debt.create()

	if(error) return res.status(500).json(error)

	return res.status(200).json({
		id: createdDebt.loan.id,
		nominal: createdDebt.loan.nominal,
		date: createdDebt.loan.date,
		desc: createdDebt.loan.desc,
		DebtorId: createdDebt.debt.CreditorContactId
	})
})

router.patch('/:id', async function(req, res){
	const debt = new Debt(req.body)
	const [editedDebt, error] = await debt.edit(req.params.id)

	if(error) return res.status(404).json(error)

	if(editedDebt[0] != 1) return res.sendStatus(500)

	return res.status(200).json(editedDebt)
})

router.delete('/:id',async function(req, res){
	const [deletedDebt, error] = await Debt.delete(req.params.id)
	if(error) return res.sendStatus(404)

	return res.sendStatus(200)
})

module.exports = router

/*
SELECT 
	"Loan"."id", "
	Loan"."nominal", 
	"Loan"."date", 
	"Loan"."desc", 
	"Payments"."id" AS "Payments.id", 
	"Payments"."nominal" AS "Payments.nominal", 
	"Payments"."date" AS "Payments.date", 
	"Payments"."LoanId" AS "Payments.LoanId", 
	"Payments"."createdAt" AS "Payments.createdAt", 
	"Payments"."updatedAt" AS "Payments.updatedAt", 
	"Debt"."LoanId" AS "Debt.LoanId", 
	"Debt"."CreditorContactId" AS "Debt.CreditorContactId", 
	"Debt->Creditor"."ContactId" AS "Debt.Creditor.ContactId", 
	"Debt->Creditor->Contact"."id" AS "Debt.Creditor.Contact.id", 
	"Debt->Creditor->Contact"."name" AS "Debt.Creditor.Contact.name" 
FROM 
	"Loan" AS "Loan" 
LEFT OUTER JOIN 
	"Payment" 
		AS 
	"Payments" ON "Loan"."id" = "Payments"."LoanId" 
INNER JOIN 
	"Debt" AS "Debt" ON "Loan"."id" = "Debt"."LoanId" 
LEFT OUTER JOIN 
	"Creditor" AS "Debt->Creditor" ON "Debt"."CreditorContactId" = "Debt->Creditor"."ContactId" 
LEFT OUTER JOIN 
	"Contact" AS "Debt->Creditor->Contact" ON "Debt->Creditor"."ContactId" = "Debt->Creditor->Contact"."id";
*/