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

class ModalAddNganhThi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenNganh: "",
            chiTieuNganh: "",
            thongTin: ""
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

    clickAddNganhThi = (event) => {
        event.preventDefault()

        axios.post(`${url}web/create/nganh`, {
            maNganh: this.state.tenNganh,
            chiTieuNganh: this.state.chiTieuNganh,
            thongTin: this.state.thongTin,
            key: this.getKeyFromString(this.state.tenNganh)
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Tạo ngành thi thành công!")
            }else{
                alert(result.message)
            }

            this.props.getAllNganhThi()
        })
        .catch((err) => {
            alert("Tạo ngành thi thất bại!")
            console.log(err)
        })
    }

    onChangeTenNganh = (event) => {
        this.setState({tenNganh: event.target.value})
    }

    onChangeChiTieuNganh = (event) => {
        this.setState({chiTieuNganh: event.target.value})
    }

    onChangeThongTin = (event) => {
        this.setState({thongTin: event.target.value})
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenNganh, thongTin, chiTieuNganh } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalAddNganhThi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Thêm Ngành Thi</h3>
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
                            href="#huyModalAddNganhThi"
                            onClick={this.props.closeModalAddNganhThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themNganhThi"
                            onClick={this.clickAddNganhThi}
                        >
                            Thêm
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalAddNganhThi)