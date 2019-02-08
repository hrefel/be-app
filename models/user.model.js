const mongoose = require('mongoose');
const config = require('../config/config');
const bcrypt = require('bcrypt');

let userSchema = new mongoose.Schema({
    nama: {type: String, required: true },
    gender: {type: String, required: true },
    address: {type: String, required: true, default: 'Belum mengisi alamat' },
    noTelp: {type: String, required: true },
    maritalStatus: { type: String, default: 'Single'},
    lastEducation: String,
    noKTP: String,
    dateBirth: Date,
    placeBirth: String,
    username: {type: String, required: true },
    password: {type: String, required: true }
});

const User = module.exports = mongoose.model('User', userSchema)

module.exports.getUserById = function (id, callback) {
    console.log(id);
    User.findById(id, callback);
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username }
    User.findOne(query, callback);
}

module.exports.addUser = function (newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            console.log(hash);
            newUser.save(callback);
        });    
    })
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}