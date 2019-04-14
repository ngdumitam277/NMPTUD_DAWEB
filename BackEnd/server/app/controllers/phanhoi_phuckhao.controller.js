const PhanHoi = require('../models/phanhoi_phuckhao.model.js');
const moment = require('moment');

// tạo phản hồi
exports.taoPhanHoi = async(req, res) => {
    let maPH = req.body.maPH ? req.body.maPH : ""
    let usernamecb = req.body.usernamecb ? req.body.usernamecb : ""
    let usernamets = req.body.usernamets ? req.body.usernamets : ""
    let noidungTSchat = req.body.noidungTSchat ? req.body.noidungTSchat : ""
    let noidungNgNhapDataChat = req.body.noidungNgNhapDataChat ? req.body.noidungNgNhapDataChat : ""
    let anhMinhChung = req.body.anhMinhChung ? req.body.anhMinhChung : ""
    let trangThai = Number(req.body.trangThai)
    let tgTSnhap = req.body.tgTSnhap ? moment(req.body.tgTSnhap, "DD-MM-YYYY HH:mm:ss").toISOString() : ""
    let tgNgNhapDataNhap = req.body.tgNgNhapDataNhap ? moment(req.body.tgNgNhapDataNhap, "DD-MM-YYYY HH:mm:ss").toISOString() : ""

    if(maPH !== "" && !isNaN(trangThai)){
        let user = await PhanHoi.find({maPH: maPH})
        if(user.length > 0){
            res.send({message: "Phản hồi đã tồn tại!"})
        }

        const phanhoi = new PhanHoi({
            maPH: maPH,
            usernamecb: usernamecb,
            usernamets: usernamets,
            noidungTSchat: noidungTSchat,
            noidungNgNhapDataChat: noidungNgNhapDataChat,
            anhMinhChung: anhMinhChung,
            trangThai: trangThai,
            tgTSnhap: tgTSnhap,
            tgNgNhapDataNhap: tgNgNhapDataNhap
        })
    
        phanhoi.save()
        .then((result) => {
            res.send({message: "Tạo phản hồi thành công!"});
        }).catch(err => {
            console.log("taoPhanHoi", err)
            res.send({message: "Lỗi tạo phản hồi"})
        })
    }else{
        console.log("taoPhanHoi", "maPH không được rỗng!")
        res.send({message: "maPH không được rỗng!"})
    }
};