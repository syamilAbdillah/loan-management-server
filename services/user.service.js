const db = require('../models')
const { errorHandler } = require('../utils')

class User{
	constructor({name, password, email}){
		this.email 		= email
		this.password 	= password
		this.name 		= name
	}

	async getAllProfiles(customOpt = {}){
		const [profiles, error] = await errorHandler(
			db.User.findAll({
				attributes: ['id', 'email', 'name'],
				...customOpt
			})
		)

		return profiles
	}

	async getProfile(id, customOpt = {}){
		const [user, error] = await errorHandler(
			db.User.findByPk(id, {
				attributes: ['name', 'email', 'id'],
				...customOpt
			})
		)
			
		return user 
	}

	async __register(customOpt = {}){
		const [user, error] = await errorHandler(
			db.User.create({
				name: this.name,
				email: this.email,
				password: this.password
			}, customOpt)
		)

		if(!user){
			return user
		}

		return {
			name: user.name,
			email: user.email
		}
	}


	async __isUserExistByEmail(customOpt = {}){
		const [user, error] = await errorHandler(
			db.User.findOne({
				where: { email: this.email },
				attributes: ['id'],
				...customOpt
			})
		)

		console.log(user)

		return user
	}
}

module.exports = User