module.exports = (app) => {
    const KhoiMon = require('../controllers/khoiMon.controller.js')

    // tạo khối môn
    app.post('/web/create/khoimon', KhoiMon.taoKhoiMon);

    // tạo nhiêu khối môn
    app.post('/web/create/multiple/khoimon', KhoiMon.taoNhieuKhoiMon);

    // sửa nhiêu khối môn
    app.put('/web/update/multiple/khoimon', KhoiMon.suaNhieuKhoiMon);

    // xoá nhiêu khối môn
    app.delete('/web/delete/multiple/khoimon/:tenKhoi', KhoiMon.xoaNhieuKhoiMon);

    // sửa 1 khôi môn
    app.put('/web/khoimon/edit/:id', KhoiMon.updateKhoiMon);

    // xoá 1 môn khối
    app.delete('/web/delete/khoimon/:tenKhoi/:keyMon', KhoiMon.deleteOneKhoiMon);

    // lây tất cả môn của 1 khôi
    app.get('/web/khoimon/mon/:tenKhoi', KhoiMon.getMonOfKhoi);
}