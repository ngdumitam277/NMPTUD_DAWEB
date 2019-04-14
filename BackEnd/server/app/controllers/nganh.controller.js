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
                res.send({message: "Tạo ngành thành công!"});
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