const ngNhapData = require('../models/ngNhapData.model.js');
const moment = require('moment');

// tạo người nhập data
exports.taoNguoiNhapData = async(req, res) => {
    let usernameNgNhapData = req.body.usernameNgNhapData ? req.body.usernameNgNhapData : ""
    let usernamets = req.body.usernamets ? req.body.usernamets : ""
    let tgSuaThongTin = req.body.tgSuaThongTin ? moment(req.body.tgSuaThongTin, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgXacNhanTK = req.body.tgXacNhanTK ? moment(req.body.tgXacNhanTK, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgXoaTK = req.body.tgXoaTK ? moment(req.body.tgXoaTK, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let ttinSuaXoa = req.body.ttinSuaXoa ? req.body.ttinSuaXoa : ""

    if(usernameNgNhapData !== ""){
        let user = await ngNhapData.find({usernameNgNhapData: usernameNgNhapData})
        if(user.length > 0){
            res.send({message: "Người nhập data đã tồn tại!"})
        }

        const ngNhap = new ngNhapData({
            usernameNgNhapData: usernameNgNhapData,
            usernamets: usernamets,
            tgSuaThongTin: tgSuaThongTin,
            tgXacNhanTK: tgXacNhanTK,
            tgXoaTK: tgXoaTK,
            ttinSuaXoa: ttinSuaXoa
        })
    
        ngNhap.save()
        .then((result) => {
            res.send({message: "Tạo người nhập data thành công!"});
        }).catch(err => {
            console.log("taoNguoiNhapData", err)
            res.send({message: "Lỗi tạo người nhập data"})
        })
    }else{
        console.log("taoNguoiNhapData", "usernameNgNhapData không được rỗng!")
        res.send({message: "usernameNgNhapData không được rỗng!"})
    }
};