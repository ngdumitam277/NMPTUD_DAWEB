module.exports = (app) => {
    const taikhoan = require('../controllers/taikhoan.controller.js')

    // tạo tài khoản thí sinh
    app.post('/web/create/taikhoan/thisinh', taikhoan.taoTaiKhoanTS);

    // xoá tài khoản thí sinh
    app.delete('/web/delete/taikhoan/:username', taikhoan.deleteTaiKhoan);

    // tạo tài khoản cán bộ
    app.post('/web/create/taikhoan/canbo', taikhoan.taoTaiKhoanCB);

    // đăng nhập tài khoản
    app.post('/web/taikhoan/dangnhap', taikhoan.dangnhap);

    // đăng xuất tài khoản
    app.get('/web/taikhoan/dangxuat', taikhoan.dangxuat);

    // đổi mật khẩu tài khoản
    app.post('/web/taikhoan/thaydoi/matkhau', taikhoan.thayDoiMatKhau);

    // gửi mã xác nhận khi tạo tài khoản
    app.post('/web/taikhoan/email/code', taikhoan.sendCode);

    // lấy tình trạng của tài khoản
    app.post('/web/taikhoan/tinhtrang', taikhoan.layTinhTrang);

    // lấy thông tin thí sinh
    app.get('/web/taikhoan/thongtin', taikhoan.hienThongTinThiSinh);

    // sửa thông tin thí sinh
    app.put('/web/taikhoan/sua/thongtin', taikhoan.suaThongTinThiSinh);

    // nạp thông tin thí sinh
    app.post('/web/taikhoan/thongtin/themthisinh', taikhoan.napThongTinThiSinh);

    // lấy thông tin đăng nhập
    app.get('/web/taikhoan/checkCookie', taikhoan.checkCookie);

    // lấy tất cả thí sinh
    app.get('/web/taikhoan/thisinh', taikhoan.getAllThiSinh);

    // lấy tất cả cán bộ
    app.get('/web/taikhoan/canbo', taikhoan.getAllCanBo);

    // // lấy tất cả môn thi
    // app.get('/web/taikhoan/monthi', taikhoan.getAllMonThi);
}