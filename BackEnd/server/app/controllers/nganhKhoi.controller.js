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
        }else{
            console.log("taoNganhKhoi", "maNganh không được rỗng!")
            res.send({message: "maNganh không được rỗng!"})
        }
    }catch(err){
        console.log("taoNganhKhoi", err)
        res.send({message: "Lỗi tạo ngành khối"})
    }
};