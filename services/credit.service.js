const Loan = require('./loan.service')
const db = require('../models')

class Credit extends Loan {
	constructor({nominal, remaining, DebtorId}){
		super({nominal, remaining})
		this.DebtorId = DebtorId
	}
	async create(){
		let transaction
		try{
			transaction = await db.sequelize.transaction()

			const isDebtorExsist = await db.Debtor.findByPk(this.DebtorId, { transaction })

			!isDebtorExsist && throw new Error('404')

			const loan = await super.__create({ transaction })
			const credit = await db.Credit.create({
				LoanId: loan.id,
				DebtorId: this.DebtorId 
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
			include: [{
				model: db.Debt,
				required: true
			}]
		})
	}

	async delete(id){
		return await super.__delete(id)
	}
}

module.exports = Credit