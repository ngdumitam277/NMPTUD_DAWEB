const Nganh = require('../models/nganh.model.js');
const moment = require('moment');

// tạo ngành
exports.taoNganh = async(req, res) => {
    let maNganh = req.body.maNganh ? req.body.maNganh : ""
    let chiTieuNganh = Number(req.body.chiTieuNganh)
    let thongTin = req.body.thongTin ? req.body.thongTin : ""

    try{
        if(maNganh !== "" && !isNaN(chiTieuNganh)){
            let exist = await Nganh.find({maNganh: maNganh})
            if(exist.length > 0){
                res.send({message: "Ngành đã tồn tại!"})
            }
    
            const nganh = new Nganh({
                maNganh: maNganh,
                chiTieuNganh: chiTieuNganh,
                thongTin: thongTin
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
    Nganh.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0})
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

    Nganh.findOneAndUpdate({key: key}, body, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa ngành theo key!"})
        console.log(err, "updateNganh")
    })
};