module.exports = (app) => {
    const Mon = require('../controllers/mon.controller.js')

    // tạo môn thi
    app.post('/web/create/mon', Mon.taoMon);

    // lấy tất cả môn thi
    app.get('/web/mon', Mon.getAllMon);

    // sửa 1 môn theo key
    app.put('/web/mon/:key', Mon.updateMon);

    // xoá 1 môn theo key
    app.delete('/web/mon/:key', Mon.deleteMon);
}