const TaiKhoan = require('../models/taikhoan.model.js');
const ngQuanLy = require('../models/ngQuanLy.model.js');
const CanBo = require('../models/canbo.model.js');
const ThiSinh = require('../models/thiSinh.model.js');
const moment = require('moment');
const nodemailer = require("nodemailer");
var md5 = require('md5');
var cookie = require('cookie');
var cookieTime = 3600*24*6; // tính bằng mili giây
var tokenTime = 3600*24*6; // 6 ngày cho token tính bằng mili giây

var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;
var passport = require("passport");

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'tamquysamg123456';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    console.log('payload received', jwt_payload);
    next(null, jwt_payload)
});

passport.use(strategy);

// tạo tài khoản thí sinh
exports.taoTaiKhoanTS = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let password = req.body.password ? req.body.password : ""
    let soCMND = req.body.soCMND ? req.body.soCMND : ""
    let ngCapCMND = req.body.ngCapCMND ? moment(req.body.ngCapCMND, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let hTen = req.body.hTen ? req.body.hTen : ""
    let ngSinh = req.body.ngSinh ? moment(req.body.ngSinh, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let danToc = req.body.danToc ? req.body.danToc : ""
    let gioiTinh = req.body.gioiTinh ? req.body.gioiTinh : ""
    let anh34 = req.body.anh34 ? req.body.anh34 : ""
    let SDT = req.body.SDT ? req.body.SDT : ""
    let noiSinh = req.body.noiSinh ? req.body.noiSinh : ""
    let diaChi = req.body.diaChi ? req.body.diaChi : ""
    let email = req.body.email ? req.body.email : ""
    let tgDangKy = req.body.tgDangKy ? moment(req.body.tgDangKy, "DD-MM-YYYY HH:mm:ss").toISOString() : ""

    try{
        if(username !== ""){
            let exist = await TaiKhoan.find({username: username})
            if(exist.length > 0){
                res.send({message: "Tài khoản đã tồn tại!"})
            }else{
                const taikhoan = new TaiKhoan({
                    username: username,
                    password: password,
                    soCMND: soCMND,
                    ngCapCMND: ngCapCMND,
                    hTen: hTen,
                    ngSinh: ngSinh,
                    danToc: danToc,
                    gioiTinh: gioiTinh,
                    anh34: anh34,
                    SDT: SDT,
                    noiSinh: noiSinh,
                    diaChi: diaChi,
                    email: email,
                    loai: "TS",
                    tinhTrang: 0,
                    tgDangKy: tgDangKy,
                    maXacNhan: ""
                })
            
                taikhoan.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoTaiKhoanTS", err)
                    res.send({message: "Lỗi tạo tài khoản thí sinh thất bại!"})
                })
            }
        }else{
            console.log("taoTaiKhoanTS", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("taoTaiKhoanTS", err)
        res.send({message: "Lỗi tạo tài khoản"})
    }
};

// tạo tài khoản cán bộ
exports.taoTaiKhoanCB = async(req, res) => {
    let maXacNhan = req.body.maXacNhan ? req.body.maXacNhan : ""
    let username = req.body.username ? req.body.username : ""
    let password = req.body.password ? req.body.password : ""
    let soCMND = req.body.soCMND ? req.body.soCMND : ""
    let ngCapCMND = req.body.ngCapCMND ? moment(req.body.ngCapCMND, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let hTen = req.body.hTen ? req.body.hTen : ""
    let ngSinh = req.body.ngSinh ? moment(req.body.ngSinh, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let danToc = req.body.danToc ? req.body.danToc : ""
    let gioiTinh = req.body.gioiTinh ? req.body.gioiTinh : ""
    let anh34 = req.body.anh34 ? req.body.anh34 : ""
    let SDT = req.body.SDT ? req.body.SDT : ""
    let noiSinh = req.body.noiSinh ? req.body.noiSinh : ""
    let diaChi = req.body.diaChi ? req.body.diaChi : ""
    let email = req.body.email ? req.body.email : ""
    let tgDangKy = req.body.tgDangKy ? moment(req.body.tgDangKy, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let chucVu = req.body.chucVu ? req.body.chucVu : ""
    let quyenHan = Number(req.body.quyenHan)

    try{
        if(username !== "" && maXacNhan !== ""){
            let ngQL = await ngQuanLy.find({maXacThucCB: maXacNhan})
            if(ngQL.length > 0){
                let exist = await TaiKhoan.find({username: username})
                if(exist.length > 0){
                    res.send({message: "Tài khoản đã tồn tại!"})
                }
                let taikhoan = taoTaiKhoanCB(username, password, soCMND, ngCapCMND, hTen, ngSinh, danToc, gioiTinh,
                    anh34, SDT, noiSinh, diaChi, email, tgDangKy, maXacNhan)
                let canbo = taoCanBo(username, chucVu, quyenHan)

                Promise.all([taikhoan, canbo])
                .then((result) => {
                    if(result[0] && result[1]){
                        res.send({message: "ok"})
                    }else{
                        console.log("taoTaiKhoanCB", "Tạo tài khoản cán bộ thất bại!")
                        res.send("taoTaiKhoanCB", "Tạo tài khoản cán bộ thất bại!")
                    }
                })
                .catch((err) => {
                    console.log("taoTaiKhoanCB", err)
                    res.send("taoTaiKhoanCB", "Tạo tài khoản cán bộ thất bại!")
                })
            }else{
                console.log("taoTaiKhoanCB", "lỗi mã xác thức cán bộ!")
                res.send({message: "Lỗi mã xác thực cán bộ!"})
            }
        }else{
            console.log("taoTaiKhoanCB", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("taoTaiKhoanCB", err)
        res.send({message: "Lỗi tạo tài khoản"})
    }
};

// lấy tình trạng tài khoản
exports.layTinhTrang = async(req, res) => {
    let username = req.body.username ? req.body.username : ""

    try{
        if(username !== ""){
            let taikhoan = await TaiKhoan.find({username: username}, { loai: 1, tinhTrang: 1 })
            if(taikhoan.length > 0){
                let loai = taikhoan[0].loai
                let tinhTrang = Number(taikhoan[0].tinhTrang)

                if(loai === "TS"){
                    res.send({tinhTrang: tinhTrang})
                }else{
                    let canbo = await CanBo.find({username: username}, { quyenHan: 1 })
                    if(canbo.length > 0){
                        let quyenHan = Number(canbo[0].quyenHan)
                        if(quyenHan === 0){
                            let tinhTrangCB = await layTinhTrangNguoiNhapData()
                            tinhTrang = tinhTrangCB === -1 ? tinhTrang : tinhTrangCB

                            res.send({tinhTrang: tinhTrang})
                        }else if(quyenHan === 1){
                            let tinhTrangCB = await layTinhTrangNguoiNhapDiem()
                            tinhTrang = tinhTrangCB === -1 ? tinhTrang : tinhTrangCB

                            res.send({tinhTrang: tinhTrang})
                        }else{
                            res.send({tinhTrang: tinhTrang})
                        }
                    }else{
                        res.send({message: "Không có username này trong cán bộ!"})
                    }
                }
            }else{
                res.send({message: "Không có username này trong tài khoản!"})
            }
        }else{
            console.log("layTinhTrang", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("layTinhTrang", err)
        res.send({message: "Lỗi lấy tình trạng"})
    }
};

// hiện thông tin thí sinh
exports.hienThongTinThiSinh = async(req, res) => {
    let user = await checkCookie(req.headers.cookie)

    if(user.kt){
        try{
            let cookies = cookie.parse(req.headers.cookie || '');
            let decoded = jwt.verify(cookies.token, jwtOptions.secretOrKey)
            let username = decoded.username

            if(username !== ""){
                TaiKhoan.aggregate([
                    { $match: { username: username } },
                    { $project: {
                            _id: 0,
                            username: 1,
                            hTen: 1,
                            ngSinh: 1,
                            gioiTinh: 1,
                            danToc: 1,
                            soCMND: 1,
                            ngCapCMND: 1,
                            noiSinh: 1,
                            diaChi: 1,
                            email: 1,
                            SDT: 1
                        } 
                    },
                    { 
                        $lookup: {from: "thisinhs", localField: "username", foreignField: "usernamets", as: "thisinh"}
                    },
                    { $unwind: "$thisinh" },
                    { $project: {
                            username: 1,
                            hTen: 1,
                            ngSinh: 1,
                            gioiTinh: 1,
                            danToc: 1,
                            soCMND: 1,
                            ngCapCMND: 1,
                            noiSinh: 1,
                            diaChi: 1,
                            email: 1,
                            SDT: 1,
                            namTotNghiep: "$thisinh.namTotNghiep",
                            tenTHPT: "$thisinh.tenTHPT",
                            anhMinhChung: "$thisinh.anhMinhChung",
                            maKhuVuc: "$thisinh.maKhuVuc",
                            maDoiTuong: "$thisinh.maDoiTuong"
                        } 
                    }
                ])  
                .then((result) => {
                    res.send(result)
                })          
                .catch((err) => {
                    console.log("hienThongTinThiSinh", err)
                    res.send({message: "Lỗi lấy thông tin thí sinh!"})
                })
            }else{
                console.log("hienThongTinThiSinh", "username không được rỗng!")
                res.send({message: "Username không được rỗng!"})
            }
        }catch(err){
            console.log("hienThongTinThiSinh", err)
            res.send({message: "Lỗi lấy thông tin thí sinh!"})
        }
    }else{
        console.log("hienThongTinThiSinh", "error cookie")
        res.send({message: "Lỗi lấy thông tin thí sinh!"})
    }
};

// nạp thông tin thí sinh
exports.napThongTinThiSinh = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let password = req.body.password ? req.body.password : ""
    let soCMND = req.body.soCMND ? req.body.soCMND : ""
    let ngCapCMND = req.body.ngCapCMND ? moment(req.body.ngCapCMND, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let hTen = req.body.hTen ? req.body.hTen : ""
    let ngSinh = req.body.ngSinh ? moment(req.body.ngSinh, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let danToc = req.body.danToc ? req.body.danToc : ""
    let gioiTinh = req.body.gioiTinh ? req.body.gioiTinh : ""
    let anh34 = req.body.anh34 ? req.body.anh34 : ""
    let SDT = req.body.SDT ? req.body.SDT : ""
    let noiSinh = req.body.noiSinh ? req.body.noiSinh : ""
    let diaChi = req.body.diaChi ? req.body.diaChi : ""
    let email = req.body.email ? req.body.email : ""
    let tgDangKy = req.body.tgDangKy ? moment(req.body.tgDangKy, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let SBD = req.body.SBD ? req.body.SBD : ""
    let tenTHPT = req.body.tenTHPT ? req.body.tenTHPT : ""
    let namTotNghiep = req.body.namTotNghiep ? req.body.namTotNghiep : ""
    let anhMinhChung = req.body.anhMinhChung ? req.body.anhMinhChung : ""
    let ttTuyenSinh = Number(req.body.ttTuyenSinh)
    let Phach = Number(req.body.Phach)
    let maKhuVuc = req.body.maKhuVuc ? req.body.maKhuVuc : ""
    let maDoiTuong = req.body.maDoiTuong ? req.body.maDoiTuong : ""

    try{
        if(username !== ""){
            if(kiemTraEmail(email)){
                res.send({message: "Lỗi email trùng!"})
            }

            if(kiemTraCMND(soCMND)){
                res.send({message: "Lỗi CMND trùng!"})
            }

            if(kiemTraSDT(SDT)){
                res.send({message: "Lỗi SDT trùng!"})
            }

            let taikhoan = taoTaiKhoanTS(username, password, soCMND, ngCapCMND, hTen, ngSinh, danToc, gioiTinh,
                anh34, SDT, noiSinh, diaChi, email, tgDangKy)
            let thisinh = taoThiSinh(username, SBD, tenTHPT, namTotNghiep, anhMinhChung, ttTuyenSinh, Phach, 
                maKhuVuc, maDoiTuong)

            Promise.all([taikhoan, thisinh])
            .then((result) => {
                if(result[0] && result[1]){
                    res.send({message: "ok"})
                }else{
                    res.send({message: "Lỗi nạp thông tin thí sinh!"})
                }
            })
            .catch((err) => {
                console.log("napThongTinThiSinh", err)
                res.send({message: "Lỗi nạp thông tin thí sinh!"})
            })
        }else{
            console.log("napThongTinThiSinh", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("napThongTinThiSinh", err)
        res.send({message: "Lỗi nạp thông tin thí sinh!"})
    }
};

async function kiemTraEmail(email){
    try{
        let taikhoan = await TaiKhoan.find({email: email})
        if(taikhoan.length > 0){
            return true
        }
    }catch(err){
        console.log("kiemTraEmail", err)
    }

    return false
}

async function kiemTraCMND(soCMND){
    try{
        let taikhoan = await TaiKhoan.find({soCMND: soCMND})
        if(taikhoan.length > 0){
            return true
        }
    }catch(err){
        console.log("kiemTraCMND", err)
    }

    return false
}

async function kiemTraSDT(SDT){
    try{
        let taikhoan = await TaiKhoan.find({SDT: SDT})
        if(taikhoan.length > 0){
            return true
        }
    }catch(err){
        console.log("kiemTraSDT", err)
    }

    return false
}

async function layTinhTrangNguoiNhapDiem(){
    let namTuyenSinh = new Date().getFullYear()

    try{
        let quanly = await ngQuanLy.aggregate([
                    { $match: { namTuyenSinh: `${namTuyenSinh}` } },
                    { $project: { tinhTrang: 
                            {
                                $cond: { if: { $gte: [ "$tgCongBoKQ", new Date() ] }, then: 2, else: -1 }
                            }
                        } 
                    }
                ])
        if(quanly.length > 0){
            return quanly[0].tinhTrang
        }
    }catch(err){
        console.log("layTinhTrangNguoiNhapDiem", err)
    }

    return -1
}

async function taoTaiKhoanTS(username, password, soCMND, ngCapCMND, hTen, ngSinh, danToc, gioiTinh,
    anh34, SDT, noiSinh, diaChi, email, tgDangKy) {
    const taikhoan = new TaiKhoan({
        username: username,
        password: password,
        soCMND: soCMND,
        ngCapCMND: ngCapCMND,
        hTen: hTen,
        ngSinh: ngSinh,
        danToc: danToc,
        gioiTinh: gioiTinh,
        anh34: anh34,
        SDT: SDT,
        noiSinh: noiSinh,
        diaChi: diaChi,
        email: email,
        loai: "TS",
        tinhTrang: 0,
        tgDangKy: tgDangKy,
        maXacNhan: ""
    })

    try{
        await taikhoan.save()
        return true
    }catch(err){
        console.log("taoTaiKhoanTS", err)
    }

    return false
}

async function taoThiSinh(username, SBD, tenTHPT, namTotNghiep, anhMinhChung, ttTuyenSinh, Phach, 
    maKhuVuc, maDoiTuong){
    const thisinh = new ThiSinh({
        usernamets: username,
        SBD: SBD,
        tenTHPT: tenTHPT,
        namTotNghiep: namTotNghiep,
        anhMinhChung: anhMinhChung,
        ttTuyenSinh: ttTuyenSinh,
        Phach: Phach,
        maKhuVuc: maKhuVuc,
        maDoiTuong: maDoiTuong
    })

    try{
        await thisinh.save()
        return true
    }catch(err){
        console.log("taoThiSinh", err)
    }

    return false
}

async function layTinhTrangNguoiNhapData(){
    let namTuyenSinh = new Date().getFullYear()

    try{
        let quanly = await ngQuanLy.aggregate([
                    { $match: { namTuyenSinh: `${namTuyenSinh}` } },
                    { $project: { tinhTrang: 
                            {
                                $cond: { if: { $gte: [ "$tgKTnhanHoSo", new Date() ] }, then: 2, else: -1 }
                            }
                        } 
                    }
                ])
        if(quanly.length > 0){
            return quanly[0].tinhTrang
        }
    }catch(err){
        console.log("layTinhTrangNguoiNhapData", err)
    }

    return -1
}

async function taoCanBo(username, chucVu, quyenHan){
    const canbo = new CanBo({
        username: username,
        chucVu: chucVu,
        quyenHan: quyenHan
    })

    try{
        await canbo.save()
        return true
    }catch(err){
        console.log("taoCanBo", err)
    }

    return false
}

async function taoTaiKhoanCB(username, password, soCMND, ngCapCMND, hTen, ngSinh, danToc, gioiTinh,
                    anh34, SDT, noiSinh, diaChi, email, tgDangKy, maXacNhan){
    const taikhoan = new TaiKhoan({
        username: username,
        password: password,
        soCMND: soCMND,
        ngCapCMND: ngCapCMND,
        hTen: hTen,
        ngSinh: ngSinh,
        danToc: danToc,
        gioiTinh: gioiTinh,
        anh34: anh34,
        SDT: SDT,
        noiSinh: noiSinh,
        diaChi: diaChi,
        email: email,
        loai: "CB",
        tinhTrang: 0,
        tgDangKy: tgDangKy,
        maXacNhan: maXacNhan
    })

    try{
        await taikhoan.save()
        return true
    }catch(err){
        console.log("taoTaiKhoanCB", err)
    }

    return false
}

// đăng nhập bằng tài khoản
exports.dangnhap = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let password = req.body.password ? req.body.password : ""
    
    try{
        if(username !== "" && password !== ""){
            let exist = await TaiKhoan.find({username: username})
            if(exist.length > 0){
                let user = await TaiKhoan.find({username: username, password: password})
                if(user.length > 0){
                    var payload = {username: user[0].username, loai: user[0].loai, 
                        exp: Math.floor(Date.now() / 1000) + tokenTime, hTen: user[0].hTen};
                    var token = jwt.sign(payload, jwtOptions.secretOrKey);
                    res.setHeader('Set-Cookie', cookie.serialize('token', token, {
                        httpOnly: true,
                        maxAge: cookieTime
                    }));
                    res.setHeader('If-None-Match', 'no-match-for-this');
                    res.setHeader('ETag', 'no-match-for-this');
                    res.send({message: "ok"})
                }else{
                    res.send({message: "Bạn nhập sai mật khẩu!"})
                }
            }else{
                console.log("dangnhap", "Tài khoản không tồn tại!")
                res.send({message: "Tài khoản không tồn tại!"})
            }
        }else{
            console.log("dangnhap", "tài khoản hoặc mật khẩu không được rỗng!")
            res.send({message: "tài khoản hoặc mật khẩu không được rỗng!"})
        }
    }catch(err){
        console.log("dangnhap", err)
        res.send({message: "Lỗi đăng nhập tài khoản!"})
    }
};

// đăng xuất bằng tài khoản
exports.dangxuat = (req, res) => {
    res.setHeader('Set-Cookie', cookie.serialize('token', null));
    res.setHeader('If-None-Match', 'no-match-for-this')
    res.setHeader('ETag', 'no-match-for-this')
    res.end()
};

// thay đổi mật khẩu
exports.thayDoiMatKhau = async(req, res) => {
    let email = req.body.email ? req.body.email : ""
    let passwordOld = req.body.passwordOld ? req.body.passwordOld : ""
    let passwordNew = req.body.passwordNew ? req.body.passwordNew : ""

    try{
        if(email !== "" && passwordOld !== "" && passwordNew !== ""){
            let exist = await TaiKhoan.find({email: email, password: passwordOld})
            if(exist.length > 0){
                TaiKhoan.findOneAndUpdate({email: email, password: passwordOld}, {password: passwordNew})
                .then((result) => {
                    res.send({message: "ok"})
                })
                .catch((err) => {
                    console.log("thayDoiMatKhau", err)
                    res.send({message: "Lỗi thay đổi mật khẩu!"})
                })
            }else{
                console.log("thayDoiMatKhau", "Email không tồn tại!")
                res.send({message: "Email không tồn tại!"})
            }
        }else{
            console.log("thayDoiMatKhau", "email hoặc mật khẩu không được rỗng!")
            res.send({message: "email hoặc mật khẩu không được rỗng!"})
        }
    }catch(err){
        console.log("thayDoiMatKhau", err)
        res.send({message: "Lỗi thay đổi mật khẩu!"})
    }
};

// gửi mã xác nhận khi tạo tài khoản
exports.sendCode = async(req, res) => {
    let email = req.body.email ? req.body.email : ""

    try{
        if(email !== ""){
            let exist = await TaiKhoan.find({email: email})
            if(exist.length > 0){
                let code = getCode()

                let kt = await updateCodeUser(exist, code)
                if(kt === false) res.send({message: "error"})

                kt = await sendMailCodeResetPassword(email, code)
                if(kt === false) res.send({message: "error"})

                res.send({message: "ok"})
            }else{
                console.log("sendCode", "Email không tồn tại!")
                res.send({message: "Email không tồn tại!"})
            }
        }else{
            console.log("sendCode", "Email không được rỗng")
            res.send({message: "Email không được rỗng!"})
        }
    }catch(err){
        console.log(err, "sendCode")
        res.send({message: "Lỗi gửi mã xác nhận!"})
    }
};

async function updateCodeUser(data, code){
    try{
        let response = await User.findByIdAndUpdate(data[0]._id, {
            maXacNhan: code
        }, {new: true})
        if(response.code){
            return true
        }else{
            return false
        }
    }catch(err){
        console.log(err, "updateCodeUser")
        return false
    }
    return false
}

function getCode(){
    let code = ""
    for(let i=0; i<6; i++){
        code += Math.floor((Math.random() * 9) + 1)
    }
    return code
}

async function sendMailCodeResetPassword(mailReceivers, code){
    try{
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "thongbaotasker@gmail.com", 
                pass: "8239198tamquysang" 
            }
        });
        
        let mailOptions = {
            from: '"Đăng ký tài khoản" <thongbaotasker@gmail.com>', // sender address
            to: mailReceivers, // list of receivers
            subject: 'Thông tin đăng ký tài khoản của bạn', // Subject line
            text: `Code your is: ${code}`, // plain text body
        };
    
        let response = await transporter.sendMail(mailOptions)
        if(response.messageId){
            return true
        }
    }catch(err){
        console.log(err)
        return false
    }

    return false
}

exports.checkCookie = async (req, res) => {
    let user = await checkCookie(req.headers.cookie)
    if(user.kt){
        try{
            let cookies = cookie.parse(req.headers.cookie || '');
            let decoded = jwt.verify(cookies.token, jwtOptions.secretOrKey)
            let userInfo = { 
                username: decoded.username, 
                loai: decoded.loai, 
                hTen: decoded.hTen 
            }
            res.send({message: "ok", user: userInfo})
        }catch(err){
            console.log(err)
            res.send({message: "error cookie"})
        }
    }else{
        res.send({message: "error cookie"})
    }
}

exports.getAllThiSinh = async (req, res) => {
    TaiKhoan.find({loai: "TS"}, {_id: 0, __v: 0, anh34: 0, password: 0, tgDangKy: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả thí sinh!"})
        console.log("Lỗi lấy tất cả thí sinh!", err)
    })
}

exports.getAllCanBo = async (req, res) => {
    TaiKhoan.find({loai: "CB"}, {_id: 0, __v: 0, anh34: 0, password: 0, tgDangKy: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả cán bộ!"})
        console.log("Lỗi lấy tất cả cán bộ!", err)
    })
}

exports.deleteTaiKhoan = async (req, res) => {
    let username = req.params.username

    TaiKhoan.findOneAndUpdate({username: username}, { tinhTrang: 3 }, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá tài khoản theo username!"})
        console.log(err, "deleteTaiKhoan")
    })
}

async function checkCookie(data){
    let informationUser = {
        kt: false,
        user: []
    }
    let cookies = cookie.parse(data || '');
    if(cookies.token){
        try{
            let decoded = jwt.verify(cookies.token, jwtOptions.secretOrKey)
            if(decoded.username){
                try{
                    let user = await TaiKhoan.find({username: decoded.username})
                    if(user.length > 0){
                        informationUser.kt = true
                        informationUser.user = user
                        return informationUser
                    }else{
                        return informationUser
                    }
                }catch(e) {
                    return informationUser
                }
            }else{
                return informationUser
            }
        }catch(e){
            return informationUser
        }
    }else{
        return informationUser
    }   
}