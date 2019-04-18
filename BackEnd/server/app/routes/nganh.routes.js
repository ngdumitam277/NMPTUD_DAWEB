module.exports = (app) => {
    const Nganh = require('../controllers/nganh.controller.js')

    // tạo ngành
    app.post('/web/create/nganh', Nganh.taoNganh);
}