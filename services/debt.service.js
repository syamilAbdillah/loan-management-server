const Loan = require('./loan.service')
const db = require('../models')

class Debt extends Loan {
	constructor({nominal, CreditorId}){
		super({nominal})
		this.CreditorId = CreditorId
	}
	async create(){
		let transaction
		try{
			transaction = await db.sequelize.transaction()

			const isCreditorExsist = await db.Creditor.findByPk(this.CreditorId, { transaction })

			!isCreditorExsist && throw new Error('404')

			const loan = await super.__create({ transaction })
			const debt = await db.Debt.create({
				LoanId: loan.id,
				CreditorId: this.CreditorId 
			}, { transaction })

			await transaction.commit()

			return [loan, null]
		}
		catch(error){
			console.log(error.message)
			await transaction.rollback()

			return [null, error]
		}
	}

	async edit(id){
		return await super.__edit(id)
	}

	async getAll(){
		return await super.__getAll({
			include: [
			{
				model: db.Debt,
				required: true
			}
			]
		})
	}

	async delete(id){
		return await super.__delete(id)
	}
}

module.exports = Debt