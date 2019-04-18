const mongoose = require('mongoose')

const ThiSinhSchema = mongoose.Schema({
    usernamets: String,
    maNganh: String,
    tenKhoi: String,
    diemTBthi: Intl,
    diemCong: Intl,
    diemTB: Intl,
    tinhTrang: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('thisinhnhap', ThiSinhSchema)