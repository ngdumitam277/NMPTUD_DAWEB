const mongoose = require('mongoose')

const ngNhapData = mongoose.Schema({
    usernameNgNhapData: String,
    usernamets: String,
    tgSuaThongTin: Date,
    tgXacNhanTK: Date,
    tgXoaTK: Date,
    ttinSuaXoa: String
}, {
    timestamps: true
})

module.exports = mongoose.model('ngNhapData', ngNhapData)