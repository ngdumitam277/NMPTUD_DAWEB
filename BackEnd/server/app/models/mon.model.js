const mongoose = require('mongoose')

const MonSchema = mongoose.Schema({
    tenMon: String,
    phongThi: String,
    tgThi: Date,
    diemTBmon: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('mon', MonSchema)