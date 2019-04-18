module.exports = (app) => {
    const DoiTuong = require('../controllers/doiTuong.controller.js')

    // tạo đối tượng
    app.post('/web/create/doituong', DoiTuong.taoDoiTuong);
}