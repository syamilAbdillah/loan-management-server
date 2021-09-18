const db = require('../models')
const errorHandler = require('../utils')

class Loan {
	constructor({nominal, date, desc}){
		this.nominal 	= nominal
		this.date 		= date || new Date()
		this.desc 		= desc
	}

	async __create(customOpt = {}){
		return await db.Loan.create({
			nominal: this.nominal,
			date: this.date,
			desc: this.desc
		},{...customOpt})
	}

	static async __getAll(customOpt = {}){
		return await db.Loan.findAll(customOpt)
	}

	static async __getById( id ,customOpt = {}){
		return await db.Loan.findByPk(id, customOpt)
	}

	async __edit(LoanId, customOpt = {}){
		return await db.Loan.update({
			nominal: this.nominal,
			date: this.date,
			desc: this.desc 	
		}, 
		{
			where: {
				id: LoanId
			},
			...customOpt
		})
	}

	static async __delete(LoanId, customOpt = {}){
		return await db.Loan.destroy({
			where: {
				id: LoanId
			},
			...customOpt
		})
	}
}

module.exports = Loan