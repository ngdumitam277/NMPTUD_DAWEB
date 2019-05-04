const Khoi = require('../models/khoi.model.js');
const moment = require('moment');

// tạo khối
exports.taoKhoi = async(req, res) => {
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let diemTBkhoi = Number(req.body.diemTBkhoi)
    let slThiSinh = Number(req.body.slThiSinh)

    try{
        if(tenKhoi !== "" && !isNaN(diemTBkhoi) && !isNaN(slThiSinh)){
            let exist = await Khoi.find({tenKhoi: tenKhoi})
            if(exist.length > 0){
                res.send({message: "Khối đã tồn tại!"})
            }
    
            const khoi = new Khoi({
                tenKhoi: tenKhoi,
                diemTBkhoi: diemTBkhoi,
                slThiSinh: slThiSinh
            })
        
            khoi.save()
            .then((result) => {
                res.send({message: "ok"});
            }).catch(err => {
                console.log("taoKhoi", err)
                res.send({message: "Lỗi tạo khối"})
            })
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
    Khoi.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err, "getAllKhoi")
    })
};