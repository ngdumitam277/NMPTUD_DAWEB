module.exports = (app) => {
    const DiemThi = require('../controllers/diemThi.controller.js')

    // tạo điểm thi
    app.post('/web/create/diemthi', DiemThi.taoDiemThi);

    // lấy tất cả điểm thi
    app.get('/web/diemthi', DiemThi.getAllDiemThi);

    // sửa 1 điểm thi theo mã điểm
    app.put('/web/diemthi/:maDiem', DiemThi.updateDiemThi);

    // xoá 1 điểm thi theo mã điểm
    app.delete('/web/diemthi/:maDiem', DiemThi.deleteDiemThi);
}