const db = require('../models')
const errorHandler = require('../utils')

class Loan {
	constructor({nominal, remaining}){
		this.nominal 	= nominal
		this.remaining = remaining
	}

	async __create(customOpt = {}){
		return await db.Loan.create({
			nominal: this.nominal,
			remaining: this.remaining
		},{...customOpt})
	}

	async __getAll(customOpt = {}){
		return await errorHandler(
			db.Loan.findAll({...customOpt})
		)
	}

	async __edit(LoanId, customOpt = {}){
		return await errorHandler(
			db.Loan.update({
				nominal: this.nominal,
				remaining: this.remaining	
			}, 
			{
				where: {
					id: LoanId
				},
				...customOpt
			})
		)
	}

	async __delete(LoanId, customOpt = {}){
		return await errorHandler(
			db.Loan.destroy({
				where: {
					id: LoanId
				},
				...customOpt
			})
		)
	}
}

module.exports = Loan