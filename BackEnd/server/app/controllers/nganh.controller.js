const Nganh = require('../models/nganh.model.js');
const moment = require('moment');
const NganhKhoi = require('../models/nganhKhoi.model.js');

// tạo ngành
exports.taoNganh = async(req, res) => {
    let maNganh = req.body.maNganh ? req.body.maNganh : ""
    let chiTieuNganh = Number(req.body.chiTieuNganh)
    let thongTin = req.body.thongTin ? req.body.thongTin : ""
    let key = req.body.key ? req.body.key : ""

    try{
        if(maNganh !== "" && !isNaN(chiTieuNganh)){
            let exist = await Nganh.find({maNganh: maNganh})
            if(exist.length > 0){
                res.send({message: "Ngành đã tồn tại!"})
            }
    
            const nganh = new Nganh({
                maNganh: maNganh,
                chiTieuNganh: chiTieuNganh,
                thongTin: thongTin,
                key: key
            })
        
            nganh.save()
            .then((result) => {
                res.send({message: "ok"});
            }).catch(err => {
                console.log("taoNganh", err)
                res.send({message: "Lỗi tạo ngành"})
            })
        }else{
            console.log("taoNganh", "maNganh không được rỗng!")
            res.send({message: "maNganh không được rỗng!"})
        }
    }catch(err){
        console.log("taoNganh", err)
        res.send({message: "Lỗi tạo ngành"})
    }
};

// lấy tất cả ngành
exports.getAllNganh = async(req, res) => {
    Nganh.aggregate([
        {$lookup: {from: "nganhkhois", localField: "maNganh", foreignField: "maNganh", as: "khoi"}},
        {$project: { 
            _id: 0, 
            __v: 0, 
            createdAt: 0, 
            updatedAt: 0,
            "khoi._id": 0,
            "khoi.maNganh": 0,
            "khoi.createdAt": 0,
            "khoi.updatedAt": 0,
            "khoi.__v": 0
        }}
    ])
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả ngành!"})
        console.log(err, "getAllNganh")
    })
};

// sửa 1 ngành theo key
exports.updateNganh = async(req, res) => {
    let key = req.params.key
    let body = req.body
    let maNganh = req.body.maNganh ? req.body.maNganh : ""

    let exist = await Nganh.find({maNganh: maNganh})
    if(exist.length > 0){
        res.send({message: "Ngành đã tồn tại!"})
    }

    Nganh.findOneAndUpdate({key: key}, body, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa ngành theo key!"})
        console.log(err, "updateNganh")
    })
};

// xoá 1 ngành theo key
exports.deleteNganh = async(req, res) => {
    let key = req.params.key

    Nganh.findOneAndRemove({key: key}, {rawResult: true})
    .then((result) => {
        let maNganh = result.maNganh
        NganhKhoi.remove({maNganh: maNganh})
        .then((result) => {
            res.send({message: "ok"})
        })
        .catch((err) => {
            res.send({message: "Lỗi xoá ngành theo key!"})
            console.log(err, "deleteNganh")
        })
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá ngành theo key!"})
        console.log(err, "deleteNganh")
    })
};