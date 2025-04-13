const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    MSSV: {
        type: String,
        required: true,
        unique: true
    },
    HoTen: {
        type: String,
        required: true
    },
    DiemTrungBinh: {
        type: Number,
        required: true
    },
    BoMon: {
        type: String,
        required: true
    },
    Tuoi: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Student', studentSchema);