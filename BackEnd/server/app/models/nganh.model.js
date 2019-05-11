const mongoose = require('mongoose')

const NganhSchema = mongoose.Schema({
    maNganh: String,
    chiTieuNganh: Intl,
    thongTin: String,
    key: String
}, {
    timestamps: true
})

module.exports = mongoose.model('nganh', NganhSchema)