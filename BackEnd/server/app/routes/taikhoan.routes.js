module.exports = (app) => {
    const taikhoan = require('../controllers/taikhoan.controller.js')
    // // Create a new Movie
    // app.post('/movies', movies.create);

    // // Retrieve all movies
    // app.get('/movies', movies.findAll);

    // // Retrieve a single Note with movieId
    // app.get('/movies/:movieId', movies.findOne);

    // // Update a Note with movieId
    // app.put('/movies/:movieId', movies.update);

    // // Delete a Note with movieId
    // app.delete('/movies/:movieId', movies.delete);

    // tạo tài khoản thí sinh
    app.post('/web/create/taikhoan/thisinh', taikhoan.taoTaiKhoanTS);

    // tạo tài khoản cán bộ
    app.post('/web/create/taikhoan/canbo', taikhoan.taoTaiKhoanCB);

    // đăng nhập bằng tài khoản
    app.post('/web/taikhoan/dangnhap', taikhoan.dangnhap);

    // đổi mật khẩu tài khoản
    app.post('/web/taikhoan/thaydoi/matkhau', taikhoan.thayDoiMatKhau);

    // gửi mã xác nhận khi tạo tài khoản
    app.post('/web/taikhoan/email/code', taikhoan.sendCode);

    // lấy tình trạng của tài khoản
    app.post('/web/taikhoan/tinhtrang', taikhoan.layTinhTrang);

    // hiện thông tin thí sinh
    app.post('/web/taikhoan/thongtin/thisinh', taikhoan.hienThongTinThiSinh);
}