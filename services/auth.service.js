const bcrypt 				= require('bcrypt')
const jwt 					= require('jsonwebtoken')
const db 					= require('../models')
const { errorHandler } 	= require('../utils')
const User 					= require('./user.service')

class Auth{
	constructor({name, password, email}){
		this.User = new User({name, password, email})
	}

	async register() {
		const isExist = await this.User.__isUserExistByEmail()
			
		if(isExist) return new Error('406')

		await this.#hashPassword()
		const registeredUser = await this.User.__register()

		return registeredUser
	}

	async login(){
		const user = await this.User.__isUserExistByEmail({
			attributes: ['id', 'email', 'password', 'name']
		})
		if(!user) return new Error('404')

		const comparedPassword = await bcrypt.compare(this.User.password, user.password)
		if(!comparedPassword) return new Error('404')

		const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY)

		return {id: user.id, email: user.email, name: user.name, accessToken}
	}

	async #hashPassword() {
		this.User.password = await bcrypt.hash(this.User.password, 10)
		return this.User.password
	}
}

module.exports = Auth