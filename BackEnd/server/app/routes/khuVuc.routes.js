module.exports = (app) => {
    const KhuVuc = require('../controllers/khuVuc.controller.js')

    // tạo khu vực
    app.post('/web/create/khuvuc', KhuVuc.taoKhuVuc);

    // lấy tất cả khu vực
    app.get('/web/khuvuc', KhuVuc.getAllKhuVuc);

    // sửa 1 khu vực theo mã khu vực
    app.put('/web/khuvuc/:maKhuVuc', KhuVuc.updateKhuVuc);

    // xoá 1 khu vực theo mã khu vực
    app.delete('/web/khuvuc/:maKhuVuc', KhuVuc.deleteKhuVuc);
}