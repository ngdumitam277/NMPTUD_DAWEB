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
            isModalEditProfileUser: false
        }

        this.modalEditProfileUserRef = React.createRef()
    }

    getProfileUser = () => {
        axios.get(`${url}web/taikhoan/thongtin`, {
            withCredentials: true
        })
        .then((response) => {
        let data = response.data

        if(data.length > 0){
            let item = data[0] 

            this.setState({
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
                namTotNghiep: item.namTotNghiep
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
        this.modalEditProfileUserRef.setDataProfileUser(this.state.hTen, this.state.gioiTinh, this.state.ngSinh, 
            this.state.danToc, this.state.soCMND, this.state.ngCapCMND, this.state.diaChi, this.state.email, 
            this.state.SDT, this.state.maKhuVuc, this.state.maDoiTuong, this.state.tenTHPT, this.state.namTotNghiep)
        this.setModalEditProfileUser(true)
    }

    closeModalEditProfileUser = () => {
        this.setModalEditProfileUser(false)
    }

    onRefModalEditProfileUser = (ref) =>  this.modalEditProfileUserRef = ref

    render() {
        const { classes } = this.props;
        const { hTen, SDT, danToc, diaChi, email, gioiTinh, maDoiTuong, maKhuVuc, namTotNghiep, ngCapCMND,
            ngSinh, soCMND, tenTHPT, isModalEditProfileUser } = this.state;

        return (
            <div className={classes.container}>
                <div className={classes.title}>
                  <h4>Thông tin cá nhân</h4>
                </div>
                <GridContainer>
                    <GridItem xs={4} sm={4} md={4}>
                        <img
                            style={{width:200, height:200}}
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
                                <p>{moment(ngSinh).format("YYYY-MM-DD")}</p>
                            </GridItem>
                            
                        </GridContainer>
                        <br/>
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
                                <p>{moment(ngCapCMND).format("YYYY-MM-DD")}</p>
                                
                            </GridItem>
                        </GridContainer>
                        <br/>
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
                <hr/>
                <br/>
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
                <br/>
                <hr/>
                <div style={{textAlign:"right"}}>
                <Button onClick={this.openModalEditProfileUser} variant="contained" color="primary" className={classes.button}>
                    Thay đổi thông tin 
                </Button>
                </div>

                <ModalEditProfileUser isModal={isModalEditProfileUser} 
                    onRef={this.onRefModalEditProfileUser}
                    closeModalEditProfileUser={this.closeModalEditProfileUser}
                    getProfileUser={this.getProfileUser}/>
            </div>
        )
    }
}

export default withStyles(tabsStyle)(ProfileUser)