const ThiSinh = require('../models/thiSinh.model.js');
const ThiSinhNhap = require('../models/thiSinhNhap.model.js');
const moment = require('moment');
const DiemThi = require('../models/diemThi.model.js');
const KhoiMon = require('../models/khoiMon.model.js');
const mongoose = require('mongoose')

// tạo thí sinh
exports.taoThiSinh = async(req, res) => {
    let usernamets = req.body.usernamets ? req.body.usernamets : ""
    let SBD = req.body.SBD ? req.body.SBD : ""
    let tenTHPT = req.body.tenTHPT ? req.body.tenTHPT : ""
    let namTotNghiep = req.body.namTotNghiep ? req.body.namTotNghiep : ""
    let anhMinhChung = req.body.anhMinhChung ? req.body.anhMinhChung : ""
    let ttTuyenSinh = Number(req.body.ttTuyenSinh)
    let Phach = Number(req.body.Phach)
    let maKhuVuc = req.body.maKhuVuc ? req.body.maKhuVuc : ""
    let maDoiTuong = req.body.maDoiTuong ? req.body.maDoiTuong : ""

    try{
        if(usernamets !== "" && !isNaN(ttTuyenSinh) && !isNaN(Phach)){
            let exist = await ThiSinh.find({usernamets: usernamets})
            if(exist.length > 0){
                res.send({message: "Thí sinh đã tồn tại!"})
            }else{
                const thisinh = new ThiSinh({
                    usernamets: usernamets,
                    SBD: SBD,
                    tenTHPT: tenTHPT,
                    namTotNghiep: namTotNghiep,
                    anhMinhChung: anhMinhChung,
                    ttTuyenSinh: ttTuyenSinh,
                    Phach: Phach,
                    maKhuVuc: maKhuVuc,
                    maDoiTuong: maDoiTuong
                })
            
                thisinh.save()
                .then((result) => {
                    res.send({message: "Tạo thí sinh thành công!"});
                }).catch(err => {
                    console.log("taoThiSinh", err)
                    res.send({message: "Lỗi tạo thí sinh"})
                })
            }
        }else{
            console.log("taoThiSinh", "usernamets không được rỗng!")
            res.send({message: "usernamets không được rỗng!"})
        }
    }catch(err){
        console.log("taoThiSinh", err)
        res.send({message: "Lỗi tạo thí sinh"})
    }
};

// nộp hồ sơ
exports.nopHoSo = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let maNganh = req.body.maNganh ? req.body.maNganh : ""
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""

    let thisinhnhap = ThiSinhNhap.findOneAndUpdate({usernamets: username}, {maNganh: maNganh, tenKhoi: tenKhoi})
    let thisinh = ThiSinh.findOne({usernamets: username})
    let khoimon = KhoiMon.find({tenKhoi: tenKhoi}, {_id: 0, tenKhoi: 0, createdAt: 0, updatedAt: 0, __v: 0})    

    Promise.all([thisinh, thisinhnhap, khoimon])
    .then(async(result) => {
        let dataThiSinh = result[0]
        let dataKhoiMon = result[2]
        let Phach = dataThiSinh.Phach

        let dataDiemThiInsert = dataKhoiMon.map((item, index) => {
            return { _id: mongoose.Types.ObjectId(), mon: item.tenMon, Phach: Phach, maDiem: "", diem: "" }
        })

        let diemThiInsert = DiemThi.insertMany(dataDiemThiInsert)
        let diemThiRemove = DiemThi.remove({Phach: Phach})

        Promise.all([diemThiInsert, diemThiRemove])
        .then((result) => {
            res.send({message: "ok"})  
        })
        .catch((err) => {
            console.log(err)
            res.send({message: "Lỗi nộp hồ sơ!!!"})
        })
    })
    .catch((err) => {
        console.log(err)
        res.send({message: "Lỗi nộp hồ sơ!!!"})
    })
};

