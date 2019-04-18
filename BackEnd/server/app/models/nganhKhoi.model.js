const mongoose = require('mongoose')

const NganhKhoiSchema = mongoose.Schema({
    maNganh: String,
    tenKhoi: String,
    diemChuan: Intl,
    slTSthiNganhKhoi: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('nganhkhoi', NganhKhoiSchema)