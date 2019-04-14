const mongoose = require('mongoose')

const ngNhapDiem = mongoose.Schema({
    usernameNgNhapDiem: String,
    maDiem: String,
    tgNhap: Date,
    diemLog: String
}, {
    timestamps: true
})

module.exports = mongoose.model('ngNhapDiem', ngNhapDiem)