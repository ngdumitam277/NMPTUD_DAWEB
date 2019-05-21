module.exports = (app) => {
    const NganhKhoi = require('../controllers/nganhKhoi.controller.js')

    // tạo ngành khối
    app.post('/web/create/nganhkhoi', NganhKhoi.taoNganhKhoi);

    // sửa 1 ngành khối theo key Ngành và tên khối
    app.put('/web/nganhkhoi/:maNganh/:tenKhoi', NganhKhoi.updateNganhKhoi);

    // xoá 1 ngành khối theo key Ngành và tên khối
    app.delete('/web/nganh/:maNganh/:tenKhoi', NganhKhoi.deleteNganhKhoi);
}