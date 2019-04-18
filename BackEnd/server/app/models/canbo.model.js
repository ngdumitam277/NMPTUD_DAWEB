const mongoose = require('mongoose')

const CanBoSchema = mongoose.Schema({
    username: String,
    chucVu: String,
    quyenHan: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('canbo', CanBoSchema)