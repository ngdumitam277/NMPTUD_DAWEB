const KhuVuc = require('../models/khuVuc.model.js');
const moment = require('moment');

// tạo khu vực
exports.taoKhuVuc = async(req, res) => {
    let maKhuVuc = req.body.maKhuVuc ? req.body.maKhuVuc : ""
    let diemCong = Number(req.body.diemCong)

    try{
        if(maKhuVuc !== "" && !isNaN(diemCong)){
            let exist = await KhuVuc.find({maKhuVuc: maKhuVuc})
            if(exist.length > 0){
                res.send({message: "Khu vực đã tồn tại!"})
            }
    
            const khuvuc = new KhuVuc({
                maKhuVuc: maKhuVuc,
                diemCong: diemCong
            })
        
            khuvuc.save()
            .then((result) => {
                res.send({message: "ok"});
            }).catch(err => {
                console.log("taoKhuVuc", err)
                res.send({message: "Lỗi tạo khu vực"})
            })
        }else{
            console.log("taoKhuVuc", "maKhuVuc không được rỗng!")
            res.send({message: "maKhuVuc không được rỗng!"})
        }
    }catch(err){
        console.log("taoKhuVuc", err)
        res.send({message: "Lỗi tạo khu vực"})
    }
};

// lấy tất cả khu vực
exports.getAllKhuVuc = async(req, res) => {
    KhuVuc.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả các khu vực!"})
        console.log(err, "getAllKhuVuc")
    })
};

// sửa 1 khu vực theo mã khu vực
exports.updateKhuVuc = async(req, res) => {
    let maKhuVuc = req.params.maKhuVuc
    let body = req.body

    KhuVuc.findOneAndUpdate({maKhuVuc: maKhuVuc}, body, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa khu vực theo key!"})
        console.log(err, "updateKhuVuc")
    })
};

// xoá 1 khu vực theo mã khu vực
exports.deleteKhuVuc = async(req, res) => {
    let maKhuVuc = req.params.maKhuVuc

    KhuVuc.findOneAndRemove({maKhuVuc: maKhuVuc}, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá khu vực theo key!"})
        console.log(err, "deleteKhuVuc")
    })
};