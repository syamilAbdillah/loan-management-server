const jwt = require('jsonwebtoken')

module.exports = function(req, res, nex){
	const authHeader = req.headers['authorization']
	const token = authHeader && authHeader.split(' ')[1]

	!token && res.sendStatus(401)

	jwt.verify(token, process.env.SECRET_KEY, function(error, user){
		error && res.sendStatus(403)

		req.user = user
		nex()
	})
}