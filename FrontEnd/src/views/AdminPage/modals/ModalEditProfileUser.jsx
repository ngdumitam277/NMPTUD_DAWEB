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

    clickEditQuyChe = (event) => {
        event.preventDefault()

        axios.put(`${url}web/khuvuc/${this.state.maKhuVuc}`, {
            diemCong: this.state.diemCong
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa quy chế thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditProfileUser()
            this.props.getAllQuyChe()
        })
        .catch((err) => {
            alert("Sửa quy chế thất bại!")
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

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataProfileUser = (hTen, gioiTinh, ngSinh, danToc, soCMND, ngCapCMND, diaChi, email, SDT, maKhuVuc,
        maDoiTuong, tenTHPT, namTotNghiep) => {
        try{
            this.setState({
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
                            onClick={this.clickEditQuyChe}
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