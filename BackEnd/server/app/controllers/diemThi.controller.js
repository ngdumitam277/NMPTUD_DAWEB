const DiemThi = require('../models/diemThi.model.js');
const moment = require('moment');
const nodemailer = require("nodemailer");
var md5 = require('md5');
var cookie = require('cookie');
var cookieTime = 3600*24*6; // tính bằng mili giây
var tokenTime = 3600*24*6; // 6 ngày cho token tính bằng mili giây
var mongoose = require('mongoose');

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

// tạo điểm thi
exports.taoDiemThi = async(req, res) => {
    let maDiem = req.body.maDiem ? req.body.maDiem : ""
    let mon = req.body.mon ? req.body.mon : ""
    let diem = Number(req.body.diem)
    let phach = Number(req.body.phach)

    try{
        if(!isNaN(diem) && !isNaN(phach)){
            let exist = await DiemThi.find({phach: phach})
            if(exist.length > 0){
                res.send({message: "Phách này đã tồn tại!"})
            }else{
                const diemthi = new DiemThi({
                    maDiem: maDiem,
                    mon: mon,
                    diem: diem,
                    phach: phach
                })
            
                diemthi.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoDiemThi", err)
                    res.send({message: "Lỗi tạo điểm thi"})
                })
            }
        }else{
            console.log("taoDiemThi", "Lỗi phách hoặc điểm không phải là số!")
            res.send({message: "Lỗi phách hoặc điểm không phải là số!"})
        }
    }catch(err){
        console.log("taoDiemThi", err)
        res.send({message: "Lỗi tạo điểm thi"})
    }
};

// lấy tất cả điểm thi
exports.getAllDiemThi = async(req, res) => {
    DiemThi.find({}, {createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả các điểm thi!"})
        console.log(err, "getAllDiemThi")
    })
};

// sửa 1 điểm thi theo id
exports.updateDiemThi = async(req, res) => {
    let id = req.params.id
    let body = req.body

    DiemThi.findOneAndUpdate({_id: id}, body, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa điểm thi theo id!"})
        console.log(err, "updateDiemThi")
    })
};

// xoá 1 điểm thi theo id
exports.deleteDiemThi = async(req, res) => {
    let id = req.params.id

    DiemThi.findOneAndRemove({_id: id}, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá điểm thi theo id!"})
        console.log(err, "deleteDiemThi")
    })
};

// thống kê môn
exports.thongKeMon = async(req, res) => {
    DiemThi.aggregate(
        [
            {
                $group : {
                    _id: "$mon",
                    averageDiem: { $avg: "$diem" },
                    count: { $sum: 1 }
                }
            }
        ]
    )
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi thống kê môn!"})
        console.log(err, "thongKeMon")
    })
};

// thống kê khối
exports.thongKeKhoi = async(req, res) => {
    DiemThi.aggregate([
        { $project: {
                diem: 1,
                mon: 1,
                Phach: 1
            } 
        },
        { 
            $lookup: {from: "thisinhs", localField: "Phach", foreignField: "Phach", as: "thisinh"}
        },
        { $unwind: "$thisinh" },
        {
            $project: {
                usernamets: "$thisinh.usernamets",
                diem: 1,
                mon: 1,
                Phach: 1
            } 
        },
        { 
            $lookup: {from: "thisinhnhaps", localField: "usernamets", foreignField: "usernamets", as: "thisinhnhap"}
        },
        { $unwind: "$thisinhnhap" },
        {
            $project: {
                usernamets: 1,
                diem: 1,
                mon: 1,
                Phach: 1,
                tenKhoi: "$thisinhnhap.tenKhoi"
            } 
        },
        {
            $group : {
                _id: "$tenKhoi",
                diemTB: { $avg: "$diem" },
                tongTSThi: { $addToSet: "$usernamets" }
            }
        },
        {
            $project: {
                _id: 0,
                tenKhoi: "$_id",
                diemTB: 1,
                tongTSThi: { $size: "$tongTSThi" }
            } 
        }
    ])
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi thống kê khối!"})
        console.log(err, "thongKeKhoi")
    })
};

