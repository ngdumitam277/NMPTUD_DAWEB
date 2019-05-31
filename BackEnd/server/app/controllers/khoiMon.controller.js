const KhoiMon = require('../models/khoiMon.model.js');
const moment = require('moment');

// tạo khối môn
exports.taoKhoiMon = async(req, res) => {
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let tenMon = req.body.tenMon ? req.body.tenMon : ""
    let keyMon = req.body.keyMon ? req.body.keyMon : ""

    try{
        if(tenKhoi !== "" && tenMon !== ""){
            let exist = await KhoiMon.find({tenKhoi: tenKhoi, keyMon: keyMon})
            if(exist.length > 0){
                res.send({message: "Môn đã tồn tại!"})
            }else{
                const khoimon = new KhoiMon({
                    tenKhoi: tenKhoi,
                    tenMon: tenMon,
                    keyMon: keyMon
                })
            
                khoimon.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoKhoiMon", err)
                    res.send({message: "Lỗi tạo khối môn"})
                })
            }
        }else{
            console.log("taoKhoiMon", "tenKhoi không được rỗng!")
            res.send({message: "tenKhoi không được rỗng!"})
        }
    }catch(err){
        console.log("taoKhoiMon", err)
        res.send({message: "Lỗi tạo khối môn"})
    }
};

// tạo nhiêu khối môn
exports.taoNhieuKhoiMon = async(req, res) => {
    let dataMon = req.body.dataMon ? req.body.dataMon : ""

    KhoiMon.insertMany(dataMon)
    .then((result) => {
        res.send({message: "ok"});
    })
    .catch(err => {
        console.log("taoNhieuKhoiMon", err)
        res.send({message: "Lỗi tạo khối môn"})
    })
};

// sửa nhiêu khối môn
exports.suaNhieuKhoiMon = async(req, res) => {
    let tenKhoiBefore = req.body.tenKhoiBefore ? req.body.tenKhoiBefore : ""
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""

    KhoiMon.update({tenKhoi: tenKhoiBefore}, {$set: {tenKhoi: tenKhoi}}, {multi: true})
    .then((result) => {
        res.send({message: "ok"});
    })
    .catch(err => {
        console.log("suaNhieuKhoiMon", err)
        res.send({message: "Lỗi sửa khối môn"})
    })
};

// xoá nhiêu khối môn
exports.xoaNhieuKhoiMon = async(req, res) => {
    let tenKhoi = req.params.tenKhoi ? req.params.tenKhoi : ""

    KhoiMon.remove({tenKhoi: tenKhoi})
    .then((result) => {
        res.send({message: "ok"});
    })
    .catch(err => {
        console.log("xoaNhieuKhoiMon", err)
        res.send({message: "Lỗi xoá khối môn"})
    })
};

// sửa 1 khối môn
exports.updateKhoiMon = async(req, res) => {
    let id = req.params.id ? req.params.id : ""
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let tenMon = req.body.tenMon ? req.body.tenMon : ""
    let keyMon = req.body.keyMon ? req.body.keyMon : ""

    let exist = await KhoiMon.findOne({tenKhoi: tenKhoi, keyMon: keyMon})
    if(exist && exist._id !== id){
        res.send({message: "Môn đã tồn tại!"})
    }else{
        KhoiMon.findOneAndUpdate({_id: id}, {
            tenKhoi: tenKhoi,
            tenMon: tenMon,
            keyMon: keyMon
        })
        .then((result) => {
            res.send({message: "ok"});
        })
        .catch(err => {
            console.log("taoNhieuKhoiMon", err)
            res.send({message: "Lỗi tạo khối môn"})
        })
    }
};

// xoá 1 khôi môn
exports.deleteOneKhoiMon = async(req, res) => {
    let keyMon = req.params.keyMon ? req.params.keyMon : ""
    let tenKhoi = req.params.tenKhoi ? req.params.tenKhoi : ""

    KhoiMon.findOneAndRemove({keyMon: keyMon, tenKhoi: tenKhoi})
    .then((result) => {
        res.send({message: "ok"});
    })
    .catch(err => {
        console.log("deleteOneKhoiMon", err)
        res.send({message: "Lỗi xoá khối môn"})
    })
};

// lây tât cả môn của 1 khôi
exports.getMonOfKhoi = async(req, res) => {
    let tenKhoi = req.params.tenKhoi 

    KhoiMon.find({tenKhoi: tenKhoi})
    .then((result) => {
        res.send(result);
    })
    .catch(err => {
        console.log("getMonOfKhoi", err)
        res.send({message: "Lỗi lây tât cả môn của 1 khôi!!!"})
    })
};