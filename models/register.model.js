let mongoose = require('mongoose');

let regSchema = new mongoose.Schema({
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

module.exports = mongoose.model('user', regSchema);