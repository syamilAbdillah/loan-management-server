const Loan = require('./loan.service')
const db = require('../models')
const errorHandler = require('../utils/errorHandler')

class Credit extends Loan { 
	constructor({nominal, date, desc, DebtorId}){
		super({nominal, desc, date})
		this.DebtorId = DebtorId
	}
	async create(){
		let transaction
		try{
			transaction = await db.sequelize.transaction()

			const isDebtorExsist = await db.Debtor.findByPk(this.DebtorId, { transaction })

			if(!isDebtorExsist) throw new Error('404')

			const loan = await super.__create({ transaction })
			const credit = await db.Credit.create({
				LoanId: loan.id,
				DebtorContactId: this.DebtorId 
			}, { transaction })

			await transaction.commit()

			return [{loan, credit}, null]
		}
		catch(error){
			console.log(error.message)
			await transaction.rollback()

			return [null, error]
		}
	}

	async edit(id){
		const [credit, error] = await errorHandler(db.Credit.findByPk(id))
		if(!credit){
			return [null, error]	
		}
		const editedCredit = await errorHandler(super.__edit(credit.LoanId))
		return [editedCredit, error]
	}

	static async getAll(){
		return await errorHandler(Loan.__getAll({
			attributes: ['id', 'nominal', 'date', 'desc'],
			include: [{
				model: db.Credit,
				attributes: ['DebtorContactId'],
				include: [{
					model: db.Debtor,
					attributes: ['ContactId'],
					include: [{
						model: db.Contact,
						attributes: ['id', 'name']
					}]
				}]
			}]
		}))
	}

	static async getById(id){
		return await errorHandler(Loan.__getById(id, {
					attributes: ['id', 'nominal', 'desc', 'date'],
					include: [{
						model: db.Credit,
						required: true,
						attributes: ['DebtorContactId']
					}]
				}))
	}

	static async delete(id){
		return await errorHandler(Loan.__delete(id))
	}
}

module.exports = Credit