const TaiKhoanLog = require('../models/taikhoanLog.model.js');
const moment = require('moment');

// tạo tài khoản log
exports.taoTaiKhoanLog = async(req, res) => {
    let username = req.body.username ? req.body.username : ""
    let tgSuaXoa = req.body.tgSuaXoa ? moment(req.body.tgSuaXoa, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let ttinLog = req.body.ttinLog ? req.body.ttinLog : ""

    try{
        if(username !== ""){
            let exist = await TaiKhoanLog.find({username: username})
            if(exist.length > 0){
                res.send({message: "Tài khoản log đã tồn tại!"})
            }
    
            const taikhoan = new TaiKhoanLog({
                username: username,
                tgSuaXoa: tgSuaXoa,
                ttinLog: ttinLog
            })
        
            taikhoan.save()
            .then((result) => {
                res.send({message: "Tạo tài khoản log thành công!"});
            }).catch(err => {
                console.log("taoTaiKhoanLog", err)
                res.send({message: "Lỗi tạo tài khoản log"})
            })
        }else{
            console.log("taoTaiKhoanLog", "username không được rỗng!")
            res.send({message: "Username không được rỗng!"})
        }
    }catch(err){
        console.log("taoTaiKhoanLog", err)
        res.send({message: "Lỗi tạo tài khoản log"})
    }
};