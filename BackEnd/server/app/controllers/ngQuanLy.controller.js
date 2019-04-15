const ngQuanLy = require('../models/ngQuanLy.model.js');
const moment = require('moment');

// tạo người quản lý
exports.taonguoiquanly = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let namTuyenSinh = req.body.namTuyenSinh ? req.body.namTuyenSinh : ""
    let tgNhanHoSo = req.body.tgNhanHoSo ? moment(req.body.tgNhanHoSo, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgKTnhanHoSo = req.body.tgKTnhanHoSo ? moment(req.body.tgKTnhanHoSo, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgCongBoKQ = req.body.tgCongBoKQ ? moment(req.body.tgCongBoKQ, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgKTcongBoKQ = req.body.tgKTcongBoKQ ? moment(req.body.tgKTcongBoKQ, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgPhucKhao = req.body.tgPhucKhao ? moment(req.body.tgPhucKhao, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgKTphucKhao = req.body.tgKTphucKhao ? moment(req.body.tgKTphucKhao, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let maXacThucCB = req.body.maXacThucCB ? req.body.maXacThucCB : ""

    try{
        if(username !== ""){
            let exist = await ngQuanLy.find({username: username})
            if(exist.length > 0){
                res.send({message: "Người quản lý đã tồn tại!"})
            }
    
            const quanly = new ngQuanLy({
                username: username,
                namTuyenSinh: namTuyenSinh,
                tgNhanHoSo: tgNhanHoSo,
                tgKTnhanHoSo: tgKTnhanHoSo,
                tgCongBoKQ: tgCongBoKQ,
                tgKTcongBoKQ: tgKTcongBoKQ,
                tgPhucKhao: tgPhucKhao,
                tgKTphucKhao: tgKTphucKhao,
                maXacThucCB: maXacThucCB
            })
        
            quanly.save()
            .then((result) => {
                res.send({message: "Tạo người quản lý thành công!"});
            }).catch(err => {
                console.log("taonguoiquanly", err)
                res.send({message: "Lỗi tạo người quản lý"})
            })
        }else{
            console.log("taonguoiquanly", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("taonguoiquanly", err)
        res.send({message: "Lỗi tạo người quản lý"})
    }
};

// lấy thời gian
exports.laythoigian = async(req, res) => {
    let tgHienTai = req.body.tgHienTai ? moment(req.body.tgHienTai, "DD-MM-YYYY HH:mm:ss").toDate() : ""
    let day = req.body.tgHienTai ? `${moment(req.body.tgHienTai, "DD-MM-YYYY HH:mm:ss").year()}` : ""

    try{
        if(day !== ""){
            ngQuanLy.aggregate([
                { $match : { namTuyenSinh : day } },
                { $project: {
                        tgNhanHoSo: { $divide: [ { $subtract: [ "$tgNhanHoSo", tgHienTai ] }, 1000*60*60*24 ] },
                        tgKTnhanHoSo: { $divide: [ { $subtract: [ "$tgKTnhanHoSo", tgHienTai ] }, 1000*60*60*24 ] },
                        tgCongBoKQ: { $divide: [ { $subtract: [ "$tgCongBoKQ", tgHienTai ] }, 1000*60*60*24 ] },
                        tgKTcongBoKQ: { $divide: [ { $subtract: [ "$tgKTcongBoKQ", tgHienTai ] }, 1000*60*60*24 ] },
                        tgPhucKhao: { $divide: [ { $subtract: [ "$tgPhucKhao", tgHienTai ] }, 1000*60*60*24 ] },
                        tgKTphucKhao: { $divide: [ { $subtract: [ "$tgKTphucKhao", tgHienTai ] }, 1000*60*60*24 ] }
                    } 
                }
            ])
            .then((result) => {
                res.send(result);
            }).catch(err => {
                console.log("laythoigian", err)
                res.send({message: "Lỗi lấy thời gian"})
            })
        }else{
            console.log("laythoigian", "ngày không được rỗng!")
            res.send({message: "Lỗi lấy thời gian"})
        }
    }catch(err){
        console.log("laythoigian", err)
        res.send({message: "Lỗi lấy thời gian"})
    }
};