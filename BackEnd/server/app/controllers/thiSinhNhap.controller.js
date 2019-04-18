const ThiSinhNhap = require('../models/thiSinhNhap.model.js');
const moment = require('moment');

// tạo thí sinh
exports.taoThiSinh = async(req, res) => {
    let usernamets = req.body.usernamets ? req.body.usernamets : ""
    let maNganh = req.body.maNganh ? req.body.maNganh : ""
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let diemTBthi = Number(req.body.diemTBthi)
    let diemCong = Number(req.body.diemCong)
    let diemTB = Number(req.body.diemTB)
    let tinhTrang = Number(req.body.tinhTrang)

    try{
        if(usernamets !== "" && !isNaN(diemTBthi) && !isNaN(diemCong) && !isNaN(tinhTrang) && !isNaN(diemTB)){
            let exist = await ThiSinhNhap.find({usernamets: usernamets})
            if(exist.length > 0){
                res.send({message: "Thí sinh đã tồn tại!"})
            }
    
            const thisinh = new ThiSinhNhap({
                usernamets: usernamets,
                maNganh: maNganh,
                tenKhoi: tenKhoi,
                diemTBthi: diemTBthi,
                diemCong: diemCong,
                tinhTrang: tinhTrang,
                diemTB: diemTB
            })
        
            thisinh.save()
            .then((result) => {
                res.send({message: "ok"});
            }).catch(err => {
                console.log("taoThiSinh", err)
                res.send({message: "Lỗi tạo thí sinh"})
            })
        }else{
            console.log("taoThiSinh", "usernamets không được rỗng!")
            res.send({message: "usernamets không được rỗng!"})
        }
    }catch(err){
        console.log("taoThiSinh", err)
        res.send({message: "Lỗi tạo thí sinh"})
    }
};