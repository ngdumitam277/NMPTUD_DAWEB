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
// react plugin for creating date-time-picker
import Datetime from "react-datetime";
import axios from 'axios'
import { url } from 'variable/general.jsx'
import moment from 'moment'
import ModalEditProfileUser from '../modals/ModalEditProfileUser';

class ProfileUser extends Component {
    constructor(props) {
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
            tinhTrang: 0,
            isModalEditProfileUser: false,
            loai: '',
        }

        this.modalEditProfileUserRef = React.createRef()
    }

    getProfileUser = () => {
        axios.get(`${url}web/taikhoan/thongtincanhan`, {
            withCredentials: true
        })
            .then((response) => {
                let data = response.data
                console.log("DATA === " + JSON.stringify(data))
                if (data.length > 0) {
                    let item = data[0]

                    this.setState({
                        username: item.username,
                        hTen: item.hTen,
                        gioiTinh: item.gioiTinh,
                        ngSinh: item.ngSinh,
                        danToc: item.danToc,
                        soCMND: item.soCMND,
                        ngCapCMND: item.ngCapCMND,
                        diaChi: item.diaChi,
                        email: item.email,
                        SDT: item.SDT,
                        maKhuVuc: item.maKhuVuc,
                        maDoiTuong: item.maDoiTuong,
                        tenTHPT: item.tenTHPT,
                        namTotNghiep: item.namTotNghiep,
                        tinhTrang: item.tinhTrang,
                        loai: item.loai,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentDidMount() {
        this.getProfileUser()
    }

    setModalEditProfileUser = (isModal) => this.setState({ isModalEditProfileUser: isModal })

    openModalEditProfileUser = () => {
        this.modalEditProfileUserRef.setDataProfileUser(this.state.username, this.state.hTen, this.state.gioiTinh, this.state.ngSinh,
            this.state.danToc, this.state.soCMND, this.state.ngCapCMND, this.state.diaChi, this.state.email,
            this.state.SDT, this.state.maKhuVuc, this.state.maDoiTuong, this.state.tenTHPT, this.state.namTotNghiep)
        this.setModalEditProfileUser(true)
    }

    closeModalEditProfileUser = () => {
        this.setModalEditProfileUser(false)
    }

    onRefModalEditProfileUser = (ref) => this.modalEditProfileUserRef = ref

    getTinhTrang = (classes) => {
        let tinhTrang = Number(this.state.tinhTrang)
        const loai = this.state.loai
        if (tinhTrang === 0 || loai != 'TS') {
            return (
                <Button onClick={this.openModalEditProfileUser} variant="contained" color="primary" className={classes.button}>
                    Thay đổi thông tin
                </Button>
            )
        } else {
            return (
                <Button disabled={true} onClick={this.openModalEditProfileUser} variant="contained" color="primary" className={classes.button}>
                    Thay đổi thông tin
                </Button>
            )
        }
    }

    render() {
        const { classes } = this.props;
        const { hTen, SDT, danToc, diaChi, email, gioiTinh, maDoiTuong, maKhuVuc, namTotNghiep, ngCapCMND,
            ngSinh, soCMND, tenTHPT, isModalEditProfileUser, loai } = this.state;
        return (
            <div className={classes.container}>
                <div className={classes.title}>
                <h4 style={{paddingLeft:30}}>Thông tin cá nhân</h4>
                
                </div>
                <div className={classes.title}>
                {/* <h4>
                    {
                        loai && loai === "CB" ? "Chào bạn cán bộ nhập thông tin!" :
                        loai && loai === "CD_ND" ? "Chào bạn cán bộ nhập điểm!" : 
                        loai && loai === "CD_ND" ? "Bạn là admin cao cấp!": null
                    }
                </h4> */}
                </div>
                <GridContainer>
                    <GridItem xs={4} sm={4} md={4}>
                        <img
                            style={{ width: 200, height: 200, borderRadius:"50%" }}
                            src={require("assets/img/avatar-profile.jpg")}
                            alt="..."
                            className={classes.imgRounded + " " + classes.imgFluid}
                        />
                    </GridItem>
                    <GridItem xs={8} sm={8} md={8}>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Họ Tên
                                </InputLabel>
                                <p>{hTen}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Giới tính
                                </InputLabel>
                                <p>{gioiTinh}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Ngày sinh
                                </InputLabel>
                                <br />
                                <p>{moment(ngSinh).format("DD-MM-YYYY")}</p>
                            </GridItem>

                        </GridContainer>
                        <br />
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Dân tộc
                                </InputLabel>
                                <br />
                                <p>{danToc}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Số CMND
                                </InputLabel>
                                <p>{soCMND}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Ngày Cấp CMND
                                </InputLabel>
                                <br />
                                <p>{moment(ngCapCMND).format("DD-MM-YYYY")}</p>

                            </GridItem>
                        </GridContainer>
                        <br />
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Địa chỉ
                                </InputLabel>
                                <p>{diaChi}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Số điện thoại
                                </InputLabel>
                                <p>{SDT}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Email
                                </InputLabel>
                                <br />
                                <p>{email}</p>
                            </GridItem>

                        </GridContainer>
                    </GridItem>
                </GridContainer>
                
                {
                    loai && loai != "TS" ? null :
                        <>
                        <hr />
                        <br />
                            <GridContainer>
                                <GridItem xs={3} sm={3} md={3}>
                                    <InputLabel className={classes.label}>
                                        Mã khu vực
                        </InputLabel>
                                    <p>{maKhuVuc}</p>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                    <InputLabel className={classes.label}>
                                        Mã đối tượng
                        </InputLabel>
                                    <p>{maDoiTuong}</p>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                    <InputLabel className={classes.label}>
                                        Tên trường THPT
                        </InputLabel>
                                    <p>{tenTHPT}</p>
                                </GridItem>
                                <GridItem xs={3} sm={3} md={3}>
                                    <InputLabel className={classes.label}>
                                        Năm tốt nghiệp
                        </InputLabel>
                                    <p>{namTotNghiep}</p>
                                </GridItem>
                            </GridContainer>
                            <br />
                            <hr />
                            <div style={{ textAlign: "right" }}>
                                {this.getTinhTrang(classes)}
                            </div>

                            <ModalEditProfileUser isModal={isModalEditProfileUser}
                                onRef={this.onRefModalEditProfileUser}
                                closeModalEditProfileUser={this.closeModalEditProfileUser}
                                getProfileUser={this.getProfileUser} />
                        </>
                }


            </div>
        )
    }
}

export default withStyles(tabsStyle)(ProfileUser)