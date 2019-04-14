const mongoose = require('mongoose')

const TaikhoanLogSchema = mongoose.Schema({
    username: String,
    tgSuaXoa: Date,
    ttinLog: String
}, {
    timestamps: true
})

module.exports = mongoose.model('taikhoanlog', TaikhoanLogSchema)