// tìm kiếm thí sinh
exports.timKiemThiSinh = async(req, res) => {
    let keySearch = req.body.keySearch ? req.body.keySearch : ""

    try{
        if(keySearch !== ""){
            ThiSinh.aggregate([
                { $project: { usernamets: 1, maDoiTuong: 1, maKhuVuc: 1, SBD: 1, _id: 0 } },
                { $lookup: {
                        from: "taikhoans",
                        localField: "usernamets",
                        foreignField: "username",
                        as: "taikhoan"
                    }
                },
                { $unwind: "$taikhoan" },
                { $project: { 
                        usernamets: "$usernamets",
                        SBD: "$SBD",
                        hTen: "$taikhoan.hTen",
                        ngSinh: "$taikhoan.ngSinh",
                        gioiTinh: "$taikhoan.gioiTinh",
                        maKhuVuc: "$maKhuVuc",
                        maDoiTuong: "$maDoiTuong",
                        loai: "$taikhoan.loai"
                    } 
                },
                { $match: { 
                    $and: [ 
                            { $or: [ { SBD: keySearch }, { usernamets: keySearch } ] }, 
                            { loai: "TS" } 
                        ]
                    }
                },
                { $lookup: {
                        from: "doituongs",
                        localField: "maDoiTuong",
                        foreignField: "maDoiTuong",
                        as: "doituong"
                    }
                },
                { $unwind: "$doituong" },
                { $project: {
                        usernamets: "$usernamets",
                        SBD: "$SBD",
                        hTen: "$hTen",
                        ngSinh: "$ngSinh",
                        gioiTinh: "$gioiTinh",
                        maKhuVuc: "$maKhuVuc",
                        maDoiTuong: "$maDoiTuong",
                        diemCong: "$doituong.diemCong"
                    } 
                },
                { $lookup: {
                        from: "khuvucs",
                        localField: "maKhuVuc",
                        foreignField: "maKhuVuc",
                        as: "khuvuc"
                    }
                },
                { $unwind: "$khuvuc" },
                { $project: {
                        usernamets: "$usernamets",
                        SBD: "$SBD",
                        hTen: "$hTen",
                        ngSinh: "$ngSinh",
                        gioiTinh: "$gioiTinh",
                        maKhuVuc: "$maKhuVuc",
                        maDoiTuong: "$maDoiTuong",
                        diemCong: { $add: [ "$diemCong", "$khuvuc.diemCong" ] }
                    } 
                },
                { $lookup: {
                        from: "thisinhnhaps",
                        localField: "usernamets",
                        foreignField: "usernamets",
                        as: "thisinhnhap"
                    }
                },
                { $unwind: "$thisinhnhap" },
                { $project: {
                        usernamets: "$usernamets",
                        SBD: "$SBD",
                        hTen: "$hTen",
                        ngSinh: "$ngSinh",
                        gioiTinh: "$gioiTinh",
                        maKhuVuc: "$maKhuVuc",
                        maDoiTuong: "$maDoiTuong",
                        diemCong: "$diemCong",
                        tenKhoi: "$thisinhnhap.tenKhoi"
                    } 
                },
                { $lookup: {
                        from: "khois",
                        localField: "tenKhoi",
                        foreignField: "tenKhoi",
                        as: "khoi"
                    }
                },
                { $unwind: "$khoi" },
                { $project: {
                        usernamets: "$usernamets",
                        SBD: "$SBD",
                        hTen: "$hTen",
                        ngSinh: "$ngSinh",
                        gioiTinh: "$gioiTinh",
                        maKhuVuc: "$maKhuVuc",
                        maDoiTuong: "$maDoiTuong",
                        diemCong: "$diemCong",
                        tenKhoi: "$tenKhoi",
                        diemTBkhoi: "$khoi.diemTBkhoi"
                    } 
                },
            ])
            .then((result) => {
                res.send(result);
            }).catch(err => {
                console.log("timKiemThiSinh", err)
                res.send({message: "Lỗi tìm kiếm thí sinh"})
            })
        }else{
            console.log("timKiemThiSinh", "keySearch không được rỗng!")
            res.send({message: "keySearch không được rỗng!"})
        }
    }catch(err){
        console.log("timKiemThiSinh", err)
        res.send({message: "Lỗi tìm kiếm thí sinh"})
    }
};