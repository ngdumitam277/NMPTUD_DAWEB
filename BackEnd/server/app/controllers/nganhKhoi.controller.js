const NganhKhoi = require('../models/nganhKhoi.model.js');
const moment = require('moment');

// tạo ngành khối
exports.taoNganhKhoi = async(req, res) => {
    let maNganh = req.body.maNganh ? req.body.maNganh : ""
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let diemChuan = Number(req.body.diemChuan)
    let slTSthiNganhKhoi = Number(req.body.slTSthiNganhKhoi)

    try{
        if(maNganh !== "" && !isNaN(diemChuan) && !isNaN(slTSthiNganhKhoi)){
            let exist = await NganhKhoi.find({tenKhoi: tenKhoi, maNganh: maNganh})
            if(exist.length > 0){
                res.send({message: "Khối đã tồn tại!"})
            }else{
                const nganh = new NganhKhoi({
                    maNganh: maNganh,
                    tenKhoi: tenKhoi,
                    diemChuan: diemChuan,
                    slTSthiNganhKhoi: slTSthiNganhKhoi
                })
            
                nganh.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoNganhKhoi", err)
                    res.send({message: "Lỗi tạo ngành khối"})
                })
            }
        }else{
            console.log("taoNganhKhoi", "maNganh không được rỗng!")
            res.send({message: "maNganh không được rỗng!"})
        }
    }catch(err){
        console.log("taoNganhKhoi", err)
        res.send({message: "Lỗi tạo ngành khối"})
    }
};

// tạo ngành khối
exports.getAllNganhKhoi = async(req, res) => {
    NganhKhoi.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0, diemChuan: 0, slTSthiNganhKhoi: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        res.send({message: "Lỗi lấy tất cả các ngành khối!"})
        console.log(err, "getAllNganhKhoi")
    })
};

// sửa 1 ngành khối theo key ngành và tên khối
exports.updateNganhKhoi = async(req, res) => {
    let maNganh = req.params.maNganh
    let tenKhoi = req.params.tenKhoi
    let diemChuan = Number(req.body.diemChuan) ? Number(req.body.diemChuan) : 0
    let slTSthiNganhKhoi = Number(req.body.diemChuan) ? Number(req.body.diemChuan) : 0

    NganhKhoi.findOneAndUpdate({maNganh: maNganh, tenKhoi: tenKhoi}, {
        diemChuan: diemChuan,
        slTSthiNganhKhoi: slTSthiNganhKhoi
    }, {new: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi sửa ngành khối theo key ngành và key khối!"})
        console.log(err, "updateNganhKhoi")
    })
};

// xoá 1 ngành khối theo key ngành và tên khối
exports.deleteNganhKhoi = async(req, res) => {
    let maNganh = req.params.maNganh
    let tenKhoi = req.params.tenKhoi

    NganhKhoi.findOneAndRemove({maNganh: maNganh, tenKhoi: tenKhoi}, {rawResult: true})
    .then((result) => {
        res.send({message: "ok"})
    })
    .catch((err) => {
        res.send({message: "Lỗi xoá ngành khối theo key ngành và key khối!"})
        console.log(err, "deleteNganhKhoi")
    })
};