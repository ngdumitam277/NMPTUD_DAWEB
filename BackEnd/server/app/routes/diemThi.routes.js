module.exports = (app) => {
    const DiemThi = require('../controllers/diemThi.controller.js')

    // tạo điểm thi
    app.post('/web/create/diemthi', DiemThi.taoDiemThi);

    // lấy tất cả điểm thi
    app.get('/web/diemthi', DiemThi.getAllDiemThi);

    // sửa 1 điểm thi theo id
    app.put('/web/diemthi/:id', DiemThi.updateDiemThi);

    // xoá 1 điểm thi theo id
    app.delete('/web/diemthi/:id', DiemThi.deleteDiemThi);

    // thống kê môn
    app.get('/web/thongke/mon', DiemThi.thongKeMon)

    // thống kê khối
    app.get('/web/thongke/khoi', DiemThi.thongKeKhoi)
}