let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let register = require('../models/register.model');

// POST
router.post('/register-user', function(req, res, next) {
    register.create(req.body, function(err, post) {
        if(err) return next(err);
        res.json({
            status: 'success',
            data:post,
            tanggal: Date.now
        });
    })
})

module.exports = router;