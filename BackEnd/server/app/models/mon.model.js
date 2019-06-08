const mongoose = require('mongoose')

const MonSchema = mongoose.Schema({
    tenMon: String,
    phongThi: String,
    tgThi: Date,
    gioThi: String,
    diemTBmon: Intl,
    key: String
}, {
    timestamps: true
})

module.exports = mongoose.model('mon', MonSchema)