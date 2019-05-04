module.exports = (app) => {
    const Mon = require('../controllers/mon.controller.js')

    // tạo môn thi
    app.post('/web/create/mon', Mon.taoMon);

    // lấy tất cả môn thi
    app.get('/web/mon', Mon.getAllMon);
}