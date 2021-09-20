const jwt = require('jsonwebtoken')
const db = require('../../models')
const errorHandler = require('../../utils/errorHandler')

module.exports = function(req, res, nex){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	!token && res.sendStatus(401)

	jwt.verify(token, process.env.SECRET_KEY,async function(error, user){
		error && res.sendStatus(403)

		const existedUser = await db.User.findByPk(user.id)

		if(existedUser != null){
			req.user = user
			nex()
		}else{
			res.sendStatus(403)
		}
	})
}