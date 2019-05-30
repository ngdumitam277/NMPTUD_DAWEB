const mongoose = require('mongoose')

const DiemThiSchema = mongoose.Schema({
    maDiem: String,
    mon: String,
    diem: Intl,
    Phach: Intl,
    diemPK: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('diemthi', DiemThiSchema)