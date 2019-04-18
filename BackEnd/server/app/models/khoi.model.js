const mongoose = require('mongoose')

const KhoiSchema = mongoose.Schema({
    tenKhoi: String,
    diemTBkhoi: Intl,
    slThiSinh: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('khoi', KhoiSchema)