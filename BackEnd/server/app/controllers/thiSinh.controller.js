const ThiSinh = require('../models/thiSinh.model.js');
const moment = require('moment');

// tạo thí sinh
exports.taoThiSinh = async(req, res) => {
    let usernamets = req.body.usernamets ? req.body.usernamets : ""
    let SBD = req.body.SBD ? req.body.SBD : ""
    let tenTHPT = req.body.tenTHPT ? req.body.tenTHPT : ""
    let namTotNghiep = req.body.namTotNghiep ? req.body.namTotNghiep : ""
    let anhMinhChung = req.body.anhMinhChung ? req.body.anhMinhChung : ""
    let ttTuyenSinh = Number(req.body.ttTuyenSinh)
    let Phach = Number(req.body.Phach)
    let maKhuVuc = req.body.maKhuVuc ? req.body.maKhuVuc : ""
    let maDoiTuong = req.body.maDoiTuong ? req.body.maDoiTuong : ""

    try{
        if(usernamets !== "" && !isNaN(ttTuyenSinh) && !isNaN(Phach)){
            let exist = await ThiSinh.find({usernamets: usernamets})
            if(exist.length > 0){
                res.send({message: "Thí sinh đã tồn tại!"})
            }
    
            const thisinh = new ThiSinh({
                usernamets: usernamets,
                SBD: SBD,
                tenTHPT: tenTHPT,
                namTotNghiep: namTotNghiep,
                anhMinhChung: anhMinhChung,
                ttTuyenSinh: ttTuyenSinh,
                Phach: Phach,
                maKhuVuc: maKhuVuc,
                maDoiTuong: maDoiTuong
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
    }catch(err){
        console.log("taoThiSinh", err)
        res.send({message: "Lỗi tạo thí sinh"})
    }
};