module.exports = (app) => {
    const thiSinhNhap = require('../controllers/thiSinhNhap.controller.js')

    // tạo thí sinh
    app.post('/web/create/thisinhnhap', thiSinhNhap.taoThiSinh);
}