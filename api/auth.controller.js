const router = require('express').Router()
const Auth = require('../services/auth.service')

router.post('/register', async function(req, res){
	const auth = new Auth(req.body)
	const registeredUser = await auth.register()

	if(registeredUser instanceof Error){
		return res.sendStatus(406)
	}

	res.status(200).json(registeredUser)
})

router.post('/login', async function(req, res){
	const auth = new Auth(req.body)
	const authorized = await auth.login()

	if(authorized instanceof Error){
		return res.sendStatus(406)
	}

	res.status(200).json(authorized)
})

module.exports = router