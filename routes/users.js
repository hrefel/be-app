const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/config');


/* GET users listing. */
router.get('/', function(req, res, next) {
	User.find(function (err, post) {
		if(err) return next(err);
		res.json(post);
		console.log(res.json);
	})
});

// registration
router.post('/register', (req, res, next) => {
	let newUser = new User({
		nama:req.body.nama,
		gender:req.body.gender,
		address:req.body.address,
		noTelp:req.body.noTelp,
		maritalStatus:req.body.maritalStatus,
		lastEducation:req.body.lastEducation,
		noKTP:req.body.noKTP,
		dateBirth:req.body.dateBirth,
		placeBirth:req.body.placeBirth,
		username:req.body.username,
		password:req.body.password,
	});

	User.addUser(newUser, (err, user) => {
		if(err) {
			res.json({
				success: false, message:'Failed register user'
			})
		} else {
			res.json({
				success: true, message:'User Register Success'
			});
		}
	});	
});

// auth
router.post('/auth', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;

	User.getUserByUsername(username, (err, user) => {
		if(err) throw err;
		if(!user) {
			return res.json({
				success: false, message: 'User Not Found'
			});
		}
		User.comparePassword(password, user.password, (err, isMatch) => {
			if(err) throw err;
			if(!isMatch) {
				const token = jwt.sign(user.toObject(), config.secret, {
					expiresIn: 604800 // 1 week
				});
				res.json({
					success: true,
					token: token,
					user:{
						name: user.nama,
						username: user.username,
						email: user.email
					}
				})
			} else {
				return res.json({success: false, message:'Wrong Password'});
			}
		})
	});
});

router.get('/profile', passport.authorize('jwt', {session: false}), (req, res, next) => {
	res.json({
		user: req.account
	});
})

module.exports = router;
