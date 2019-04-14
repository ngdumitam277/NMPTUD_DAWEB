const mongoose = require('mongoose')

const NgQuanLySchema = mongoose.Schema({
    username: String,
    namTuyenSinh: String,
    tgNhanHoSo: Date,
    tgKTnhanHoSo: Date,
    tgCongBoKQ: Date,
    tgKTcongBoKQ: Date,
    tgPhucKhao: Date,
    tgKTphucKhao: Date,
    maXacThucCB: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('ngquanly', NgQuanLySchema)