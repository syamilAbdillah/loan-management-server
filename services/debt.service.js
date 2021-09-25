const Loan = require('./loan.service')
const db = require('../models')
const errorHandler = require('../utils/errorHandler')

class Debt extends Loan { 
	constructor({nominal, date, desc, CreditorId}){
		super({nominal, desc, date})
		this.CreditorId = CreditorId
	}
	async create(){
		let transaction
		try{
			transaction = await db.sequelize.transaction()

			const isCreditorExsist = await db.Creditor.findByPk(this.CreditorId, { transaction })

			if(!isCreditorExsist) throw new Error('404')

			const loan = await super.__create({ transaction })
			const debt = await db.Debt.create({
				LoanId: loan.id,
				CreditorContactId: this.CreditorId 
			}, { transaction })

			await transaction.commit()

			return [{loan, debt}, null]
		}
		catch(error){
			console.log(error.message)
			await transaction.rollback()

			return [null, error]
		}
	}

	async edit(id){
		const [debt, error] = await errorHandler(db.Debt.findByPk(id))
		if(!debt){
			return [null, error]	
		}
		const editedDebt = await errorHandler(super.__edit(debt.LoanId))
		return [editedDebt, error]
	}

	static async getAll(){
		return await errorHandler(Loan.__getAll({
			attributes: ['id', 'nominal', 'date', 'desc'],
			include: [{
				model: db.Payment,
				attributes: ['nominal']
			},{
				model: db.Debt,
				required: true,
				attributes: ['CreditorContactId'],
				include: [{
					model: db.Creditor,
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
						model: db.Payment,
						attributes: ['id', 'nominal', 'date']
					},{
						model: db.Debt,
						required: true,
						attributes: ['CreditorContactId'],
						include: [{
							model: db.Creditor,
							attributes: ['ContactId'],
							include: [{
								model: db.Contact,
								attributes: ['name']
							}]
						}]
					}]
				}))
	}

	static async delete(id){
		return await errorHandler(Loan.__delete(id))
	}
}

module.exports = Debt