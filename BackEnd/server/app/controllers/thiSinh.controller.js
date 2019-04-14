const ThiSinh = require('../models/thiSinh.model.js');
const moment = require('moment');

// tạo thi sinh
exports.taoThiSinh = async(req, res) => {
    let usernamets = req.body.usernamets ? req.body.usernamets : ""
    let maNganh = req.body.maNganh ? req.body.maNganh : ""
    let tenKhoi = req.body.tenKhoi ? req.body.tenKhoi : ""
    let diemTBthi = Number(req.body.diemTBthi)
    let diemCong = Number(req.body.diemCong)
    let tinhTrang = Number(req.body.tinhTrang)

    if(usernamets !== "" && !isNaN(diemTBthi) && !isNaN(diemCong) && !isNaN(tinhTrang)){
        let user = await ThiSinh.find({usernamets: usernamets})
        if(user.length > 0){
            res.send({message: "Thí sinh đã tồn tại!"})
        }

        const thisinh = new ThiSinh({
            usernamets: usernamets,
            maNganh: maNganh,
            tenKhoi: tenKhoi,
            diemTBthi: diemTBthi,
            diemCong: diemCong,
            tinhTrang: tinhTrang
        })
    
        thisinh.save()
        .then((result) => {
            res.send({message: "Tạo thí sinh thành công!"});
        }).catch(err => {
            console.log("taoThiSinh", err)
            res.send({message: "Lỗi tạo thí sinh"})
        })
    }else{
        console.log("taoThiSinh", "usernamets không được rỗng!")
        res.send({message: "usernamets không được rỗng!"})
    }
};