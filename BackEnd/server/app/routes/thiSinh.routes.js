module.exports = (app) => {
    const ThiSinh = require('../controllers/thiSinh.controller.js')

    // tạo thí sinh
    app.post('/web/create/thisinh', ThiSinh.taoThiSinh);
}