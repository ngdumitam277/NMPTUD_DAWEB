module.exports = (app) => {
    const ngQuanLy = require('../controllers/ngQuanLy.controller.js')

    // tạo người quản lý
    app.post('/web/create/ngquanly', ngQuanLy.taonguoiquanly);
}