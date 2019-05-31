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
import ModalAddMonKhoiEdit from './ModalAddMonKhoiEdit';
import ModalEditMonKhoiEdit from './ModalEditMonKhoiEdit';
import ModalDeleteMonKhoiEdit from './ModalDeleteMonKhoiEdit';
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
            tenKhoiBefore: "",
            diemTBkhoi: "",
            slThiSinh: "",
            key: "",
            isModalAddMonKhoiEdit: false,
            isModalDeleteMonKhoiEdit: false,
            isModalEditMonKhoiEdit: false,
            dataMon: [],
            rowsPerPage: 3,
            page: 0
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
                axios.put(`${url}web/update/multiple/khoimon`, {
                    tenKhoi: this.state.tenKhoi,
                    tenKhoiBefore: this.state.tenKhoiBefore
                })
                .then((result) => {
                    let data = result.data

                    if(data.message === "ok"){
                        alert("Sửa khối thi thành công!")

                        
                        this.props.closeModalEditKhoiThi()
                        this.props.getAllKhoiThi()
                    }else{
                        alert(result.message)
                    }
                })
                .catch((err) => {
                    alert("Sửa khối thi thất bại!")
                    console.log(err)
                })
            }else{
                alert(result.message)
            }
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
        let tenKhoi = data.tenKhoi

        axios.get(`${url}web/khoimon/mon/${tenKhoi}`)
        .then((result) => {
            let itemMon = result.data

            if(itemMon.length > 0){
                this.setState({
                    dataMon: itemMon,
                    tenKhoi: tenKhoi,
                    tenKhoiBefore: tenKhoi,
                    diemTBkhoi: data.diemTBkhoi,
                    slThiSinh: data.slThiSinh,
                    key: data.key
                })
            }else{
                this.setState({
                    tenKhoi: tenKhoi,
                    diemTBkhoi: data.diemTBkhoi,
                    slThiSinh: data.slThiSinh,
                    key: data.key
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    getAllMonKhoi = () => {
        axios.get(`${url}web/khoimon/mon/${this.state.tenKhoi}`)
        .then((result) => {
            let itemMon = result.data

            if(itemMon.length >= 0){
                this.setState({
                    dataMon: itemMon
                })
            }
        })
        .catch((err) => {
            console.log(err)
        })
    }

    setModalAddMonKhoiEdit = (isModal) => this.setState({ isModalAddMonKhoiEdit: isModal })

    openModalAddMonKhoiEdit = (event) => {
        event.preventDefault()
        this.setModalAddMonKhoiEdit(true)
    }

    closeModalAddMonKhoiEdit = () => {
        this.setModalAddMonKhoiEdit(false)
    }

    setModalEditMonKhoiEdit = (isModal) => this.setState({ isModalEditMonKhoiEdit: isModal })

    openModalEditMonKhoiEdit = (data) => {
        this.ModalEditMonKhoiEditRef.setDataMonThi(data)
        this.setModalEditMonKhoiEdit(true)
    }

    closeModalEditMonKhoiEdit = () => {
        this.setModalEditMonKhoiEdit(false)
    }

    setModalDeleteMonKhoiEdit = (isModal) => this.setState({isModalDeleteMonKhoiEdit: isModal})

    openModalDeleteMonKhoiEdit = (data) => {
        this.ModalDeleteMonKhoiEditRef.setDataMonThi(data)
        this.setModalDeleteMonKhoiEdit(true)
    }

    closeModalDeleteMonKhoiEdit = () => {
        this.setModalDeleteMonKhoiEdit(false)
    }

    onRefModalDeleteMonKhoiEdit = (ref) => this.ModalDeleteMonKhoiEditRef = ref

    onRefModalEditMonKhoiEdit = (ref) => this.ModalEditMonKhoiEditRef = ref

    render() {
        let { isModal, classes, ...rest } = this.props
        let { tenKhoi, slThiSinh, diemTBkhoi, isModalAddMonKhoiEdit, isModalDeleteMonKhoiEdit, dataMon,
            isModalEditMonKhoiEdit, rowsPerPage, page } = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, dataMon.length - page * rowsPerPage);

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

                    <div style={{marginBottom:10}}>
                        <Button onClick={this.openModalAddMonKhoiEdit} variant="contained" color="green" className={classes.button}>
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
                                    <Button onClick={() => this.openModalDeleteMonKhoiEdit(row)} variant="contained" color="secondary" className={classes.button}>
                                        Xóa
                                    </Button>
                                    &nbsp;
                                    <Button onClick={() => this.openModalEditMonKhoiEdit(row)} variant="contained" color="primary" className={classes.button}>
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

                            <ModalAddMonKhoiEdit isModal={isModalAddMonKhoiEdit}
                                tenKhoi={tenKhoi}
                                getAllMonKhoi={this.getAllMonKhoi}
                                closeModalAddMonKhoiEdit={this.closeModalAddMonKhoiEdit}/>

                            <ModalEditMonKhoiEdit isModal={isModalEditMonKhoiEdit}
                                onRef={this.onRefModalEditMonKhoiEdit}
                                getAllMonKhoi={this.getAllMonKhoi}
                                tenKhoi={tenKhoi}
                                closeModalEditMonKhoiEdit={this.closeModalEditMonKhoiEdit}/>

                            <ModalDeleteMonKhoiEdit isModal={isModalDeleteMonKhoiEdit}
                                onRef={this.onRefModalDeleteMonKhoiEdit}
                                getAllMonKhoi={this.getAllMonKhoi}
                                tenKhoi={tenKhoi}
                                closeModalDeleteMonKhoiEdit={this.closeModalDeleteMonKhoiEdit}/>
                        </div>


                    </Paper>

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