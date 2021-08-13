const Loan = require('./loan.service')
const db = require('./debt.service')

class Debt extends Loan {
	async create(UserId, customOpt = {}){
		const [newDebt, error] = super.__create(UserId, {
			include: [{
				model: db.Debt,
				required: true
			}],
			...customOpt
		})

		console.log(error.message)

		return newDebt
	}

	async edit(id, customOpt = {}){

	}
}

module.exports = Debt