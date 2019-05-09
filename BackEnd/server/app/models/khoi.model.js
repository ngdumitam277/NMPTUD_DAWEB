const mongoose = require('mongoose')

const KhoiSchema = mongoose.Schema({
    tenKhoi: String,
    diemTBkhoi: Intl,
    slThiSinh: Intl,
    key: String
}, {
    timestamps: true
})

module.exports = mongoose.model('khoi', KhoiSchema)