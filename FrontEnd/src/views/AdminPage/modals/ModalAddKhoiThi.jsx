import React, { Component } from 'react'

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";


import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import componentsStyle from "assets/jss/material-kit-react/views/components.jsx";
import Icon from '@material-ui/core/Icon';
import InputLabel from "@material-ui/core/InputLabel";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from 'axios'
import { url } from 'variable/general.jsx'
import moment from 'moment'
import PropTypes from 'prop-types';
import ModalAddMonKhoi from './ModalAddMonKhoi';
import ModalEditMonKhoi from './ModalEditMonKhoi';
import ModalDeleteMonKhoi from './ModalDeleteMonKhoi';

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

class ModalAddKhoiThi extends Component {
    constructor(props){
        super(props)

        this.state = {
            tenKhoi: "",
            diemTBkhoi: "",
            slThiSinh: "",
            page: 0,
            rowsPerPage: 3,
            dataMon: [],
            isModalEditMonKhoi: false,
            isModalAddMonKhoi: false,
            isModalDeleteMonKhoi: false
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

    themTenKhoiVaoDataMon = () => {
        let dataMon = this.state.dataMon
        let tenKhoi = this.state.tenKhoi

        let data = dataMon.map((item, index) => {
            item.tenKhoi = tenKhoi

            return item
        })

        return data
    }

    clickAddKhoiThi = (event) => {
        event.preventDefault()

        let dataMon = this.themTenKhoiVaoDataMon()

        axios.post(`${url}web/create/khoi`, {
            tenKhoi: this.state.tenKhoi,
            diemTBkhoi: this.state.diemTBkhoi,
            slThiSinh: this.state.slThiSinh,
            key: this.getKeyFromString(this.state.tenKhoi)
        })
        .then((result) => {
            let data = result.data

            if(data.message === "ok"){
                axios.post(`${url}web/create/multiple/khoimon`, {
                    dataMon: dataMon
                })
                .then((result) => {
                    let data = result.data

                    if(data.message === "ok"){
                        alert("Tạo khối thi thành công!")

                        this.props.getAllKhoiThi()
                    }else{
                        alert(data.message)
                    }
                })
            }else{
                alert(data.message)
            }
        })
        .catch((err) => {
            alert("Tạo khối thi thất bại!")
            console.log(err)
        })
    }

    setDataKhoiThi = () => {
        this.setState({
            tenKhoi: "",
            diemTBkhoi: "",
            slThiSinh: "",
            page: 0,
            rowsPerPage: 3,
            dataMon: [],
            isModalEditMonKhoi: false,
            isModalAddMonKhoi: false,
            isModalDeleteMonKhoi: false
        })
    }

    componentDidMount = () => {
        this.props.onRef(this)
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

    setModalAddMonKhoi = (isModal) => this.setState({ isModalAddMonKhoi: isModal })

    openModalAddMonKhoi = (event) => {
        event.preventDefault()
        this.setModalAddMonKhoi(true)
    }

    closeModalAddMonKhoi = () => {
        this.setModalAddMonKhoi(false)
    }

    setModalEditMonKhoi = (isModal) => this.setState({ isModalEditMonKhoi: isModal })

    openModalEditMonKhoi = (data) => {
        this.ModalEditMonKhoiRef.setDataMonThi(data)
        this.setModalEditMonKhoi(true)
    }

    closeModalEditMonKhoi = () => {
        this.setModalEditMonKhoi(false)
    }

    setModalDeleteMonKhoi = (isModal) => this.setState({isModalDeleteMonKhoi: isModal})

    openModalDeleteMonKhoi = (data) => {
        this.ModalDeleteMonKhoiRef.setDataMonThi(data)
        this.setModalDeleteMonKhoi(true)
    }

    closeModalDeleteMonKhoi = () => {
        this.setModalDeleteMonKhoi(false)
    }

    onRefModalDeleteMonKhoi = (ref) => this.ModalDeleteMonKhoiRef = ref

    onRefModalEditMonKhoi = (ref) => this.ModalEditMonKhoiRef = ref

    addMonVaoDataMon = (tenMon, keyMon) => {
        let dataMon = this.state.dataMon
        let message = ""

        if(this.checkKeyMon(dataMon, keyMon)){
            dataMon.push({tenMon: tenMon, keyMon: keyMon})

            this.setState({dataMon: dataMon})

            message = "Thêm môn thành công!!!"
        }else{
            message = "Lỗi trùng key!!!"
        }

        return { message: message }
    }

    checkKeyMon = (dataMon, keyMon) => {
        let data = dataMon.filter((item, index) => item.keyMon === keyMon)

        let kt = data.length > 0 ? false : true 

        return kt
    }

    editDataMon = (tenMon, keyMon, key) => {
        let dataMon = this.state.dataMon
        let message = ""

        if(this.checkKeyMon(dataMon, keyMon)){
            let data = dataMon.map((item, index) => {
                if(item.keyMon === key){
                    return { tenMon: tenMon, keyMon: keyMon }
                }else{
                    return item
                }
            })
    
            this.setState({dataMon: data})

            message = "Sửa môn thành công!!!"
        }else{
            message = "Lỗi trùng key!!!"
        }

        return { message: message }
    }

    deleteDataMon = (key) => {
        let dataMon = this.state.dataMon

        let data = dataMon.filter((item, index) => {
            if(item.keyMon !== key){
                return item
            }
        })

        this.setState({dataMon: data})
    } 

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenKhoi, slThiSinh, diemTBkhoi, dataMon, page, rowsPerPage, isModalAddMonKhoi, isModalDeleteMonKhoi,
        isModalEditMonKhoi } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataMon.length - page * rowsPerPage);

        return (
            <Modal open={isModal}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                onClose={this.props.closeModalAddKhoiThi}
            >
                <div style={getModalStyle()} className={classes.paper}>
                    <div className={classes.title}>
                        <h3>Thêm Khối Thi</h3>
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
                            id="diem-tb-khoi"
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

                    <div style={{marginBottom:10}}>
                        <Button onClick={this.openModalAddMonKhoi} variant="contained" color="green" className={classes.button}>
                            <Icon className={classes.iconHover} color="error" style={{ fontSize: 30 }}>
                                add_circle
                            </Icon>
                        </Button>
                        &nbsp;
                        <InputLabel className={classes.label}>
                        Thêm môn
                        </InputLabel>
                    </div>
                    <Paper classname={classes.root}>
                        <div classname={classes.tableWrapper}>
                            <Table classname={classes.table}>
                            <TableHead>
                                <TableRow>
                                <TableCell>Tên môn</TableCell>
                                <TableCell align="right">Tùy chỉnh</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {dataMon.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                    {row.tenMon}
                                    </TableCell>
                                    <TableCell align="right">
                                    <Button onClick={() => this.openModalDeleteMonKhoi(row)} variant="contained" color="secondary" className={classes.button}>
                                        Xóa
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => this.openModalEditMonKhoi(row)} variant="contained" color="primary" className={classes.button}>
                                        Sửa
                                    </Button>
                                    </TableCell>
                                </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                <TableRow style={{ height: 48 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                                )}
                            </TableBody>
                            </Table>

                            <ModalAddMonKhoi isModal={isModalAddMonKhoi}
                                addMonVaoDataMon={this.addMonVaoDataMon}
                                closeModalAddMonKhoi={this.closeModalAddMonKhoi}/>

                            <ModalEditMonKhoi isModal={isModalEditMonKhoi}
                                onRef={this.onRefModalEditMonKhoi}
                                editDataMon={this.editDataMon}
                                closeModalEditMonKhoi={this.closeModalEditMonKhoi}/>

                            <ModalDeleteMonKhoi isModal={isModalDeleteMonKhoi}
                                onRef={this.onRefModalDeleteMonKhoi}
                                deleteDataMon={this.deleteDataMon}
                                closeModalDeleteMonKhoi={this.closeModalDeleteMonKhoi}/>
                        </div>


                        </Paper>
                    <div style={{textAlign: "end"}}>
                        <Button
                            style={{marginRight: 5}}
                            variant="outlined"
                            href="#huyModalAddKhoiThi"
                            onClick={this.props.closeModalAddKhoiThi}
                        >
                            Huỷ
                        </Button>
                        <Button
                            style={{marginLeft: 5}}
                            variant="outlined"
                            href="#themKhoiThi"
                            onClick={this.clickAddKhoiThi}
                        >
                            Thêm
                        </Button>
                    </div>
                </div>
            </Modal>
        )
    }
}

ModalAddKhoiThi.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ModalAddKhoiThi)