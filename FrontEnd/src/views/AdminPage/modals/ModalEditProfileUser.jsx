import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

import axios from 'axios'
import { url } from 'variable/general.jsx'
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import moment from 'moment';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      width: "56%",
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 68,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
        overflow:'scroll'
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    ...componentsStyle
});

class ModalEditProfileUser extends Component {
    constructor(props){
        super(props)

        this.state = {
            username: "",
            hTen: "",
            gioiTinh: "",
            ngSinh: "",
            danToc: "",
            soCMND: "",
            ngCapCMND: "",
            diaChi: "",
            email: "",
            SDT: "",
            maKhuVuc: "",
            maDoiTuong: "",
            tenTHPT: "",
            namTotNghiep: "",
        }
    }

    clickEditProfileUser = (event) => {
        event.preventDefault()

        axios.put(`${url}web/taikhoan/sua/thongtin/${this.state.username}`, {
            hTen: this.state.hTen,
            gioiTinh: this.state.gioiTinh,
            ngSinh: this.state.ngSinh,
            danToc: this.state.danToc,
            soCMND: this.state.soCMND,
            ngCapCMND: this.state.ngCapCMND,
            diaChi: this.state.diaChi,
            email: this.state.email,
            SDT: this.state.SDT,
            maKhuVuc: this.state.maKhuVuc,
            maDoiTuong: this.state.maDoiTuong,
            tenTHPT: this.state.tenTHPT,
            namTotNghiep: this.state.namTotNghiep
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa thông tin cá nhân thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditProfileUser()
            this.props.getProfileUser()
        })
        .catch((err) => {
            alert("Sửa thông tin cá nhân thất bại!")
            console.log(err)
        })
    }

    onChangeHTen = (event) => {
        this.setState({hTen: event.target.value})
    }

    onChangeGioiTinh = (event) => {
        this.setState({gioiTinh: event.target.value})
    }

    onChangeNgSinh = (event) => {
        this.setState({ngSinh: event.target.value})
    }

    onChangeDanToc = (event) => {
        this.setState({danToc: event.target.value})
    }

    onChangeSoCMND = (event) => {
        this.setState({soCMND: event.target.value})
    }

    onChangeNgCapCMND = (event) => {
        this.setState({ngCapCMND: event.target.value})
    }

    onChangeDiaChi = (event) => {
        this.setState({diaChi: event.target.value})
    }

    onChangeSDT = (event) => {
        this.setState({SDT: event.target.value})
    }

    onChangeEmail = (event) => {
        this.setState({email: event.target.value})
    }

    onChangeMaKhuVuc = (event) => {
        this.setState({maKhuVuc: event.target.value})
    }

    onChangeMaDoiTuong = (event) => {
        this.setState({maDoiTuong: event.target.value})
    }

    onChangeTenTHPT = (event) => {
        this.setState({tenTHPT: event.target.value})
    }

    onChangeNamTotNghiep = (event) => {
        this.setState({namTotNghiep: event.target.value})
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataProfileUser = (username, hTen, gioiTinh, ngSinh, danToc, soCMND, ngCapCMND, diaChi, email, SDT, maKhuVuc,
        maDoiTuong, tenTHPT, namTotNghiep) => {
        try{
            this.setState({
                username: username,
                hTen: hTen,
                gioiTinh: gioiTinh,
                ngSinh: ngSinh,
                danToc: danToc,
                soCMND: soCMND,
                ngCapCMND: ngCapCMND,
                diaChi: diaChi,
                email: email,
                SDT: SDT,
                maKhuVuc: maKhuVuc,
                maDoiTuong: maDoiTuong,
                tenTHPT: tenTHPT,
                namTotNghiep: namTotNghiep
            })
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { SDT, danToc, diaChi, email, gioiTinh, hTen, maDoiTuong, maKhuVuc, namTotNghiep, ngCapCMND, ngSinh, soCMND, tenTHPT } = this.state

        console.log(ngSinh)
        console.log(ngCapCMND)

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalEditProfileUser}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Sửa Thông Tin Cá Nhân</h3>
                    </div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="hoten"
                            label="Họ Tên"
                            value={hTen}
                            onChange={this.onChangeHTen}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="gioitinh"
                            label="Giới Tính"
                            value={gioiTinh}
                            onChange={this.onChangeGioiTinh}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="ngaysinh"
                            label="Ngày sinh"
                            value={moment(ngSinh).format("YYYY-MM-DD")}
                            onChange={this.onChangeNgSinh}
                            className={classes.textField}
                            type="date"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="dantoc"
                            label="Dân tộc"
                            value={danToc}
                            onChange={this.onChangeDanToc}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="socmnd"
                            label="Số CMND"
                            value={soCMND}
                            onChange={this.onChangeSoCMND}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="ngCapCMND"
                            label="Ngày cấp CMND"
                            value={moment(ngCapCMND).format("YYYY-MM-DD")}
                            onChange={this.onChangeNgCapCMND}
                            className={classes.textField}
                            margin="normal"
                            type="date"
                            variant="outlined"
                        />
                        <TextField
                            id="diachi"
                            label="Địa chỉ"
                            value={diaChi}
                            onChange={this.onChangeDiaChi}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="sdt"
                            label="Số điện thoại"
                            value={SDT}
                            onChange={this.onChangeSDT}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="email"
                            label="Email"
                            value={email}
                            onChange={this.onChangeEmail}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="makhuvuc"
                            label="Mã khu vực"
                            value={maKhuVuc}
                            onChange={this.onChangeMaKhuVuc}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="madoituong"
                            label="Mã đối tượng"
                            value={maDoiTuong}
                            onChange={this.onChangeMaDoiTuong}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="tenTHPT"
                            label="Tên THPT"
                            value={tenTHPT}
                            onChange={this.onChangeTenTHPT}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="namtotnghiep"
                            label="Năm tốt nghiệp"
                            value={namTotNghiep}
                            onChange={this.onChangeNamTotNghiep}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalEditProfileUser"
                            onClick={this.props.closeModalEditProfileUser}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themNganhThi"
                            onClick={this.clickEditProfileUser}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalEditProfileUser)