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

class ProfileUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        axios.get(`${url}web/taikhoan/thongtin/tamle`, {
            withCredentials: true
          })
          .then((response) => {
            let result = response.data
            this.setState({data: result})            
          })
          .catch((err) => {
            console.log(err)
          })
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;
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
                                <p>{data[0] ? data[0].hTen : null}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Giới tính
                                </InputLabel>
                                <p>{data[0] ? data[0].gioiTinh : null}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Ngày sinh
                                </InputLabel>
                                <br />
                                <p>{data[0] ? moment(data[0].ngSinh).format("YYYY-MM-DD") : null}</p>
                            </GridItem>
                            
                        </GridContainer>
                        <br/>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Dân tộc
                                </InputLabel>
                                <br />
                                <p>{data[0] ? data[0].danToc : null}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Số CMND
                                </InputLabel>
                                <p>{data[0] ? data[0].soCMND : null}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Ngày Cấp CMND
                                </InputLabel>
                                <br />
                                <p>{data[0] ? moment(data[0].ngCapCMND).format("YYYY-MM-DD") : null}</p>
                                
                            </GridItem>
                        </GridContainer>
                        <br/>
                        <GridContainer>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                   Địa chỉ
                                </InputLabel>
                                <p>{data[0] ? data[0].diaChi : null}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Số điện thoại
                                </InputLabel>
                                <p>{data[0] ? data[0].SDT : null}</p>
                            </GridItem>
                            <GridItem xs={4} sm={4} md={4}>
                                <InputLabel className={classes.label}>
                                    Email
                                </InputLabel>
                                <br />
                                <p>{data[0] ? data[0].email : null}</p>
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
                        <p>{data[0] ? data[0].maKhuVuc : null}</p>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Mã đối tượng
                        </InputLabel>
                        <p>{data[0] ? data[0].maDoiTuong : null}</p>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Tên trường THPT
                        </InputLabel>
                        <p>{data[0] ? data[0].tenTHPT : null}</p>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Năm tốt nghiệp
                        </InputLabel>
                        <p>{data[0] ? data[0].namTotNghiep : null}</p>
                    </GridItem>
                </GridContainer>
                <br/>
                <hr/>
                <div style={{textAlign:"right"}}>
                <Button variant="contained" color="primary" className={classes.button}>
                    Thay đổi thông tin 
                </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(tabsStyle)(ProfileUser)