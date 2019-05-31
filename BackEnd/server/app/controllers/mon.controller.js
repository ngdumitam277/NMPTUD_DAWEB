const Mon = require('../models/mon.model.js');
const moment = require('moment');

// tạo môn thi
exports.taoMon = async(req, res) => {
    let tenMon = req.body.tenMon ? req.body.tenMon : ""
    let phongThi = req.body.phongThi ? req.body.phongThi : ""
    let tgThi = req.body.tgThi ? moment(req.body.tgThi, "YYYY-MM-DD HH:mm:ss").toISOString() : ""
    let gioThi = req.body.gioThi ? req.body.gioThi : ""
    let diemTBmon = req.body.diemTBmon ? Number(req.body.diemTBmon) : 0
    let key = req.body.key ? req.body.key : ""

    try{
        if(tenMon !== "" && !isNaN(diemTBmon)){
            let exist = await Mon.find({tenMon: tenMon})
            if(exist.length > 0){
                res.send({message: "Môn thi đã tồn tại!"})
            }else{
                const mon = new Mon({
                    tenMon: tenMon,
                    diemTBmon: diemTBmon,
                    phongThi: phongThi,
                    tgThi: tgThi,
                    key: key,
                    gioThi: gioThi
                })
            
                mon.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoMon", err)
                    res.send({message: "Lỗi tạo môn thi"})
                })
            }
        }else{
            console.log("taoMon", "tenMon không được rỗng!")
            res.send({message: "tenMon không được rỗng!"})
        }
    }catch(err){
        console.log("taoMon", err)
        res.send({message: "Lỗi tạo môn thi"})
    }
};

// lấy tất cả môn thi
exports.getAllMon = async(req, res) => {
    Mon.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả các môn thi!"})
        console.log(err, "getAllMon")
    })
};

// sửa 1 môn theo key
exports.updateMon = async(req, res) => {
    let key = req.params.key
    let body = req.body

    Mon.findOneAndUpdate({key: key}, body, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa môn theo key!"})
        console.log(err, "updateMon")
    })
};

// xoá 1 môn theo key
exports.deleteMon = async(req, res) => {
    let key = req.params.key

    Mon.findOneAndRemove({key: key}, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá môn theo key!"})
        console.log(err, "deleteMon")
    })
};