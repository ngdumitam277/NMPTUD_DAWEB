const KhoiMon = require('../models/khoiMon.model.js');
const moment = require('moment');

// tạo khối môn
exports.taoKhoiMon = async(req, res) => {
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let tenMon = req.body.tenMon ? req.body.tenMon : ""

    try{
        if(tenKhoi !== "" && tenMon !== ""){
            let exist = await KhoiMon.find({tenKhoi: tenKhoi})
            if(exist.length > 0){
                res.send({message: "Khối đã tồn tại!"})
            }
    
            const khoimon = new KhoiMon({
                tenKhoi: tenKhoi,
                tenMon: tenMon
            })
        
            khoimon.save()
            .then((result) => {
                res.send({message: "Tạo khối môn thành công!"});
            }).catch(err => {
                console.log("taoKhoiMon", err)
                res.send({message: "Lỗi tạo khối môn"})
            })
        }else{
            console.log("taoKhoiMon", "tenKhoi không được rỗng!")
            res.send({message: "tenKhoi không được rỗng!"})
        }
    }catch(err){
        console.log("taoKhoiMon", err)
        res.send({message: "Lỗi tạo khối môn"})
    }
};