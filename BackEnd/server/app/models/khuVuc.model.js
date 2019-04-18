const mongoose = require('mongoose')

const KhuVucSchema = mongoose.Schema({
    maKhuVuc: String,
    diemCong: Intl
}, {
    timestamps: true
})

module.exports = mongoose.model('khuvuc', KhuVucSchema)