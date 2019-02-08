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
    bcrypt.hash(newUser.password, 10, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save(callback).then(result => {
            console.log('in save')
            return res.status(200).json('signup successful')
          })
          .catch(error => {
            if (error.code === 11000) { 
              return res.status(409).send('user already exist!')
            } else {
              console.log(JSON.stringigy(error, null, 2))
              return res.status(500).send('error signing up user')
            }
          })
    });
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}