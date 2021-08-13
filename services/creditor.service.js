const db = require('../models')
const Contact = require('./contact.service')
const {errorHandler} = require('../utils')

class Creditor extends Contact {
	async addContact(UserId){
		let transaction
		try{
			transaction 	= await db.sequelize.transaction()
			const contact 	= await db.Contact.create({name: super.name, UserId}, {transaction})
			const creditor = await db.Creditor.create({ContactId: contact.id}, {transaction})
			await transaction.commit()

			return [{name: contact.name, ContactId: creditor.ContactId}, null]
		}
		catch(error){
			console.log(error.message)
			await transaction.rollback()

			return [null, error]
		}
	}

	async getAll(UserId){
		const contacts = await super.getAll(UserId, {
			include: [{
				model: db.Creditor,
				required: true,
				// include: [{
				// 	model: db.Debt
				// }]
			}]
		})

		return contacts
	}
}

module.exports = Creditor