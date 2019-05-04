module.exports = (app) => {
    const Khoi = require('../controllers/khoi.controller.js')

    // tạo khối
    app.post('/web/create/khoi', Khoi.taoKhoi);

    // lấy tất cả các khối
    app.get('/web/khoi', Khoi.getAllKhoi);
}