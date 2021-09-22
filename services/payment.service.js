const db 				= require('../models')
const {errorHandler} = require('../utils')

class Payment { 
	constructor({nominal, date, LoanId}){
		this.nominal 	= nominal
		this.date 		= date
		this.LoanId		= LoanId
	}

	async create(){
		let transaction 
		try{
			transaction = await db.sequelize.transaction()
			
			const isLoanExist = await db.Loan.findByPk(this.LoanId, {transaction})
			if(!isLoanExist) throw new Error(404)
			
			const payment = await db.Payment.create({
				nominal: this.nominal,
				date: this.date,
				LoanId: this.LoanId
			}, {transaction})

			await transaction.commit()
			return [payment, null]
		}
		catch(error){
			await transaction.rollback()
			console.log(error.message)
			return [null, error]
		}
	}

	async edit(id){
		return await errorHandler(
			db.Payment.update({
				date: this.date,
				nominal: this.nominal
			}, {
				where: {id}
			})
		)
	}

	static async getAll(LoanId){
		return await errorHandler(
				db.Payment.findAll({ 
					where: {LoanId},
					attributes: ['id', 'date', 'nominal'] 
				})
			)
	}

	static async cancelPayment(id){
		return await errorHandler(
			db.Payment.destroy({
				where: {id}
			})
		)
	}
}

module.exports = Payment