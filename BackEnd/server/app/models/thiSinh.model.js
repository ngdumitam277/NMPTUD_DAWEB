const mongoose = require('mongoose')

const ThiSinhSchema = mongoose.Schema({
    usernamets: String,
    SBD: String,
    tenTHPT: String,
    namTotNghiep: String,  
    anhMinhChung: String,
    ttTuyenSinh: Intl,
    Phach: Intl,
    maKhuVuc: String,
    maDoiTuong: String
}, {
    timestamps: true
})

module.exports = mongoose.model('thisinh', ThiSinhSchema)