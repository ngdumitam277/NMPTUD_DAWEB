const CanBo = require('../models/canbo.model.js');
const moment = require('moment');

// tạo cán bộ
exports.taoCanBo = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let chucVu = req.body.chucVu ? req.body.chucVu : ""
    let quyenHan = Number(req.body.quyenHan)

    try{
        if(username !== "" && !isNaN(quyenHan)){
            let exist = await CanBo.find({username: username})
            if(exist.length > 0){
                res.send({message: "Cán bộ đã tồn tại!"})
            }else{
                const canbo = new CanBo({
                    username: username,
                    chucVu: chucVu,
                    quyenHan: quyenHan
                })
            
                canbo.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoCanBo", err)
                    res.send({message: "Lỗi tạo cán bộ"})
                })
            }
        }else{
            console.log("taoCanBo", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("taoCanBo", err)
        res.send({message: "Lỗi tạo cán bộ"})
    }
};