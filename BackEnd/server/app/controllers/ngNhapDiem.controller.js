const ngNhapDiem = require('../models/ngNhapDiem.model.js');
const moment = require('moment');

// tạo người nhập điểm
exports.taoNguoiNhapDiem = async(req, res) => {
    let usernameNgNhapDiem = req.body.usernameNgNhapDiem ? req.body.usernameNgNhapDiem : ""
    let maDiem = req.body.maDiem ? req.body.maDiem : ""
    let tgNhap = req.body.tgNhap ? moment(req.body.tgNhap, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let diemLog = req.body.diemLog ? req.body.diemLog : ""

    try{
        if(usernameNgNhapDiem !== ""){
            let exist = await ngNhapDiem.find({usernameNgNhapDiem: usernameNgNhapDiem})
            if(exist.length > 0){
                res.send({message: "Người nhập điểm đã tồn tại!"})
            }else{
                const ngNhap = new ngNhapDiem({
                    usernameNgNhapDiem: usernameNgNhapDiem,
                    maDiem: maDiem,
                    tgNhap: tgNhap,
                    diemLog: diemLog
                })
            
                ngNhap.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoNguoiNhapDiem", err)
                    res.send({message: "Lỗi tạo người nhập điểm"})
                })
            }
        }else{
            console.log("taoNguoiNhapDiem", "usernameNgNhapDiem không được rỗng!")
            res.send({message: "usernameNgNhapDiem không được rỗng!"})
        }
    }catch(err){
        console.log("taoNguoiNhapDiem", err)
        res.send({message: "Lỗi tạo người nhập điểm"})
    }
};