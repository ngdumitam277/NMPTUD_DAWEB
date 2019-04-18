const mongoose = require('mongoose')

const NganhSchema = mongoose.Schema({
    maNganh: String,
    chiTieuNganh: Intl,
    thongTin: String
}, {
    timestamps: true
})

module.exports = mongoose.model('nganh', NganhSchema)