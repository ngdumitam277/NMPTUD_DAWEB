module.exports = (app) => {
    const TaiKhoanLog = require('../controllers/taikhoanLog.controller.js')

    // tạo tài khoản log
    app.post('/web/create/taikhoanlog', TaiKhoanLog.taoTaiKhoanLog);
}