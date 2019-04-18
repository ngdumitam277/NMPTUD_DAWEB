const mongoose = require('mongoose')

const KhoiMonSchema = mongoose.Schema({
    tenKhoi: String,
    tenMon: String
}, {
    timestamps: true
})

module.exports = mongoose.model('khoimon', KhoiMonSchema)