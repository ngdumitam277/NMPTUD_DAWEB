const mongoose = require('mongoose')

const DoiTuongSchema = mongoose.Schema({
    maDoiTuong: String,
    diemCong: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('doituong', DoiTuongSchema)