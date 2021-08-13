const router = require('express').Router()
const User = require('../services/user.service')


router.get('/', async function(req, res){
	const user = new User({})
	const profiles = await user.getAllProfiles()

	if(profiles == null){
		return res.sendStatus(500)
	}

	res.status(200).json(profiles) 
})

router.get('/:id', async function(req, res){
	const user = new User({})
	const profile = await user.profile(req.params.id)

	if(profile){
		return res.status(200).json(profile)
	}

	res.status(404).json({ message: 'user not found' })
})

module.exports = router