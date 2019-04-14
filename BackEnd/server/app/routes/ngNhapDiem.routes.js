module.exports = (app) => {
    const ngNhapDiem = require('../controllers/ngNhapDiem.controller.js')

    // tạo người nhập điểm
    app.post('/web/create/ngnhapdiem', ngNhapDiem.taoNguoiNhapDiem);
}