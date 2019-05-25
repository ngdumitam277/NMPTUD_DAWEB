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
            dataSelectNganh:'Chọn ngành',
            dataSelectKhoi:'Chọn khối',
        }
        
    }

    handleChangeNganh = (event) => {
        this.setState({dataSelectNganh: event.target.value})
    }

    handleChangeKhoi = (event) => {
        this.setState({dataSelectKhoi: event.target.value})
    }

    render() {
        const { classes } = this.props;
        const { data } = this.state;
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
                        <span>190087</span>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Ngành thi:
                        </InputLabel>
                        &nbsp;
                        <Select
                            value={this.state.dataSelectNganh}
                            onChange={this.handleChangeNganh}>
                            <MenuItem value={'CNTT'}>CNTT</MenuItem>
                            <MenuItem value={'HOAHOC'}>Hóa học</MenuItem>
                            <MenuItem value={'LICHSUHOC'}>Lịch sử học</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Khối thi:
                        </InputLabel>
                        &nbsp;
                        <Select
                            value={this.state.dataSelectKhoi}
                            onChange={this.handleChangeKhoi}>
                            <MenuItem value={'A'}>A</MenuItem>
                            <MenuItem value={'B'}>B</MenuItem>
                            <MenuItem value={'C'}>C</MenuItem>
                        </Select>
                    </GridItem>
                    <GridItem xs={3} sm={3} md={3}>
                        <InputLabel className={classes.label}>
                            Chỉ tiêu:
                        </InputLabel>
                        &nbsp;
                        <span>5000</span>
                    </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem>
                    <InputLabel className={classes.label}>
                        Thông tin ngành
                    </InputLabel>
                    <div>Ví dụ gõ Xin chào. sẽ tạo ra một khoảng trắng thừa giữa Xin và chào.
Đây được gọi là khoảng trống không bị ngắt hay không bị phá hủy vì nó ngăn không cho xuống dòng ở vị trí đó. Nếu lạm dụng kí tự này, trình duyệt sẽ khó chèn dấu ngắt dòng đẹp và đúng quy cách.
Có thể gõ &#160; để tạo khoảng trống.</div>
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
                        <span>5</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel className={classes.label}>
                            Điểm Cộng KV:
                        </InputLabel>
                        &nbsp;
                        <span>2</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel className={classes.label}>
                            Điểm Cộng Đối Tượng:
                        </InputLabel>
                        &nbsp;
                        <span>1</span>
                    </GridItem>
                </GridContainer>
                &nbsp;
                <GridContainer style={{marginLeft:10}}>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel style={{color:"red"}} className={classes.label}>
                        TỔNG ĐIỂM:
                        </InputLabel >
                        &nbsp;
                        <span style={{fontWeight:"bold"}}>20</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel style={{color:"red"}} className={classes.label}>
                            ĐIỂM CHUẨN:
                        </InputLabel>
                        &nbsp;
                        <span style={{fontWeight:"bold"}}>22</span>
                    </GridItem>
                    <GridItem xs={4} sm={4} md={4}>
                        <InputLabel style={{color:"red"}} className={classes.label}>
                            KẾT QUẢ:
                        </InputLabel>
                        &nbsp;
                        <span style={{fontWeight:"bold"}}>ĐẬU</span>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}

export default withStyles(tabsStyle)(ProfileUser)