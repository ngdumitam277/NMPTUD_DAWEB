module.exports = (app) => {
    const CanBo = require('../controllers/canbo.controller.js')

    // tạo người quản lý
    app.post('/web/create/canbo', CanBo.taoCanBo);
}