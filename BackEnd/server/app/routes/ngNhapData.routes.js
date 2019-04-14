module.exports = (app) => {
    const NgNhapData = require('../controllers/ngNhapData.controller.js')

    // tạo người nhập data
    app.post('/web/create/ngnhapdata', NgNhapData.taoNguoiNhapData);
}