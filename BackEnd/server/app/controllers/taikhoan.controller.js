const TaiKhoan = require('../models/taikhoan.model.js');
const ngQuanLy = require('../models/ngQuanLy.model.js');
const CanBo = require('../models/canbo.model.js');
const ThiSinh = require('../models/thiSinh.model.js');
const moment = require('moment');
const nodemailer = require("nodemailer");

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
            }
    
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
    let username = req.body.username ? req.body.username : ""

    try{
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
                    res.send({message: "ok", loai: user[0].loai})
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

// Retrieve and return all movies from the database.
exports.findAll = (req, res) => {
    Movie.find()
    .then(movies => {
        res.send(movies);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {

};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {

};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {

};