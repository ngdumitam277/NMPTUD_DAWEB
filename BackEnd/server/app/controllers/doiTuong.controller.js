const DoiTuong = require('../models/doiTuong.model.js');
const moment = require('moment');

// tạo đối tượng
exports.taoDoiTuong = async(req, res) => {
    let maDoiTuong = req.body.maDoiTuong ? req.body.maDoiTuong : ""
    let diemCong = Number(req.body.diemCong)

    try{
        if(maDoiTuong !== "" && !isNaN(diemCong)){
            let exist = await DoiTuong.find({maDoiTuong: maDoiTuong})
            if(exist.length > 0){
                res.send({message: "Đối tượng đã tồn tại!"})
            }else{
                const doituong = new DoiTuong({
                    maDoiTuong: maDoiTuong,
                    diemCong: diemCong
                })
            
                doituong.save()
                .then((result) => {
                    res.send({message: "ok"});
                }).catch(err => {
                    console.log("taoDoiTuong", err)
                    res.send({message: "Lỗi tạo đối tượng"})
                })
            }
        }else{
            console.log("taoDoiTuong", "maDoiTuong không được rỗng!")
            res.send({message: "maDoiTuong không được rỗng!"})
        }
    }catch(err){
        console.log("taoDoiTuong", err)
        res.send({message: "Lỗi tạo đối tượng"})
    }
};