module.exports = (app) => {
    const ThiSinh = require('../controllers/thiSinh.controller.js')

    // tạo thí sinh
    app.post('/web/create/thisinh', ThiSinh.taoThiSinh);

    // tìm kiếm thí sinh
    app.post('/web/thisinh/timkiem', ThiSinh.timKiemThiSinh);
}