// thống kê ngành
exports.thongKeNganh = async(req, res) => {
    DiemThi.aggregate([
        { $project: {
                diem: 1,
                mon: 1,
                Phach: 1
            } 
        },
        { 
            $lookup: {from: "thisinhs", localField: "Phach", foreignField: "Phach", as: "thisinh"}
        },
        { $unwind: "$thisinh" },
        {
            $project: {
                usernamets: "$thisinh.usernamets",
                diem: 1,
                mon: 1,
                Phach: 1,
                maKhuVuc: "$thisinh.maKhuVuc",
                maDoiTuong: "$thisinh.maDoiTuong"
            } 
        },
        {
            $group : {
                _id: {
                    "usernamets": "$usernamets", 
                    "maKhuVuc": "$maKhuVuc",
                    "maDoiTuong": "$maDoiTuong"
                },
                diem: { $sum: "$diem" }
            }
        },
        {
            $project : {
                _id: 0,
                usernamets: "$_id.usernamets",
                maKhuVuc: "$_id.maKhuVuc",
                maDoiTuong: "$_id.maDoiTuong",
                diem: { $sum: "$diem" }
            }
        },
        { 
            $lookup: {from: "thisinhnhaps", localField: "usernamets", foreignField: "usernamets", as: "thisinhnhap"}
        },
        { $unwind: "$thisinhnhap" },
        {
            $project: {
                usernamets: 1,
                diem: 1,
                tenKhoi: "$thisinhnhap.tenKhoi",
                maNganh: "$thisinhnhap.maNganh",
                maKhuVuc: 1,
                maDoiTuong: 1
            } 
        },
        { 
            $lookup: {
                from: "nganhkhois", 
                let: { order_maNganh: "$maNganh", order_tenKhoi: "$tenKhoi" },
                pipeline: [
                    { $match:
                       { $expr:
                          { $and:
                             [
                               { $eq: [ "$maNganh",  "$$order_maNganh" ] },
                               { $eq: [ "$tenKhoi", "$$order_tenKhoi" ] }
                             ]
                          }
                       }
                    },
                ],
                as: "nganhkhoi"
            }
        },
        { $unwind: "$nganhkhoi" },
        {
            $project: {
                usernamets: 1,
                diem: 1,
                tenKhoi: 1,
                maNganh: 1,
                diemChuan: "$nganhkhoi.diemChuan",
                maKhuVuc: 1,
                maDoiTuong: 1
            } 
        },
        { 
            $lookup: {from: "khuvucs", localField: "maKhuVuc", foreignField: "maKhuVuc", as: "khuvuc"}
        },
        { $unwind: "$khuvuc" },
        {
            $project: {
                usernamets: 1,
                diem: 1,
                tenKhoi: 1,
                maNganh: 1,
                diemCongKhuVuc: "$khuvuc.diemCong",
                maDoiTuong: 1,
                diemChuan: 1
            } 
        },
        { 
            $lookup: {from: "doituongs", localField: "maDoiTuong", foreignField: "maDoiTuong", as: "doituong"}
        },
        { $unwind: "$doituong" },
        {
            $project: {
                usernamets: 1,
                diem: 1,
                tenKhoi: 1,
                maNganh: 1,
                diemCongKhuVuc: 1,
                diemCongDoiTuong: "$doituong.diemCong",
                diemChuan: 1
            } 
        },
        {
            $project: {
                usernamets: 1,
                diem: { $sum: [ "$diem", "$diemCongKhuVuc", "$diemCongDoiTuong" ] },
                tenKhoi: 1,
                maNganh: 1,
                diemCongKhuVuc: 1,
                diemCongDoiTuong: 1,
                diemChuan: 1
            } 
        },
        {
            $project: {
                usernamets: 1,
                diem: 1,
                tenKhoi: 1,
                maNganh: 1,
                diemChuan: 1,
                thiDau: { $cond: { if: { $gte: [ "$diem", "$diemChuan" ] }, then: 1, else: 0 } }
            } 
        },
        {
            $group : {
                _id: "$maNganh",
                tongTSThi: { $addToSet: "$usernamets" },
                khoi: { $addToSet: { tenKhoi: "$tenKhoi", diemChuan: "$diemChuan" } },
                tongTSThiDau: { $sum: "$thiDau" }
            }
        },
        {
            $project: {
                _id: 0,
                maNganh: "$_id",
                khoi: 1,
                tongTSThi: { $size: "$tongTSThi" },
                tongTSThiDau: 1
            } 
        },
        {
            $addFields: {
               "khoi.tongTSThi": "$tongTSThi",
               "khoi.tongTSThiDau": "$tongTSThiDau"
            }
        },
        {
            $project: {
                _id: 0,
                maNganh: 1,
                khoi: 1
            } 
        },
        { 
            $lookup: {from: "nganhs", localField: "maNganh", foreignField: "maNganh", as: "nganh"}
        },
        { $unwind: "$nganh" },
        {
            $project: {
                tenNganh: "$nganh.tenNganh",
                khoi: 1,
                tongTSThi: { $sum: "$khoi.tongTSThi" },
                tongTSThiDau: { $sum: "$khoi.tongTSThiDau" }
            } 
        },
    ])
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi thống kê ngành!"})
        console.log(err, "thongKeNganh")
    })
};

