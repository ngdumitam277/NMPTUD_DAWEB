const DiemThi = require('../models/diemThi.model.js');
const moment = require('moment');

// tạo điểm thi
exports.taoDiemThi = async(req, res) => {
    let maDiem = req.body.maDiem ? req.body.maDiem : ""
    let mon = req.body.mon ? req.body.mon : ""
    let diem = Number(req.body.diem)
    let phach = Number(req.body.phach)

    try{
        if(maDiem !== "" && !isNaN(diem) && !isNaN(phach)){
            let exist = await DiemThi.find({maDiem: maDiem})
            if(exist.length > 0){
                res.send({message: "Điểm thi đã tồn tại!"})
            }
    
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
        }else{
            console.log("taoDiemThi", "maDiem không được rỗng!")
            res.send({message: "maDiem không được rỗng!"})
        }
    }catch(err){
        console.log("taoDiemThi", err)
        res.send({message: "Lỗi tạo điểm thi"})
    }
};

// lấy tất cả điểm thi
exports.getAllDiemThi = async(req, res) => {
    DiemThi.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả các điểm thi!"})
        console.log(err, "getAllDiemThi")
    })
};

// sửa 1 điểm thi theo mã điểm
exports.updateDiemThi = async(req, res) => {
    let maDiem = req.params.maDiem
    let body = req.body

    DiemThi.findOneAndUpdate({maDiem: maDiem}, body, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa điểm thi theo key!"})
        console.log(err, "updateDiemThi")
    })
};

// xoá 1 điểm thi theo mã điểm
exports.deleteDiemThi = async(req, res) => {
    let maDiem = req.params.maDiem

    DiemThi.findOneAndRemove({maDiem: maDiem}, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá điểm thi theo key!"})
        console.log(err, "deleteDiemThi")
    })
};