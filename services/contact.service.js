const db = require('../models')
const { errorHandler } = require('../utils')


class Contact {
	constructor(name){
		this.name = name 
	}

	async addContact(UserId = '', customOpt = {}){
		return await db.Contact.create({
			UserId,
			name: this.name,
		}, {...customOpt})
	}

	async edit(ContactId, customOpt = {}){
		return await db.Contact.update({
				name: this.name
			},
			{
				where: {
					id: ContactId
				}, 
				...customOpt
			})
	}

	async getAll(customOpt = {}){
		return await db.Contact.findAll({
			attributes: ['id', 'name'],
			...customOpt
		})
	}

	async delete(ContactId, customOpt = {}){
		return await db.Contact.destroy({
			where: {
				id: ContactId
			},
			...customOpt
		})
	}
}

module.exports = Contact