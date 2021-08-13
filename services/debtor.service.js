const db = require('../models')
const Contact = require('./contact.service')
const {errorHandler} = require('../utils')

class Debtor extends Contact {
	async addContact(UserId){
		let transaction
		try{
			transaction 	= await db.sequelize.transaction()
			const contact 	= await db.Contact.create({name: super.name, UserId}, {transaction})
			const debtor = await db.Debtor.create({ContactId: contact.id}, {transaction})
			await transaction.commit()

			return [{name: contact.name, ContactId: debtor.ContactId}, null]
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
				model: db.Debtor,
				required: true,
				// include: [{
				// 	model: db.Credit
				// }]
			}]
		})

		return contacts
	}
}

module.exports = Debtor