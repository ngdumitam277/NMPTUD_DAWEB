const Khoi = require('../models/khoi.model.js');
const moment = require('moment');

// tạo khối
exports.taoKhoi = async(req, res) => {
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let diemTBkhoi = Number(req.body.diemTBkhoi)
    let slThiSinh = Number(req.body.slThiSinh)
    let key = req.body.key ? req.body.key : ""

    try{
        if(tenKhoi !== "" && !isNaN(diemTBkhoi) && !isNaN(slThiSinh)){
            let exist = await Khoi.find({tenKhoi: tenKhoi})
            if(exist.length > 0){
                res.send({message: "Khối đã tồn tại!"})
            }else{
                const khoi = new Khoi({
                    tenKhoi: tenKhoi,
                    diemTBkhoi: diemTBkhoi,
                    slThiSinh: slThiSinh,
                    key: key
                })
            
                khoi.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoKhoi", err)
                    res.send({message: "Lỗi tạo khối"})
                })
            }
        }else{
            console.log("taoKhoi", "tenKhoi không được rỗng!")
            res.send({message: "tenKhoi không được rỗng!"})
        }
    }catch(err){
        console.log("taoKhoi", err)
        res.send({message: "Lỗi tạo khối"})
    }
};

// lấy tất cả khối
exports.getAllKhoi = async(req, res) => {
    Khoi.find({}, {createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả các khối!"})
        console.log(err, "getAllKhoi")
    })
};

// sửa 1 khối theo key
exports.updateKhoi = async(req, res) => {
    let id = req.params.id
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let diemTBkhoi = req.body.diemTBkhoi ? Number(req.body.diemTBkhoi) : 0
    let slThiSinh = req.body.slThiSinh ? Number(req.body.slThiSinh) : 0
    let key = req.body.key ? req.body.key : ""

    let exist = await Khoi.findOne({tenKhoi: tenKhoi})
    if(exist && exist._id !== id){
        res.send({message: "Khối đã tồn tại!"})
    }else{
        Khoi.findOneAndUpdate({_id: id}, {
            tenKhoi: tenKhoi,
            diemTBkhoi: diemTBkhoi,
            slThiSinh: slThiSinh,
            key: key
        }, {new: true})
        .then((result) => {
            res.send({message: "ok"})
        })
        .catch((err) => {
            res.send({message: "Lỗi sửa khối theo key!"})
            console.log(err, "updateKhoi")
        })
    }
};

// xoá 1 khối theo key
exports.deleteKhoi = async(req, res) => {
    let key = req.params.key

    Khoi.findOneAndRemove({key: key}, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá khối theo key!"})
        console.log(err, "deleteKhoi")
    })
};