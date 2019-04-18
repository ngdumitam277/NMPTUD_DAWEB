module.exports = (app) => {
    const PhanHoi = require('../controllers/phanhoi_phuckhao.controller.js')

    // tạo người nhập data
    app.post('/web/create/phanhoi', PhanHoi.taoPhanHoi);
}