const TaiKhoan = require('../models/taikhoan.model.js');
const moment = require('moment');

// tạo tài khoản
exports.taoTaiKhoan = async(req, res) => {
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
    let loai = req.body.loai ? req.body.loai : ""
    let tinhTrang = req.body.tinhTrang ? req.body.tinhTrang : ""
    let tgDangKy = req.body.tgDangKy ? moment(req.body.tgDangKy, "DD-MM-YYYY HH:mm:ss").toISOString() : ""

    if(username !== ""){
        let user = await TaiKhoan.find({username: username})
        if(user.length > 0){
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
            loai: loai,
            tinhTrang: tinhTrang,
            tgDangKy: tgDangKy
        })
    
        taikhoan.save()
        .then((result) => {
            res.send({message: "Tạo tài khoản thành công!"});
        }).catch(err => {
            console.log("taoTaiKhoan", err)
            res.send({message: "Lỗi tạo tài khoản"})
        })
    }else{
        console.log("taoTaiKhoan", "username không được rỗng!")
        res.send({message: "Username không được rỗng!"})
    }
};

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