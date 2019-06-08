module.exports = (app) => {
    const Nganh = require('../controllers/nganh.controller.js')

    // tạo ngành
    app.post('/web/create/nganh', Nganh.taoNganh);

    // lấy tất cả ngành
    app.get('/web/nganh', Nganh.getAllNganh);

    // sửa 1 ngành theo key
    app.put('/web/nganh/:id', Nganh.updateNganh);

    // xoá 1 ngành theo key
    app.delete('/web/nganh/:id', Nganh.deleteNganh);
}