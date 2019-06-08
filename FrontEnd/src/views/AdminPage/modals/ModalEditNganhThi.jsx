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

class ModalEditNganhThi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenNganh: "",
            chiTieuNganh: "",
            thongTin: "",
            key: "",
            maNganh: "",
            id: ""
        }
    }

    getKeyFromString(str){
        if(str === "") return str;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/”|“|!|@|%|^|\*|\(|\)|\+|=|<|>|\?|\/|,|\.|:|;|'|"|&|#|\[|\]|~|\$|_|`|-|{|}|\\/g," ");
        str = str.replace(/ + /g," ");
        str = str.replace(/ – /g," ");
        str = str.trim();
        str = str.replace(/ /g, "-");
        return str; 
    }

    clickEditNganhThi = (event) => {
        event.preventDefault()

        axios.put(`${url}web/nganh/${this.state.id}`, {
            tenNganh: this.state.tenNganh,
            chiTieuNganh: this.state.chiTieuNganh,
            thongTin: this.state.thongTin,
            key: this.getKeyFromString(this.state.tenNganh)
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa ngành thi thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditNganhThi()
            this.props.getAllNganhThi()
        })
        .catch((err) => {
            alert("Sửa ngành thi thất bại!")
            console.log(err)
        })
    }

    onChangeMaNganh = (event) => {
        this.setState({maNganh: event.target.value})
    }

    onChangeTenNganh = (event) => {
        this.setState({tenNganh: event.target.value})
    }

    onChangeChiTieuNganh = (event) => {
        let chiTieuNganh = Number(event.target.value)

        if(chiTieuNganh >= 0 && chiTieuNganh <= 2000){
            this.setState({chiTieuNganh: chiTieuNganh})
        }
    }

    onChangeThongTin = (event) => {
        this.setState({thongTin: event.target.value})
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataNganhThi = (data) => {
        try{
            this.setState({
                tenNganh: data.tenNganh,
                chiTieuNganh: data.chiTieuNganh,
                thongTin: data.thongTin,
                key: data.key,
                maNganh: data.maNganh,
                id: data._id
            })
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenNganh, thongTin, chiTieuNganh, maNganh } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalEditNganhThi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Sửa Ngành Thi</h3>
                    </div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="ten-nganh"
                            label="Tên Ngành"
                            value={tenNganh}
                            onChange={this.onChangeTenNganh}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="chi-tieu-nganh"
                            label="Chỉ tiêu ngành"
                            value={chiTieuNganh}
                            type="number"
                            onChange={this.onChangeChiTieuNganh}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                       <TextField
                            id="thong-tin"
                            label="Thông tin"
                            value={thongTin}
                            onChange={this.onChangeThongTin}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalEditNganhThi"
                            onClick={this.props.closeModalEditNganhThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themNganhThi"
                            onClick={this.clickEditNganhThi}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalEditNganhThi)