const db = require('../models')
const Contact = require('./contact.service')
const {errorHandler} = require('../utils')

class Creditor extends Contact {
	constructor(name){
		super(name)
	}

	async addContact(UserId){
		let transaction
		try{
			transaction 	= await db.sequelize.transaction()
			const contact 	= await db.Contact.create({name: this.name, UserId}, {transaction})
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

	async getAll(){
		return await errorHandler(super.getAll({
					include: [{
						model: db.Creditor,
						required: true,
						attributes: ['ContactId'],
						include: [{
							model: db.Debt,
							attributes: ['LoanId'],
							include: [{
								model: db.Loan,
								attributes: ['id', 'nominal', 'date', 'desc']
							}]
						}]
					}]
				}))
	}

	getById(id){
		return db.Creditor.findByPk(id, {
			attributes: ['ContactId'],
			include: [{
				model: db.Contact,
				attributes: ['id', 'name']
			}]
		})
		.then(data => {
			const creditor = {
				id: data.Contact.id,
				name: data.Contact.name
			}
			return [creditor, null]
		})
		.catch(error => {
			console.log(error)
			return [null, error]
		})
	}

	async edit(id){
		let transaction
		try{
			transaction = await db.sequelize.transaction()
			const selectedCreditor = await db.Creditor.findByPk(id, {transaction})
			const updatedContact = await db.Contact.update({name: this.name}, {
				where: {
					id: selectedCreditor.ContactId
				},
				transaction
			})
			await transaction.commit()
			return [updatedContact, null]
		}
		catch(error){
			await transaction.rollback()
			console.log(error)
			return [null, error]
		}
	}

	async delete(id){
		let transaction
		try{
			transaction = await db.sequelize.transaction()
			
			const selectedCreditor = await db.Creditor.findByPk(id, {
				transaction,
				attributes: ['ContactId']
			})
			const deletedContact = await db.Contact.destroy({
				transaction,
				where: {
					id: selectedCreditor.ContactId
				}
			})

			await transaction.commit()
			return [{}, null]
		}
		catch(error){
			console.log(error)
			await transaction.rollback()
			return [null, error]
		}
	}
}

module.exports = Creditor