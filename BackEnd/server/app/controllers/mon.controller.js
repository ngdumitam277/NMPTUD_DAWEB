const Mon = require('../models/mon.model.js');
const moment = require('moment');

// tạo môn thi
exports.taoMon = async(req, res) => {
    let tenMon = req.body.tenMon ? req.body.tenMon : ""
    let phongThi = req.body.phongThi ? req.body.phongThi : ""
    let tgThi = req.body.tgThi ? moment(req.body.tgThi, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let diemTBmon = Number(req.body.diemTBmon)

    try{
        if(tenMon !== "" && !isNaN(diemTBmon)){
            let exist = await Mon.find({tenMon: tenMon})
            if(exist.length > 0){
                res.send({message: "Môn thi đã tồn tại!"})
            }
    
            const mon = new Mon({
                tenMon: tenMon,
                diemTBmon: diemTBmon,
                phongThi: phongThi,
                tgThi: tgThi
            })
        
            mon.save()
            .then((result) => {
                res.send({message: "ok"});
            }).catch(err => {
                console.log("taoMon", err)
                res.send({message: "Lỗi tạo môn thi"})
            })
        }else{
            console.log("taoMon", "tenMon không được rỗng!")
            res.send({message: "tenMon không được rỗng!"})
        }
    }catch(err){
        console.log("taoMon", err)
        res.send({message: "Lỗi tạo môn thi"})
    }
};

// lấy tất cả môn thi
exports.getAllMon = async(req, res) => {
    Mon.find({}, {_id: 0, createdAt: 0, updatedAt: 0, __v: 0})
    .then((result) => {
        res.send(result)
    })
    .catch((err) => {
        console.log(err, "getAllMon")
    })
};