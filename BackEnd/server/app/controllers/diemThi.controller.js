const DiemThi = require('../models/diemThi.model.js');
const moment = require('moment');

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