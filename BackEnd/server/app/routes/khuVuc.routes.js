module.exports = (app) => {
    const KhuVuc = require('../controllers/khuVuc.controller.js')

    // tạo khu vực
    app.post('/web/create/khuvuc', KhuVuc.taoKhuVuc);
}