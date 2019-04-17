const KhuVuc = require('../models/khuVuc.model.js');
const moment = require('moment');

// tạo khu vực
exports.taoKhuVuc = async(req, res) => {
    let maKhuVuc = req.body.maKhuVuc ? req.body.maKhuVuc : ""
    let diemCong = Number(req.body.diemCong)

    try{
        if(maKhuVuc !== "" && !isNaN(diemCong)){
            let exist = await KhuVuc.find({maKhuVuc: maKhuVuc})
            if(exist.length > 0){
                res.send({message: "Khu vực đã tồn tại!"})
            }
    
            const khuvuc = new KhuVuc({
                maKhuVuc: maKhuVuc,
                diemCong: diemCong
            })
        
            khuvuc.save()
            .then((result) => {
                res.send({message: "ok"});
            }).catch(err => {
                console.log("taoKhuVuc", err)
                res.send({message: "Lỗi tạo khu vực"})
            })
        }else{
            console.log("taoKhuVuc", "maKhuVuc không được rỗng!")
            res.send({message: "maKhuVuc không được rỗng!"})
        }
    }catch(err){
        console.log("taoKhuVuc", err)
        res.send({message: "Lỗi tạo khu vực"})
    }
};