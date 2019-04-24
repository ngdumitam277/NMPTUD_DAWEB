const TaiKhoan = require('../models/taikhoan.model.js');
const ngQuanLy = require('../models/ngQuanLy.model.js');
const CanBo = require('../models/canbo.model.js');
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

async function taoTaiKhoanCB(){
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
        console.log("taoTaiKhoan", err)
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