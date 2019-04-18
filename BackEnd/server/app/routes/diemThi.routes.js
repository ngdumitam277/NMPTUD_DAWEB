module.exports = (app) => {
    const DiemThi = require('../controllers/diemThi.controller.js')

    // tạo điểm thi
    app.post('/web/create/diemthi', DiemThi.taoDiemThi);
}