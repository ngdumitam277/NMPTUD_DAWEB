module.exports = (app) => {
    const NganhKhoi = require('../controllers/nganhKhoi.controller.js')

    // tạo ngành khối
    app.post('/web/create/nganhkhoi', NganhKhoi.taoNganhKhoi);
}