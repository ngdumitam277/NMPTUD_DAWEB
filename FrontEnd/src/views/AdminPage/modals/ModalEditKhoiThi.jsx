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

class ModalEditKhoiThi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenKhoi: "",
            diemTBkhoi: "",
            slThiSinh: "",
            key: ""
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

    clickEditKhoiThi = (event) => {
        event.preventDefault()

        axios.put(`${url}web/khoi/${this.state.key}`, {
            tenKhoi: this.state.tenKhoi,
            diemTBkhoi: this.state.diemTBkhoi,
            slThiSinh: this.state.slThiSinh,
            key: this.getKeyFromString(this.state.tenKhoi)
        })
        .then((response) => {
            let result = response.data
            if(result.message === "ok"){
                alert("Sửa khối thi thành công!")
            }else{
                alert(result.message)
            }

            this.props.closeModalEditKhoiThi()
            this.props.getAllKhoiThi()
        })
        .catch((err) => {
            alert("Sửa khối thi thất bại!")
            console.log(err)
        })
    }

    onChangeTenKhoi = (event) => {
        this.setState({tenKhoi: event.target.value})
    }

    onChangeDiemTBkhoi = (event) => {
        this.setState({diemTBkhoi: event.target.value})
    }

    onChangeSoLuongTS = (event) => {
        this.setState({slThiSinh: event.target.value})
    }

    componentDidMount = () => {
        this.props.onRef(this)
    }

    setDataKhoiThi = (data) => {
        try{
            this.setState({
                tenKhoi: data.tenKhoi,
                diemTBkhoi: data.diemTBkhoi,
                slThiSinh: data.slThiSinh,
                key: data.key
            })
        }catch(err){
            console.log(err)
        }
    }

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenKhoi, slThiSinh, diemTBkhoi } = this.state

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalEditKhoiThi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Sửa Khối Thi</h3>
                    </div>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="ten-khoi"
                            label="Tên Khối"
                            value={tenKhoi}
                            onChange={this.onChangeTenKhoi}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            id="diem-trung-binh-khoi"
                            label="Điểm trung bình khối"
                            value={diemTBkhoi}
                            type="number"
                            onChange={this.onChangeDiemTBkhoi}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                       <TextField
                            id="so-luong-ts"
                            label="Số lượng thí sinh"
                            value={slThiSinh}
                            type="number"
                            onChange={this.onChangeSoLuongTS}
                            className={classes.textField}
                            margin="normal"
                            variant="outlined"
                        />
                    </form>

                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalEditKhoiThi"
                            onClick={this.props.closeModalEditKhoiThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themKhoiThi"
                            onClick={this.clickEditKhoiThi}
                        >
                            Sửa
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default withStyles(styles)(ModalEditKhoiThi)