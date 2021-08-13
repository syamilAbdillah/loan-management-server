const db = require('../models')
const { errorHandler } = require('../utils')


class Contact {
	constructor(name){
		this.name = name 
	}

	async addContact(UserId = '', customOpt = {}){
		const [contact, error] = await errorHandler(
			db.Contact.create({
				UserId,
				name: this.name,
			}, {...customOpt})
		)

		return contact
	}

	async edit(ContactId, customOpt = {}){
		const [editedContact, error] = await errorHandler(
			db.Contact.update({
				name: this.name
			},
			{
				where: {
					id: ContactId
				}, 
				...customOpt
			})
		)
	
		return editedContact
	}

	async getAll(customOpt = {}){
		const [contacts, error] = await errorHandler(
			db.Contact.getAll({
				attributes: ['id', 'name'],
				...customOpt
			})
		)

		return contacts
	}

	async delete(ContactId, customOpt = {}){
		const [deletedContact, error] = await errorHandler(
			db.Contact.destroy({
				where: {
					id: ContactId
				},
				...customOpt
			})
		)
	}
}

module.exports = Contact