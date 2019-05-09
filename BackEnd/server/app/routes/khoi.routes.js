module.exports = (app) => {
    const Khoi = require('../controllers/khoi.controller.js')

    // tạo khối
    app.post('/web/create/khoi', Khoi.taoKhoi);

    // lấy tất cả các khối
    app.get('/web/khoi', Khoi.getAllKhoi);

    // sửa 1 khối theo key
    app.put('/web/khoi/:key', Khoi.updateKhoi);

    // xoá 1 khối theo key
    app.delete('/web/khoi/:key', Khoi.deleteKhoi);
}