module.exports = (app) => {
    const Khoi = require('../controllers/khoi.controller.js')

    // tạo khối
    app.post('/web/create/khoi', Khoi.taoKhoi);
}