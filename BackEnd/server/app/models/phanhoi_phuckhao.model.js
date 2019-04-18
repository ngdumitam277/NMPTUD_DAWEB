const mongoose = require('mongoose')

const PhanHoiSchema = mongoose.Schema({
    maPH: String,
    usernamecb: String,
    usernamets: String,
    noidungTSchat: String,
    noidungNgNhapDataChat: String,
    anhMinhChung: String,
    trangThai: Intl,
    tgTSnhap: Date,
    tgNgNhapDataNhap: Date
}, {
    timestamps: true
})

module.exports = mongoose.model('phanhoi', PhanHoiSchema)