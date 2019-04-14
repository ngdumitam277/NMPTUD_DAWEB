const DiemThi = require('../models/diemThi.model.js');
const moment = require('moment');

// tạo điểm thi
exports.taoDiemThi = async(req, res) => {
    let maDiem = req.body.maDiem ? req.body.maDiem : ""
    let mon = req.body.mon ? req.body.mon : ""
    let diem = Number(req.body.diem)
    let phach = Number(req.body.phach)

    if(maDiem !== "" && !isNaN(diem) && !isNaN(phach)){
        let user = await DiemThi.find({maDiem: maDiem})
        if(user.length > 0){
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
            res.send({message: "Tạo điểm thi thành công!"});
        }).catch(err => {
            console.log("taoDiemThi", err)
            res.send({message: "Lỗi tạo điểm thi"})
        })
    }else{
        console.log("taoDiemThi", "maDiem không được rỗng!")
        res.send({message: "maDiem không được rỗng!"})
    }
};