// lấy điểm thi theo tài khoản
exports.layDiemThiTheoTaiKhoan = async(req, res) => {
    let user = await checkCookie(req.headers.cookie)
    console.log(user)

    if(user.kt){
        try{
            let cookies = cookie.parse(req.headers.cookie || '');
            let decoded = jwt.verify(cookies.token, jwtOptions.secretOrKey)
            let username = decoded.username

            DiemThi.aggregate([
                { $project: {
                        diem: 1,
                        mon: 1,
                        Phach: 1
                    } 
                },
                { 
                    $lookup: {from: "thisinhs", localField: "Phach", foreignField: "Phach", as: "thisinh"}
                },
                { $unwind: "$thisinh" },
                {
                    $project: {
                        usernamets: "$thisinh.usernamets",
                        diem: 1,
                        mon: 1,
                        Phach: 1,
                        maKhuVuc: "$thisinh.maKhuVuc",
                        maDoiTuong: "$thisinh.maDoiTuong"
                    } 
                },
                { $match: { usernamets: username } },
                {
                    $group : {
                        _id: {
                            "usernamets": "$usernamets", 
                            "maKhuVuc": "$maKhuVuc",
                            "maDoiTuong": "$maDoiTuong"
                        },
                        diem: { $sum: "$diem" }
                    }
                },
                {
                    $project : {
                        _id: 0,
                        usernamets: "$_id.usernamets",
                        maKhuVuc: "$_id.maKhuVuc",
                        maDoiTuong: "$_id.maDoiTuong",
                        diem: { $sum: "$diem" }
                    }
                },
                { 
                    $lookup: {from: "thisinhnhaps", localField: "usernamets", foreignField: "usernamets", as: "thisinhnhap"}
                },
                { $unwind: "$thisinhnhap" },
                {
                    $project: {
                        usernamets: 1,
                        diem: 1,
                        maKhuVuc: 1,
                        maDoiTuong: 1,
                        tenKhoi: "$thisinhnhap.tenKhoi",
                        maNganh: "$thisinhnhap.maNganh"
                    } 
                },
                { 
                    $lookup: {
                        from: "nganhkhois", 
                        let: { order_maNganh: "$maNganh", order_tenKhoi: "$tenKhoi" },
                        pipeline: [
                            { $match:
                               { $expr:
                                  { $and:
                                     [
                                       { $eq: [ "$maNganh",  "$$order_maNganh" ] },
                                       { $eq: [ "$tenKhoi", "$$order_tenKhoi" ] }
                                     ]
                                  }
                               }
                            },
                        ],
                        as: "nganhkhoi"
                    }
                },
                { $unwind: "$nganhkhoi" },
                {
                    $project: {
                        usernamets: 1,
                        diem: 1,
                        tenKhoi: 1,
                        maNganh: 1,
                        maKhuVuc: 1,
                        maDoiTuong: 1,
                        diemChuan: "$nganhkhoi.diemChuan"
                    } 
                },
                { 
                    $lookup: {from: "khuvucs", localField: "maKhuVuc", foreignField: "maKhuVuc", as: "khuvuc"}
                },
                { $unwind: "$khuvuc" },
                {
                    $project: {
                        usernamets: 1,
                        diem: 1,
                        tenKhoi: 1,
                        maNganh: 1,
                        diemCongKhuVuc: "$khuvuc.diemCong",
                        maDoiTuong: 1,
                        diemChuan: 1
                    } 
                },
                { 
                    $lookup: {from: "doituongs", localField: "maDoiTuong", foreignField: "maDoiTuong", as: "doituong"}
                },
                { $unwind: "$doituong" },
                {
                    $project: {
                        usernamets: 1,
                        diem: 1,
                        tenKhoi: 1,
                        maNganh: 1,
                        diemCongKhuVuc: 1,
                        diemCongDoiTuong: "$doituong.diemCong",
                        diemChuan: 1
                    } 
                },
                {
                    $project: {
                        usernamets: 1,
                        diem: { $sum: [ "$diem", "$diemCongKhuVuc", "$diemCongDoiTuong" ] },
                        tenKhoi: 1,
                        maNganh: 1,
                        diemCongKhuVuc: 1,
                        diemCongDoiTuong: 1,
                        diemChuan: 1
                    } 
                },
                {
                    $project: {
                        usernamets: 1,
                        diem: 1,
                        tenKhoi: 1,
                        maNganh: 1,
                        diemChuan: 1,
                        diemCongDoiTuong: 1,
                        diemCongKhuVuc: 1,
                        thiDau: { $cond: { if: { $gte: [ "$diem", "$diemChuan" ] }, then: 1, else: 0 } }
                    } 
                }
            ])
            .then((result) => {
                res.send(result)
            })
            .catch((err) => {
                res.send({message: "Lỗi lây môn thi theo tài khoản!"})
                console.log(err, "layDiemThiTheoTaiKhoan")
            })       
        }catch(err){
            console.log(err)
            res.send({message: "error cookie"})
        }
    }else{
        res.send({message: "error cookie"})
    }
};

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