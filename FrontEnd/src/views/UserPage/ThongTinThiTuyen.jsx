import React, { Component } from 'react'
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import tabsStyle from "assets/jss/material-kit-react/views/componentsSections/tabsStyle.jsx";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import MonThi from './MonThi';

// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import axios from 'axios'
import { url } from 'variable/general.jsx'
import moment from 'moment'

class ProfileUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            dataNganh: [],
            dataKhoi: [],
            dataSelectNganh:'Chọn ngành',
            dataSelectKhoi:'Chọn khối',
            thongTin: "",
            SBD: "",
            tenNganh: "",
            maNganh: "",
            tenKhoi: "",
            chiTieuNganh: 0,
            diemCongKhuVuc: 0,
            diemCongDoiTuong: 0,
            diemChuan: 0,
            tongDiem: 0,
            diemTB: 0,
            ketQua: ""
        }
        
    }

    componentDidMount = () => {
        axios.get(`${url}web/diemthi/monthi`, {withCredentials: true})
        .then((result) => {
            console.log(result)
        })
        .catch((err) => {
            console.log(err)
        })
        // let taikhoan = axios.get(`${url}web/taikhoan/thongtin`, {withCredentials: true})
        // let nganh = axios.get(`${url}web/nganh`)
        // let khoi = axios.get(`${url}web/khoi`)
        // let monthi = axios.get(`${url}web/diemthi/monthi`, {withCredentials: true})

        // Promise.all([taikhoan, nganh, khoi, monthi])
        // .then((result) => {
        //     let dataTaiKhoan = result[0].data
        //     let dataNganh = result[1].data
        //     let dataKhoi = result[2].data
        //     let dataMon = result[3].data

        //     if(dataTaiKhoan.length > 0){
        //         let itemTaiKhoan = dataTaiKhoan[0]
        //         let itemMon = dataMon[0]

        //         console.log(itemMon)

        //         this.setState({
        //             tenNganh: itemTaiKhoan.tenNganh,
        //             maNganh: itemTaiKhoan.maNganh,
        //             tenKhoi: itemTaiKhoan.tenKhoi,
        //             SBD: itemTaiKhoan.SBD,
        //             chiTieuNganh: itemTaiKhoan.chiTieuNganh,
        //             thongTin: itemTaiKhoan.thongTin,
        //             dataNganh: dataNganh,
        //             dataKhoi: dataKhoi,
        //             diemCongKhuVuc: itemMon.diemCongKhuVuc,
        //             diemCongDoiTuong: itemMon.diemCongDoiTuong,
        //             diemChuan: itemMon.diemChuan,
        //             tongDiem: itemMon.diem,
        //             diemTB: parseFloat(itemMon.diem/3).toFixed(2),
        //             ketQua: itemMon.thiDau === 1 ? "Đậu" : "Rớt"
        //         })
        //     }
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
    }

    handleChangeNganh = (event) => {
        let value = event.target.value
        let dataNganh = this.state.dataNganh.filter((item, index) => item.maNganh === value)
        let chiTieuNganh = this.state.chiTieuNganh
        let thongTin = this.state.thongTin

        if(dataNganh.length > 0){
            chiTieuNganh = dataNganh[0].chiTieuNganh
            thongTin = dataNganh[0].thongTin
        }

        this.setState({
            maNganh: event.target.value,
            chiTieuNganh: chiTieuNganh,
            thongTin: thongTin
        })
    }

    handleChangeKhoi = (event) => {
        this.setState({tenKhoi: event.target.value})
    }

    render() {
        const { classes } = this.props;
        const { data, SBD, dataSelectNganh, tenNganh, maNganh, chiTieuNganh, tenKhoi, thongTin, 
            dataSelectKhoi, dataKhoi, dataNganh, diemChuan, diemCongDoiTuong, diemCongKhuVuc, diemTB, 
            ketQua, tongDiem } = this.state;

        return (
            <div style={{marginBottom:20}} className={classes.container}>
                <div className={classes.title}>
                    <h4 style={{color:"black"}}>Thông tin thi tuyển</h4>
                </div>
                <GridContainer>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            SBD: 
                        </InputLabel>
                        <span>{SBD}</span>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Ngành thi:
                        </InputLabel>
                        &nbsp;
                        <Select
                            value={maNganh}
                            onChange={this.handleChangeNganh}>
                            {
                                dataNganh.map((row, index) => (
                                    <MenuItem value={row.maNganh}>{row.tenNganh}</MenuItem>
                                ))
                            }
                        </Select>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Khối thi:
                        </InputLabel>
                        &nbsp;
                        <Select
                            value={tenKhoi}
                            onChange={this.handleChangeKhoi}>
                            {
                                dataKhoi.map((row, index) => (
                                    <MenuItem value={row.tenKhoi}>{row.tenKhoi}</MenuItem>        
                                ))   
                            }
                        </Select>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Chỉ tiêu:
                        </InputLabel>
                        &nbsp;
                        <span>{chiTieuNganh}</span>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem>
                    <InputLabel className={classes.label}>
                        Thông tin ngành
                    </InputLabel>
                    <div>{thongTin}</div>
                    </GridItem>
                </GridContainer>
                <div style={{textAlign:"right"}}>
                <Button variant="contained" color="primary" className={classes.button}>
                    Nộp hồ sơ
                </Button>
                </div>
                <hr/>
                <MonThi/>
                &nbsp;
                <GridContainer style={{marginLeft:10}}>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel className={classes.label}>
                            Điểm Trung Bình:
                        </InputLabel>
                        &nbsp;
                        <span>{diemTB}</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel className={classes.label}>
                            Điểm Cộng KV:
                        </InputLabel>
                        &nbsp;
                        <span>{diemCongKhuVuc}</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel className={classes.label}>
                            Điểm Cộng Đối Tượng:
                        </InputLabel>
                        &nbsp;
                        <span>{diemCongDoiTuong}</span>
                    </GridItem>
                </GridContainer>
                &nbsp;
                <GridContainer style={{marginLeft:10}}>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel style={{color:"red"}} className={classes.label}>
                        TỔNG ĐIỂM:
                        </InputLabel >
                        &nbsp;
                        <span style={{fontWeight:"bold"}}>{tongDiem}</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel style={{color:"red"}} className={classes.label}>
                            ĐIỂM CHUẨN:
                        </InputLabel>
                        &nbsp;
                        <span style={{fontWeight:"bold"}}>{diemChuan}</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel style={{color:"red"}} className={classes.label}>
                            KẾT QUẢ:
                        </InputLabel>
                        &nbsp;
                        <span style={{fontWeight:"bold"}}>{ketQua}</span>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default withStyles(tabsStyle)(ProfileUser)