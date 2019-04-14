module.exports = (app) => {
    const KhoiMon = require('../controllers/khoiMon.controller.js')

    // tạo khối môn
    app.post('/web/create/khoimon', KhoiMon.taoKhoiMon);
}